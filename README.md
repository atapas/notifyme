# 🔔 react-notification-timeline
`react-notification-timeline` is a [react](https://reactjs.org/) based component helps in managing the notification in time-based manner. It is capable of keep tracking of the incoming notifications, managed read vs unread nitifications and many more customizations.

# 🔥 Why do you need this?
- 👉 Is your project is based on react js and you are looking for a time-based notification system? 
- 👉 Do you want to keep track of the notifications in timed manner and manage them with reading as you go? 
- 👉 Do you want to structure the notifications in a cleaner way?
- 👉 Do you want to manage multi-line notifications?
- 👉 Do you limit the number of notifications you may want to see?

Then, you should give `react-notification-timeline` a try. 

## Here are some screen-shots
- Notification Componet with count

  <img src="./static/notification.png" alt="notification " />
 
- Notification Componet with count and the messages

 <img src="./static/screen.png" alt="notification with messages" width="400" height="400">

## Live Demo
TBA

# ⚒️ How to use?

## Install
You can install `react-notification-timeline` using npm or yarn.

```shell
npm i react-notification-timeline
```

```yarn
yarn add react-notification-timeline
```

## Import
Once installed, it can be imported into a react component as,

```js
import NotifyMe from 'react-notification-timeline';
```

## Usage
Here is an example usage,

```js
<NotifyMe
  data={data}
  storageKey='notific_key'
  notific_key='timestamp'
  notific_value='update'
  heading='Notification Alerts'
  sortedByKey={false}
  showDate={true}
  size={64}
  color="yellow"
/>
```

### Properties

<table>
  <tr>
    <td> <b>Property</b> </td> 
    <td> <b>Description</b> </td>
    <td> <b>Required</b> </td>
    <td> <b>Example</b> </td>
  </tr>

  <tr>
    <td> color </td>
    <td> Color of the notification bell. </td>
    <td> No </td>
    <td> Color in Hexacode, rgb or string name. Default value is *#FFFFFF*</td>
  </tr>
</table>

# ✋ Contributions

# 🏷️ License

# ⭐ Show your support
