class User {
    constructor({
        login,
    }) {
        Object.assign(this, {
            login,
            isUsed: false,
        })
    }

    setUsed() {
        this.isUsed = true;
    }
}

class RoomMember {
    constructor({
        user,
        route,
        status,
        distance,
        time,
        fee,
    }) {
        Object.assign(this, {
            user,
            route,
            distance,
            time,
            fee,
        })
    }
}

class Order {
    constructor({}) {
        Object.assign(this, {
           members: [],
           route: null
        })
    }

    _addMember(user)  {
        this.members.push(user);
    }
}

module.exports = {
    User,
    RoomMember,
    Order
}