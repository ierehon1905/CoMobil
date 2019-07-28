import React, { Component } from 'react';
import './styles.css';

export default class Map extends React.PureComponent {
  componentDidMount() {

    if (!this._map) {
      this._makeScript('https://js.api.here.com/v3/3.1/mapsjs-core.js');
      this._makeScript('https://js.api.here.com/v3/3.1/mapsjs-service.js');
      this._makeScript('https://js.api.here.com/v3/3.1/mapsjs-mapevents.js');
      this._makeScript('https://js.api.here.com/v3/3.1/mapsjs-ui.js');
    }

    this.props.getLink(this);

  }

  constructor(props) {
    super(props);
    this.state = {
      depPoint: null,
      arrPoint: null,
      route: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.depPoint && this.state.arrPoint && !this.state.route) {
      this._calculateRouteFromAtoB(this._platform);
    }
  }

  render() {
    return (
      <div className={'container'} onClick={this._onMapClick}>
        <div className="map" id="mapContainer" />
      </div>
    );
  }

  _onScriptLoad = () => {
    const { H } = window;
    if (!H || !H.service || !H.mapevents || !H.ui) {
      return;
    }

    this._platform = new window.H.service.Platform({
      //eslint-disable-line
      apikey: 'jTH-kh64YxepgAEN1-Xkapps-x2FiJwY7EeJTtmD0Fw',
    });

    if ('geolocation' in {}) {
      // navigator.geolocation.getCurrentPosition(
      //   position => {
      //     console.log(position);
      //     const { latitude: lat, longitude: lng } = position.coords;
      //     this._initMap(H, this._platform, { lat, lng });
      //   },
      //   e => console.log(e),
      //   {
      //     enableHighAccuracy: true,
      //     timeout: 10000,
      //     maximumAge: Infinity,
      //   }
      // );
    } else {
      this._initMap(H, this._platform, { lat: 55.7408, lng:  37.6089 });
    }
  };

  _onMapClick = evt => {
    const coord = this._map.screenToGeo(evt.clientX, evt.clientY);

    if (!this.state.depPoint) {
  
      this.setState({ depPoint: coord });
      const marker = new window.H.map.Marker(coord);
      this._map.addObject(marker);

    } else if (!this.state.arrPoint) {
    
      this.setState({ arrPoint: coord });
      const marker = new window.H.map.Marker(coord);
      this._map.addObject(marker);
  
    }
  };

  setDepPoint = coords => {
    this.setState({ depPoint: coords });
  };

  setArrPoint = coords => {
    this.setState({ depPoint: coords });
  };

  setPoint = ({ type, coords }) => {
    if (type == 'arrPoint') this.setArrPoint(coords);
    else if (type == 'depPoint') this.setDepPoint(coords);
    else throw new Error('SOSI');
  };

  _onRouteSuccess = result => {
    this.setState({ route: result });

    var route = result.response.route[0];

    this._addRouteShapeToMap(route);
    this._addManueversToMap(route);
  };

  _onRouteError = e => {
    alert('Бл');
  };

  _initMap = (H, platform, center) => {
    try {
      const defaultLayers = platform.createDefaultLayers();


      this._map = new window.H.Map( // eslint-disable-line
        document.getElementById('mapContainer'), // eslint-disable-line
        defaultLayers.vector.normal.map,
        {
          center: center,
          zoom: 15,
          pixelRatio: window.devicePixelRatio || 1,
        },
      );

      console.log(this._map);

      this._behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(this._map));

      this._ui = H.ui.UI.createDefault(this._map, defaultLayers);


      this._geocoder = this._platform.getGeocodingService();

    } catch (e) {
      console.log(e);
    }
  };

  _makeScript = src => {
    const script1 = document.createElement('script');

    script1.src = src;
    script1.async = false;
    script1.onload = this._onScriptLoad;

    document.body.appendChild(script1);
  };

  _geoCoder = searchText => {
    const geocoder = this._platform.getGeocodingService();

    geocoder.geocode({ searchText }, r => console.log(r), e => console.log(e));
  };

  _calculateRouteFromAtoB(platform) {
    var router = platform.getRoutingService(),
      routeRequestParams = {
        mode: 'fastest;car',
        representation: 'display',
        routeattributes: 'waypoints,summary,shape,legs',
        maneuverattributes: 'direction,action',
        waypoint0: Object.values(this.state.depPoint).join(','), // Brandenburg Gate
        waypoint1: Object.values(this.state.arrPoint).join(','), // Friedrichstraße Railway Station
      };

    router.calculateRoute(routeRequestParams, this._onRouteSuccess, this._onRouteError);
  }

  _addRouteShapeToMap(route) {
    var lineString = new window.H.geo.LineString(),
      routeShape = route.shape,
      polyline;

    routeShape.forEach(function(point) {
      var parts = point.split(',');
      lineString.pushLatLngAlt(parts[0], parts[1]);
    });

    polyline = new window.H.map.Polyline(lineString, {
      style: {
        lineWidth: 4,
        strokeColor: 'rgba(0, 128, 255, 0.7)',
      },
    });
    // Add the polyline to the map
    this._map.addObject(polyline);
    // And zoom to its bounding rectangle
    this._map.getViewModel().setLookAtData({
      bounds: polyline.getBoundingBox(),
    });
  }

  _addManueversToMap = route => {
    var svgMarkup = '',
      dotIcon = new window.H.map.Icon(svgMarkup, { anchor: { x: 8, y: 8 } }),
      group = new window.H.map.Group(),
      i,
      j;

    // Add a marker for each maneuver
    for (i = 0; i < route.leg.length; i += 1) {
      for (j = 0; j < route.leg[i].maneuver.length; j += 1) {
        // Get the next maneuver.
        this._maneuver = route.leg[i].maneuver[j];
        // Add a marker to the maneuvers group
        var marker = new window.H.map.Marker(
          {
            lat: this._maneuver.position.latitude,
            lng: this._maneuver.position.longitude,
          },
          { icon: dotIcon },
        );
        marker.instruction = this._maneuver.instruction;
        group.addObject(marker);
      }
    }
  };
}
