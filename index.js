import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NotifyMe.scss';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';

const NotifyMe = () => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Notify Me"), /*#__PURE__*/React.createElement(Button, {
    variant: "link"
  }, "Mark all as read"));
};

export default NotifyMe;
