import React, {useState, useEffect, useRef} from 'react'

const buttonStyles = {
  border: '1px solid #ccc',
  background: '#fff',
  fontSize: '2em',
  padding: 15,
  margin: 5,
  width: 200,
}

function useStopwatch(il = 0, ir = false) {
  const [lapse, setLapse] = useState(il)
  const [running, setRunning] = useState(ir)

  return {lapse, setLapse, running, setRunning}
}

function Stopwatch() {
  const {lapse, setLapse, running, setRunning} = useStopwatch()
  const timerRef = useRef()

  useEffect(() => () => clearInterval(timerRef.current), [])

  function handleRunClick() {
    if (running) {
      clearInterval(timerRef.current)
    } else {
      const startTime = Date.now() - lapse
      timerRef.current = setInterval(() => {
        const newLapse = Date.now() - startTime
        setLapse(newLapse)
      }, 1)
    }

    setRunning(!running)
  }

  function handleClearClick() {
    clearInterval(timerRef.current)
    setLapse(0)
    setRunning(false)
  }

  return (
    <div style={{textAlign: 'center'}}>
      <label
        style={{
          fontSize: '5em',
          display: 'block',
        }}
      >
        {lapse}
        ms
      </label>
      <button onClick={handleRunClick} style={buttonStyles}>
        {running ? 'Stop' : 'Start'}
      </button>
      <button onClick={handleClearClick} style={buttonStyles}>
        Clear
      </button>
    </div>
  )
}

function Usage() {
  return <Stopwatch />
}
Usage.title = 'Stopwatch: useEffect cleanup'

export default Usage
