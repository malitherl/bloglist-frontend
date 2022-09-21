import { useState } from "react"
import PropTypes from 'prop-types'


const Togglable = React.forwardRef((props, ref) => {
  
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
  })

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}


  
export default Togglable
  