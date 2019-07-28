var express = require('express');
var router = express.Router();
const {
  User,
  RoomMember,
  Order,
  findRelevantOrder,
} = require('../domain');

let DB;

function resetDB() {
  DB = {
    users: [
      new User({login: 'kek'}),
      new User({login: 'cheburek'}),
    ],
    orders: []
  }
}

router.use((req, res, next) => {
  const {uid} = req.cookies;

  if(!uid) {
    return next();
  }

  const user = DB.users.find(u => u.id === uid);
  req.user = user;

  console.log(req.user);

  return next();
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/reset', (req, res, next) => {
  resetDB();
  res.send();
})

router.post('/ping', (req, res) => {
  res.send('kek');
})

router.post('/me', (req, res, next) => {

  if (req.user) {
   return res.send(req.user);
  }

  const user = DB.users.find(u => !u.isUsed);

  if(!user) {
    return res.send(null);
  }

  user.setUsed();

  res.cookie('uid', user.id, { maxAge: 900000, httpOnly: false });

  return res.send(user);
});

router.post('/order', async (req, res, next) => {
    const {user} = req;
    const {route, slot} = req.body;

    const roomMember = await RoomMember.create({
      user,
      slot,
      route,
    });

    const relevantOrder = await findRelevantOrder(DB, roomMember);


    if (!relevantOrder) {
      const newOrder = new Order();
      await newOrder.addMember(roomMember);
      DB.orders.push(newOrder);

      return res.send({order: newOrder});

    } else if (relevantOrder.state === 'drive') {
      await relevantOrder.addCandidate(roomMember);

    } else {
      await relevantOrder.addMember(roomMember);

      return res.send({order: relevantOrder});
    }
});

router.post('/order/vote/', async (req, res, next) => {
  const {user} = req;
  const userId = user.id;

  const {orderId} = req.body;

  const order = DB.orders.find(o => o.id === orderId);

  if(!order) {
    return res.status(404).send();
  }

  order.vote(userId);
  await order.addCandidateToMembers();

  return res.send()
})

router.post('/order/status', (req, res, next) => {
  const {user} = req;
  const {orderId} = req.body;


  if (!user && !orderId) {
    res.status(404).send()
  }

  if (orderId) {
        const order = DB.orders.find(o => o.id === orderId);

        if(!order) {
          return res.status(404).send();
        }


        return res.send({order})
  }

  const order = DB.orders.find(o => o.members.find(m => m.user.id === user.id));

  if(!order) {
    return res.status(404).send();
  }


  return res.send({order})
  
});


router.post('/order/setState', (req, res, next) => {
  const {state, orderId} = req.body;
  
  const order = DB.orders.find(o => o.id === orderId);

  if(!order) {
    return res.status(404).send();
  }

  order.setState(state);

  return res.send({order});
});


resetDB();

module.exports = router;
