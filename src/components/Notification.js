const Notification = ({message}) => {
    if(message == null){
      return null
    } else {
      let notifStyle = {}
      if(message.toLowerCase().includes('error')){
         notifStyle = {
          border: "1px solid red",
          color: "red"
        }
      } else {
        notifStyle = {
          border: "1px solid yellowgreen",
          color: "yellowgreen"
        }
      }  
      return(
        <div className='notification' style={notifStyle}>
          {message}
        </div>
      )
    }
  }

  export default Notification