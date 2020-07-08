import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all';
import './NotifyMe.scss';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { reactLocalStorage } from 'reactjs-localstorage';

const NotifyMe = props => {
  const data = props.data;
  const [showCount, setShowCount] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [raedIndex, setReadIndex] = useState(0);
  const ref = useRef(null);
  const storageKey = props.storageKey;
  const key = props.notific_key;
  const notificationMsg = props.notific_value;
  const sortedByKey = props.sortedByKey;
  useEffect(() => {
    if (!sortedByKey) {
      data.sort((a, b) => b[key] - a[key]);
    } // We read if any last read item id is in the local storage


    let readItemLs = reactLocalStorage.getObject(storageKey);
    let readMsgId = Object.keys(readItemLs).length > 0 ? readItemLs['id'] : ''; // if the id found, we check what is the index of that message in the array and query it. If not found,
    // nothing has been read. Hence count should be same as all the mmesage count.

    let readIndex = readMsgId === '' ? data.length : data.findIndex(elem => elem[key] === readMsgId); // if the id is not found, it all flushed out and start again

    readIndex === -1 ? readIndex = 50 : readIndex;
    setReadIndex(readIndex); // If there are messages and readIndex is pointing to at least one message, we will show the count bubble.

    (data.length && readIndex) > 0 ? setShowCount(true) : setShowCount(false);
    setMessageCount(readIndex);
  }, []);

  const handleClick = event => {
    setShow(!show);
    setTarget(event.target);
  };

  const getDayDiff = key => {
    var a = moment();
    var b = moment(key * 1000);
    let diff = a.diff(b, 'days');

    if (diff === 0) {
      diff = a.diff(b, 'hour');

      if (diff === 0) {
        diff = a.diff(b, 'minute');
        return `${diff} minute(s) before`;
      } else {
        return `${diff} hour(s) before`;
      }
    } else {
      return `${diff} day(s) before`;
    }
  };

  const getContent = message => {
    if (message.indexOf('\n')) {
      let splitted = message.split('\n');
      let ret = '<ul>';

      for (let i = 0; i < splitted.length - 1; i++) {
        if (splitted[i] !== '') {
          ret = ret + '<li>' + splitted[i] + '</li>';
        }
      }

      ret = ret + '</ul>';
      return {
        __html: ret
      };
    }

    return `<span>${message}</span>`;
  };

  const hide = () => {
    setShow(false);
  };

  const markAsRead = () => {
    setShowCount(false);
    reactLocalStorage.setObject(storageKey, {
      'id': data[0][key]
    });
    setReadIndex(0);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "notification-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: showCount ? 'notification notify show-count' : 'notification notify',
    "data-count": messageCount,
    onClick: event => handleClick(event)
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-bell"
  }))), /*#__PURE__*/React.createElement("div", {
    ref: ref
  }, /*#__PURE__*/React.createElement(Overlay, {
    show: show,
    target: target,
    placement: "bottom",
    container: ref.current,
    containerPadding: 20,
    rootClose: true,
    onHide: hide
  }, /*#__PURE__*/React.createElement(Popover, {
    id: "popover-contained"
  }, /*#__PURE__*/React.createElement(Popover.Title, {
    as: "h3"
  }, "Breaking Alerts!"), /*#__PURE__*/React.createElement(Popover.Content, {
    style: {
      padding: '3px 3px'
    }
  }, showCount && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    onClick: markAsRead
  }, "Mark all as read")), /*#__PURE__*/React.createElement("ul", {
    className: "notification-info-panel"
  }, data.map((message, index) => /*#__PURE__*/React.createElement("li", {
    className: index < raedIndex ? 'notification-message unread' : 'notification-message',
    key: index
  }, /*#__PURE__*/React.createElement("div", {
    className: "timestamp"
  }, getDayDiff(message[key])), /*#__PURE__*/React.createElement("div", {
    className: "content",
    dangerouslySetInnerHTML: getContent(message[notificationMsg])
  })))))))));
};

export default NotifyMe;
