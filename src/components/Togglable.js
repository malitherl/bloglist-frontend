import { useState } from "react"

const Togglable = (props) => {
  
    const [toggle, setToggle] = useState(false)
  
    const showWhenVisible = { display: toggle ? '' : 'none'}
    const hideWhenVisible = { display: toggle ? 'none' : ''}
  
    const handleToggle = (() => setToggle(!toggle))
  
  
    return (
      <div>
          <div style={hideWhenVisible}>
            <button onClick={handleToggle}>{props.buttonLabel}</button>
          </div>
          <div style={showWhenVisible}>
            {props.children}
          </div>
          <button onClick={handleToggle}>cancel</button>
      </div>
    )
  }
  
export default Togglable
  