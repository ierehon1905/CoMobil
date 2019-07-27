import React from 'react';
import { Input } from 'antd';
import './style.css';

const BulletInput = props => (
  <div className="bulletinput">
    <div className="bullet" style={{ backgroundColor: props.bulletColor }} />
    <div className="bulletinputwrapper">
      <Input
        placeholder={props.placeholder}
        onChange={(e) => {
          console.log(e.target);

          props.onChange(e.target.value, props.number);
        }}
        size="large"
        // allowClear
        style={{ backgroundColor: '#E5E5EA', border: 'none', borderRadius: 8 }}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        value={props.value}
      />
    </div>
  </div>
);

export default BulletInput;
