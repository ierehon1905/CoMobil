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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/reset', (req, res, next) => {
  resetDB();
  res.send();
})

router.get('/ping', (req, res) => {
  res.send('kek')
})

router.post('/me', (req, res, next) => {
  const user = DB.users.find(u => !u.isUsed);

  if(!user) {
    return res.send(null);
  }

  user.setUsed();

  return res.send(user);
});

router.post('/order', async (req, res, next) => {
    const {user, route, slot} = req.body;

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
  const {orderId, userId} = req.body;

  const order = DB.orders.find(o => o.id === orderId);

  if(!order) {
    return res.status(404).send();
  }

  order.vote(userId);
  await order.addCandidateToMembers();

  return res.send()
})

router.post('/order/status', (req, res, next) => {
  const {orderId} = req.body;
  
  const order = DB.orders.find(o => o.id === orderId);

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
