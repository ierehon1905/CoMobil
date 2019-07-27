const _ = require('lodash');

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
    }) {
        Object.assign(this, {
            user: new User(user),
            route,
        })
    }
}

class Order {
    constructor({}) {
        Object.assign(this, {
           members: [],
           route: null,
        })
    }

    addMember(user)  {
        this.members.push(user);
        this.route = this.optimizeRoute();
    }

    optimizeRoute() {
        return this.members[0].route;
    }
}

function findRelevantOrder(DB, route) {
    const clusters =  DB.orders
        .map(order => calculateClusterDistance(order, route));

    const nearestCluster = _.sortBy(clusters, 'distance')[0];

    if(!nearestCluster) {
        return null;
    }

    return nearestCluster.order;
};

function calculateClusterDistance(order, route) {
    return {
        order,
        distance: 0
    }
}

module.exports = {
    User,
    RoomMember,
    Order,
    findRelevantOrder
}