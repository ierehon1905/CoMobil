const _ = require('lodash');
const got = require('got');

const APP_ID = "4CZgSXCcjMAuJyocBpD4";
const APP_CODE = "mwdDoGQLxIxxJqVRjxpg4A";

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
        });

      
    }

   static create(params) {
       const {route} = params;
        const result = new RoomMember(params);

        return  getRouteByPoints({depPoint: route.depPoint, arrPoint: route.arrPoint})
            .then(routeDetails => {
                result.route = routeDetails;
                return result;
            });
    }
}


class Order {
    constructor() {
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

function getRouteByPoints({depPoint, arrPoint}) {
    return got("https://route.api.here.com/routing/7.2/calculateroute.json", {
        query: {
            app_id: APP_ID,
            app_code: APP_CODE,
            waypoint0: 'geo!' + _.values(depPoint).join(','),
            waypoint1: 'geo!' + _.values(arrPoint).join(','),
            waypoint2: 'geo!' + '53.3,40.33',
            mode: 'fastest;car;traffic:enabled',
        }
    })
    .then(res => {
        if (res.statusCode >= 400) {
            return null;
        }

        return new RouteSummary(JSON.parse(res.body).response.route[0]);
    })
    .catch(e => {
        console.log('erase');
    })
}


class RouteSummary {
    constructor({
        waypoint,
        summary
    }) {
        Object.assign(this, {
            waypoint,
            summary,
        })
    }
}

module.exports = {
    User,
    RoomMember,
    Order,
    findRelevantOrder
}