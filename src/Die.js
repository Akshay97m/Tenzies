import React from 'react'

// value is props.value , props.isHeld, props.holdDice

const Die = ({value, isHeld, holdDice}) => {

    const styles = {
        backgroundColor : isHeld  ? "#59E391" : "#FFF"
    }

  return (
    <div style={styles} onClick={holdDice} className='die-face'>
        <h2 className='die-num'>{value}</h2>
    </div>
  )
}

export default Die