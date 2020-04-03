import React, { useEffect } from 'react'

const Timer = ({ time, setTime }) => {

  useEffect(() => {
    const timer = setInterval(() => setTime(time + 1), 1000)
    return () => clearInterval(timer)
  }, [time])

  return (
    <>{time}</>
  )
}

export default Timer
