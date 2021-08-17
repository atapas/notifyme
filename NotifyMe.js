import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Bell, BellOff, BookOpen, AlertTriangle } from 'react-feather';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NotifyMe.scss';

import {MarcarComoLeidos} from '../../src/redux/notificaciones/actions';
import { useActions } from 'Hooks/useActions';

const NotifyMe = props => {

  const actions = useActions({MarcarComoLeidos})

  moment.locale(navigator.languages[0].toLowerCase()); // State variabls

  const [showCount, setShowCount] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [raedIndex, setReadIndex] = useState(0); // Useref for the overlay
 
  const ref = useRef(null); // Props passed to the component

  const data = props.data;
  const storageKey = props.storageKey || 'notification_timeline_storage_id';
  const key = props.notific_key;
  const notificationMsg = props.notific_value;
  const sortedByKey = props.sortedByKey;
  const heading = props.heading || 'Notifications';
  const bellSize = props.size || 32;
  const bellColor = props.color || '#FFFFFF';
  const multiLineSplitter = props.multiLineSplitter || '\n';
  const showDate = props.showDate || false;
  useEffect(() => {
    if (!sortedByKey) {
      data.sort((a, b) => b[key] - a[key]);
    } // We read if any last read item id is in the local storage


    let readItemLs = reactLocalStorage.getObject(storageKey);
    let readMsgId = Object.keys(readItemLs).length > 0 ? readItemLs['id'] : ''; // if the id found, we check what is the index of that message in the array and query it. If not found,
    // nothing has been read. Hence count should be same as all the message count.

    let readIndex = readMsgId === '' ? data.length : data.findIndex(elem => elem[key] === readMsgId); // if the id is not found, it all flushed out and start again

    readIndex === -1 ? readIndex = data.length : readIndex;
    setReadIndex(readIndex); // If there are messages and readIndex is pointing to at least one message, we will show the count bubble.

    (data.length && readIndex) > 0 ? setShowCount(true) : setShowCount(false);
    setMessageCount(readIndex);
  }, [data]); // Handle the click on the notification bell

  const handleClick = event => {
    setShow(!show);
    setTarget(event.target);
  }; // Calculate the day diff


  const getDayDiff = timestamp => {
    let a = moment();
    let b = moment(timestamp);
    let diff = a.diff(b, 'year');

    if (diff === 0) {
      diff = a.diff(b, 'month');

      if (diff === 0) {
        diff = a.diff(b, 'days');

        if (diff === 0) {
          diff = a.diff(b, 'hour');

          if (diff === 0) {
            diff = a.diff(b, 'minute');

            if (diff === 0) {
              diff = a.diff(b, 'second');
              return `${diff} second(s) before`;
            } else {
              return `${diff} minute(s) before`;
            }
          } else {
            return `${diff} hour(s) before`;
          }
        } else {
          return `${diff} days(s) before`;
        }
      } else {
        return `${diff} month(s) before`;
      }
    } else {
      return `${diff} year(s) before`;
    }
  };

  const getWhen = timestamp => {
    let when = `${moment(timestamp).format('L')} ${moment(timestamp).format('LTS')}`;
    return when;
  }; // Get the notification message


  const getContent = message => {

    if (message.indexOf(multiLineSplitter) >= 0) {
      let splitted = message.split(multiLineSplitter);
      let ret = '<ul>';

      for (let i = 0; i <= splitted.length - 1; i++) {
        if (splitted[i] !== '') {
          ret = ret + '<li>' + splitted[i] + '</li>';
        }
      }

      ret = ret + '</ul>';
      return {
        __html: ret
      };
    }

    return {
      __html: `<ul><li>${message}</li></ul>`
    };
  }; // Hide the notification on clicking outside

    // const markList = (idMensaje) => {
    //   MarcarComoLeidos(idMensaje);
    // }

    // const MarcarComoLeidos = async (id) => {
    //   debugger
    //   let _response = await actions.MarcarComoLeidos(id)
    //   if (!_response.error) {
    //     setShowCount(false);
    //     reactLocalStorage.setObject(storageKey, {
    //       'id': data[0][key]
    //     });
    //     setReadIndex(0);
    //   }
    // }

    const handleClickMessage =(item)=>{
        console.log("nodeModule console "  + JSON.stringify(item))
    }
  const hide = () => {
    setShow(false);
  }; // Call the function when mark as read link is clicked


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
  }, /*#__PURE__*/React.createElement(Bell, {
    color: bellColor,
    size: bellSize
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
  }, heading), /*#__PURE__*/React.createElement(Popover.Content, {
    style: {
      padding: '3px 3px'
    }
  }, showCount && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    onClick:  props.markAsReadFn || markAsRead
  }, /*#__PURE__*/React.createElement(BookOpen, {
    size: 24
  }), "Marcar como leídos.")), /*#__PURE__*/React.createElement("ul", {
    className: "notification-info-panel"
  }, data.length > 0 ? data.map((message, index) => /*#__PURE__*/React.createElement("li", {
    className: index < raedIndex ? 'notification-message unread' : 'notification-message',
    onClick: handleClickMessage(message),
    key: index
  }, /*#__PURE__*/React.createElement("div", {
    className: "timestamp"
  }, /*#__PURE__*/React.createElement("span", null, getDayDiff(message[key])), showDate && /*#__PURE__*/React.createElement("span", null, ' (', getWhen(message[key]), ')')), /*#__PURE__*/React.createElement("div", {
    className: "content",
    dangerouslySetInnerHTML: getContent(message[notificationMsg])
  }))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AlertTriangle, {
    color: "#000000",
    size: 32
  }), /*#__PURE__*/React.createElement("h5", {
    className: "nodata"
  }, "Sin notificaciones."))))))));
};

NotifyMe.prototype = {
  storageKey: PropTypes.string,
  notific_key: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  notific_value: PropTypes.string.isRequired,
  sortedByKey: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.string,
  heading: PropTypes.string,
  multiLineSplitter: PropTypes.string,
  showDate: PropTypes.bool,
  markAsReadFn: PropTypes.func,
  onClick: PropTypes.func

};
export default NotifyMe;