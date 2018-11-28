// Stopwatch: Custom hook
import React, {useReducer, useEffect, useRef} from 'react'

const buttonStyles = {
  border: '1px solid #ccc',
  background: '#fff',
  fontSize: '2em',
  padding: 15,
  margin: 5,
  width: 200,
}

const reducer = (currentState, newState) => ({...currentState, ...newState})

function useStopwatch(
  initialState = {
    running: false,
    lapse: 0,
  },
) {
  const [{running, lapse}, setState] = useReducer(reducer, initialState)

  const timerRef = useRef()
  useEffect(() => () => clearInterval(timerRef.current), [])

  function onRunClick() {
    if (running) {
      clearInterval(timerRef.current)
    } else {
      const startTime = Date.now() - lapse
      timerRef.current = setInterval(() => {
        setState({lapse: Date.now() - startTime})
      }, 0)
    }
    setState({running: !running})
  }

  function onClearClick() {
    clearInterval(timerRef.current)
    setState({running: false, lapse: 0})
  }

  return {running, lapse, onRunClick, onClearClick}
}

function Stopwatch() {
  const first = useStopwatch()
  const second = useStopwatch()

  return (
    <div style={{textAlign: 'center'}}>
      <StopwatchView {...first} />
      <hr />
      <strong>Lapse Difference: </strong>
      <span data-testid="diff">{first.lapse - second.lapse}ms</span>
      <hr />
      <StopwatchView {...second} />
    </div>
  )
}

function StopwatchView({lapse, running, onRunClick, onClearClick}) {
  return (
    <>
      <label
        style={{
          fontSize: '5em',
          display: 'block',
        }}
      >
        {lapse}
        ms
      </label>
      <button onClick={onRunClick} style={buttonStyles}>
        {running ? 'Stop' : 'Start'}
      </button>
      <button onClick={onClearClick} style={buttonStyles}>
        Clear
      </button>
    </>
  )
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.

function Usage() {
  return <Stopwatch />
}
Usage.title = 'Stopwatch: Custom hook'

export default Usage
