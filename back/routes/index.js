var express = require('express');
var router = express.Router();
const {
  User,
  RoomMember,
  Order
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

router.post('/order', (req, res, next) => {
    const {user, route} = req.body;

    const roomMember = new roomMember({
      user,
      route,
    });

    const relevantOrder = findRelevantOrder(DB, route);

    if (!relevantOrder) {
      const newOrder = new Order();
      newOrder.addMember(roomMember);
      DB.orders.push(newOrder);

      return res.send({order: newOrder});

    } else {
      relevantOrder.addMember(roomMember);

      return res.send({order: relevantOrder});
    }
});

router.post('/order/:orderId/status', (req, res, next) => {
  const {orderId} = req.params;
  
  const order = DB.orders.find(o => o.id === orderId);

  return res.send({order})
});

resetDB();

module.exports = router;
