import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'


const Togglable = React.forwardRef((props, ref) => {
  console.log(ref)
  const [toggle, setToggle] = useState(false)

  const showWhenVisible = { display: toggle ? '' : 'none' }
  const hideWhenVisible = { display: toggle ? 'none' : '' }

  const handleToggle = (() => setToggle(!toggle))


  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={handleToggle}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
      </div>
      <Button onClick={handleToggle}>cancel</Button>
    </div>
  )
})

Togglable.displayName = 'Toggable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}



export default Togglable
