import React, {useEffect, useRef, useReducer} from 'react'

const buttonStyles = {
  border: '1px solid #ccc',
  background: '#fff',
  fontSize: '2em',
  padding: 15,
  margin: 5,
  width: 200,
}

const initialState = {
  running: false,
  lapse: 0,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_STATE':
      return {
        ...state,
        ...action.payload,
      }
    case 'CLEAR':
      return {
        ...state,
        running: false,
        lapse: 0,
      }
    default:
      return state
  }
}

const setState = payload => ({type: 'SET_STATE', payload})
const clearState = () => ({type: 'CLEAR'})

function Stopwatch() {
  const timerRef = useRef(null)
  const [state, dispatch] = useReducer(reducer, initialState)
  const {lapse, running} = state

  useEffect(() => () => clearInterval(timerRef.current), [])

  function handleRunClick() {
    if (running) {
      clearInterval(timerRef.current)
    } else {
      const startTime = Date.now() - lapse
      timerRef.current = setInterval(() => {
        dispatch(setState({lapse: Date.now() - startTime}))
      }, 0)
    }
    dispatch(setState({running: !running}))
  }

  function handleClearClick() {
    clearInterval(timerRef.current)
    dispatch(clearState())
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

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.

function Usage() {
  return <Stopwatch />
}
Usage.title = 'Stopwatch: useReducer (a la redux)'

export default Usage
