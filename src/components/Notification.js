import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state)

  if (notification.notification === null) {
    return null
  } else if (!notification.notification) {
    return null
  } else {
    let notifStyle = {}
    if (notification.notification.toLowerCase().includes('error')) {
      notifStyle = {
        border: '1px solid red',
        color: 'red'
      }
    } else {
      notifStyle = {
        border: '1px solid yellowgreen',
        color: 'yellowgreen'
      }
    }
    return (
      <div className='notification' style={notifStyle}>
        {notification.notification}
      </div>
    )
  }
}

export default Notification