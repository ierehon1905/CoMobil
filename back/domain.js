const _ = require('lodash');
const got = require('got');
const polygonCentroid = require("@quentinroy/polygon-centroid");
const nanoid = require('nanoid');

const APP_ID = "4CZgSXCcjMAuJyocBpD4";
const APP_CODE = "mwdDoGQLxIxxJqVRjxpg4A";

class User {
    constructor({
        login,
        id
    }) {
        Object.assign(this, {
            id: id || nanoid(),
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
        slot,
        route,
    }) {
        Object.assign(this, {
            user: new User(user),
            waypoints: route,
            voted: false,
            slot: slot,
        });
    }

   static create(params) {
       const {route} = params;
        const result = new RoomMember(params);

        return  getRouteByPoints([route.depPoint, route.arrPoint])
            .then(routeDetails => {
                result.route = routeDetails;
                return result;
            });
    }
}

const orderStates = {
    find: 'find',
    wait: 'wait',
    pickup: 'pickup',
    drive: 'drive',
    cpmplete: 'complete',
}

class Order {
    constructor() {
        Object.assign(this, {
          id: nanoid(),
           members: [],
           route: null,
           state: 'find',
           position: null,
           timeToPickup: null,
           candidates: [],
        })

        // Находим тачку через 5 сек
        setTimeout(() => {
            this.setState(orderStates.wait);
        }, 5000)
    }

    toJSON() {

        const members = this.members.map(m => {
            const {travelTime} = m.route.summary;
            const weight = (this.totalFee - travelTime) / this.totalFee;
            const fee = this.totalFee / this.members.length;

            return Object.assign({}, m, {
                fee,
                oldFee: travelTime,
                discount: 1 - fee / travelTime,
            });
        });

        return {
            ...this,
            totalFee: this.totalFee,
            members,
        }
    }

    get totalFee() {
        return this.route.summary.travelTime * (this.members.length > 1 ? 1.1 : 1);
    }

    get hasFreeSlot() {
        return this.members.length < 3;
    }

    setState(state) {
        switch(state) {
            case orderStates.drive: {
                this.position = this.route.waypoint[0].originalPosition;
                break;
            }
            case orderStates.wait: {
                this.timeToPickup = '5 минут';
            }
            default:
                break;
        }

        this.state = state;
    }

    addCandidate(user) {
        this.candidates.push(user);
    }

    vote(userId) {
        (this.members.find(m => m.user.id) || {}).voted = true; 
    }

    async addCandidateToMembers() {
        const isAvail = _.all(this.members.map(m => m.user.voted));

        if (!isAvail) {
            return;
        }

        this.members.forEach(m => m.voted = false);

        const candidate = this.candidates.pop();

        if (candidate) {
            await this.addMember(candidate);
        }
    }

    async addMember(user)  {
        this.members.push(user);
        this.route = await this.optimizeWholeRoute();
    }

    async getPickupRoute(route) {
        const {depPoint: extraDepPoint} = route;

        const depPoints = this.members.map(m => m.waypoints.depPoint);

        if (extraDepPoint) {
            depPoints.push(extraDepPoint);
        }

        const result = await getRouteByPoints(depPoints);

        return result;
    }

    async optimizeWholeRoute(waypoints) {
        const depPoints = (this.state === orderStates.drive) ? [this.position] : this.members.map(m => m.waypoints.depPoint);

        const arrPoints = this.members.map(m => m.waypoints.arrPoint);

        if (waypoints) {
            depPoints.push(waypoints.depPoint);
            arrPoints.push(waypoints.arrPoint);
        }

        const points = [...depPoints, ...arrPoints];
        return await getRouteByPoints(points);
    }
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

async function findRelevantOrder(DB, {route: waypoints, slot}) {

    if(DB.orders.length === 0) {
        return null;
    }

    const clusters = await Promise.all(
        DB.orders
        .map(order => calculateClusterDistance(order, waypoints))
    );


    const nearestCluster = _.sortBy(clusters, 'travelTime')[0];

    if(!nearestCluster || !nearestCluster.order.hasFreeSlot) {
        return null;
    }

    const selfRoute = await getRouteByPoints([waypoints.depPoint, waypoints.arrPoint]);

    const worsenedConditions = nearestCluster
        .order
        .members
        .map(m => m.route.summary.travelTime)
        .concat(selfRoute.travelTime)
        .find(currentTravelTime => {
            const clusterFee = nearestCluster.travelTime * 1.1;

            const weight = (clusterFee - currentTravelTime) / clusterFee;

            const resultFee = clusterFee / nearestCluster.order.members.length;

            console.log(resultFee);
            console.log(currentTravelTime);

            return (resultFee > currentTravelTime);
        });


    if (worsenedConditions) {
        return null;
    }

    return nearestCluster.order;
};

async function calculateClusterDistance(order, waypoints) {

    const wholeDistance = await order.optimizeWholeRoute(waypoints);

    return {
        travelTime: wholeDistance.summary.travelTime,
        waypoints,
        order,
    } 
}

function getRouteByPoints(points) {

    const waypoints = {};

    points.forEach((p, i) => {
        waypoints['waypoint' + i] = 'geo!' + [p.lat, p.lng].join(',');
    })

    return got("https://route.api.here.com/routing/7.2/calculateroute.json", {
        query: {
            app_id: APP_ID,
            app_code: APP_CODE,
            mode: 'fastest;car;traffic:enabled',
            ...waypoints,
        }
    })
    .then(res => {
        if (res.statusCode >= 400) {
            return null;
        }

        return new RouteSummary(JSON.parse(res.body).response.route[0]);
    })
    .catch(e => {
        console.log(e);
    })
}


module.exports = {
    User,
    RoomMember,
    Order,
    findRelevantOrder
}