import React, { useState } from 'react'
import './DarkModeSwitch.css'

function DarkModeSwitch(props){

    
  const [styles, setStyles]= useState({
    backgroundColor: "white"
  });

  const [styles2, setStyles2] = useState({
    transform: "translateX(1px)"
  })


  const [mode, setMode] = useState("OFF")


  let clicked = props.clicked
  


  function correctBackground(bool){
    if (!bool){
       setStyles({
        backgroundColor: "rgb(114, 214, 114)"
      })
    }
    else {
      setStyles({
        backgroundColor: "white"
      })
    }
  }

  function correctSwitch(bool){
    if (!bool){
      setStyles2({
       transform: "translateX(24px)"
     })
   }
   else {
     setStyles2({
      transform: "translateX(1px)"
     })
   }
  }



  function switchMode( bool){
    if (bool) return setMode("OFF")
    else return setMode("ON")
  }

  const handleclick = () => {

    correctSwitch(clicked)
    correctBackground(clicked)
    switchMode(clicked)
    const updatedClicked = !clicked
    props.setClicked(updatedClicked)
  }

  return (
    <>
      <div style={clicked ? {backgroundColor: 'rgb(80, 80, 80)'}
                          : {backgroundColor: 'white'}} id='background'>
        <p>Dark Mode: {mode} </p>
        <div style={styles}id="button" role='button' onClick={handleclick}>
          <div id="switch" style={styles2}></div>
        </div>
      </div>

    </>
  )

}

export default DarkModeSwitch
