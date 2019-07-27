import React, { Component } from 'react';
import './styles.css';


let platform;


export default class Map extends React.PureComponent {
  componentDidMount() {
    const script1 = document.createElement('script');

    script1.src = 'https://js.api.here.com/v3/3.1/mapsjs-core.js';
    script1.async = false;
    script1.onload = this._onScriptLoad;

    document.body.appendChild(script1);

    const script2 = document.createElement('script');

    script2.src = 'https://js.api.here.com/v3/3.1/mapsjs-service.js';
    script2.async = false;
    script2.onload = this._onScriptLoad;
    document.body.appendChild(script2);
  }

  _defineLocation = () => {
    
  }


  _onScriptLoad = () => {
    const {H} = window;

    console.log(H);
    console.log(H && H.service);

    if(!H || !H.service) {
      return;
    }

    platform = new H.service.Platform({ //eslint-disable-line
      apikey: 'jTH-kh64YxepgAEN1-Xkapps-x2FiJwY7EeJTtmD0Fw',
    });

    const defaultLayers = platform.createDefaultLayers();


    if ("geolocation" in navigator) {

      navigator.geolocation.getCurrentPosition((position) => {
        const {latitude: lat, longitude: lng} = position.coords;

        console.log('kekeke')

        console.log(lat, lng);

         this._map = new H.Map( // eslint-disable-line
          document.getElementById('mapContainer'), // eslint-disable-line
          defaultLayers.vector.normal.map,
          {
            center: {lat, lng},
            zoom: 15,
            pixelRatio: window.devicePixelRatio || 1
          },
        );
         // Instantiate (and display) a map object:
        
      });
    } else {
      const defaultCoords = {
        lat: 52.5,
        long: 13.4,
      };

      this._map = new H.Map( // eslint-disable-line

        document.getElementById('mapContainer'), // eslint-disable-line
        defaultLayers.vector.normal.map,
        {
          zoom: 15,
          center: defaultCoords
        },
      );
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
}
