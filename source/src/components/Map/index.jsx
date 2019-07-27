import React, { Component } from 'react';
import './styles.css';


let platform;



export default class Map extends React.PureComponent {

  componentDidMount() {
    this._makeScript('https://js.api.here.com/v3/3.1/mapsjs-core.js');
    this._makeScript('https://js.api.here.com/v3/3.1/mapsjs-service.js');
    this._makeScript("https://js.api.here.com/v3/3.1/mapsjs-mapevents.js");
    this._makeScript("https://js.api.here.com/v3/3.1/mapsjs-ui.js");
  }

  

  _onScriptLoad = () => {
    console.log('asddqd')

    const {H} = window;
    console.log(H)

    if(!H || !H.service || !H.mapevents) {
      return;
    }

    platform = new H.service.Platform({ //eslint-disable-line
      apikey: 'jTH-kh64YxepgAEN1-Xkapps-x2FiJwY7EeJTtmD0Fw',
    });

    if ("geolocation" in navigator) {

      navigator.geolocation.getCurrentPosition((position) => {
        const {latitude: lat, longitude: lng} = position.coords;
        this._initMap(H, platform, {lat, lng});
         // Instantiate (and display) a map object:
      });
    } else {
      this._initMap(H, platform, {lat: 50, lng: 50});
    }
  }

  render() {
    return (
      <div className={'container'}>
        <div className="map" id="mapContainer" />
        kek
      </div>
    );
  }

  _initMap = (H, platform, center) => {

    const defaultLayers = platform.createDefaultLayers();

    this._map = new H.Map( // eslint-disable-line
      document.getElementById('mapContainer'), // eslint-disable-line
      defaultLayers.vector.normal.map,
      {
        center: center,
        zoom: 15,
        pixelRatio: window.devicePixelRatio || 1
      },
    );

    this._behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this._map));

    this._ui = H.ui.UI.createDefault(this._map, defaultLayers);
  }

  _makeScript = (src) => {
    const script1 = document.createElement('script');
  
      script1.src = src;
      script1.async = false;
      script1.onload = this._onScriptLoad;
  
      document.body.appendChild(script1);
  }
}
