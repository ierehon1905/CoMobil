import React, { useState, useEffect, PureComponent } from 'react';
import { Divider, Switch, Icon, Button, List } from 'antd';
import { throttle } from 'lodash';
import BulletInput from '../BulletInput';
import './style.css';

const BottomBar = props => {
  const [findPeers, setFindPeers] = useState(true);
  const [inputFocused, setInputFocused] = useState(-1);
  const [suggestions, setSuggestions] = useState([]);
  const [values, setValues] = useState(['', '']);

  const throttledGeocode = throttle(
    text => {
      console.log(props.mapComp);
      if (!props.mapComp._geocoder || !text) return;
      props.mapComp._geocoder.geocode(
        { searchText: text },
        r => {
          try {

            const suggs = r['Response']['View'][0]['Result'].map(el => ({
              name: el['Location']['Address']['Label'],
              lat: el['Location']['DisplayPosition']['Latitude'],
              lon: el['Location']['DisplayPosition']['Longitude'],
            }));

            setSuggestions(suggs);
          } catch {
            setSuggestions(['К сожалению, произошол тхроттлинг']);
          }
        },
        e => console.log(e),
      );
    },
    200,
  );

  const handleInputChange = (text, number) => {

    setValues(number == 0 ? [text, values[1]] : [values[0], text]);

    if (text.length == 0) return;
    new Promise(resolve => {
      throttledGeocode(text);
      resolve();
    });
  };

  const handleMapClick = (position) => {

  }

  const handleSuggestionClick = i => {

  
    const newVals = Object.assign({}, values);
  
    newVals[inputFocused] = suggestions[i].name;


    setValues(newVals);

    const coords = { lat: suggestions[i].lat, lng: suggestions[i].lon };
    const marker = new window.H.map.Marker(coords);
  
    props.mapComp._map.addObject(marker);

  };

  return (
    <div
      className="bottombar"
      style={{ height: inputFocused > -1 ? '400px' : 'fit-content' }}
      onMouseLeave={() => setInputFocused(-1)}
    >
      <div
        className="bottombarinputwrapper"
        style={{
          fontSize: '18px',
        }}
      >
        <BulletInput
          placeholder="from"
          bulletColor="#355CE0"
          onFocus={() => setInputFocused(0)}
          // onBlur={() => setInputFocused(-1)}
          onChange={handleInputChange}
          number={0}
          value={values[0]}
        />
        <BulletInput
          placeholder="to"
          bulletColor="#EF7930"
          onFocus={() => setInputFocused(1)}
          // onBlur={() => setInputFocused(-1)}
          onChange={handleInputChange}
          number={1}
          value={values[1]}
        />
      </div>
      <Divider style={{ margin: 0 }} />
      <div
        className="bottombarinputwrapper"
        style={{
          fontFamily: 'CirceBold',
          fontSize: 18,
          display: inputFocused > -1 ? 'none' : 'block',
        }}
      >
        <div
          onClick={() => setFindPeers(!findPeers)}
          role="button"
          style={{ display: 'inline-block' }}
        >
          <Switch defaultChecked checked={findPeers} style={{ marginRight: 8 }} />
          <span>Найти попутчиков</span>
        </div>
        <Divider type="vertical" />
        <Icon type="apple" style={{ marginRight: 8 }} />
        <span>ApplePay</span>
        <Divider style={{ backgroundColor: 'transparent', margin: '5px 0' }} />
        <Button
          type="primary"
          block
          shape="round"
          style={{ backgroundColor: '#EF7930', fontSize: 20, height: 48 }}
        >
          Заказать
        </Button>
      </div>
      <div
        className="bottombarinputwrapper"
        style={{ display: inputFocused > -1 ? 'block' : 'none' }}
      >
        <List
          size="small"
          dataSource={suggestions}
          // onClick={handleSuggestionClick}
          renderItem={(item, i) => (
            <List.Item onClick={() => handleSuggestionClick(i)} className="suggestion">
              {item.name}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default BottomBar;
