import React, {useState, useEffect, useRef} from 'react'

const buttonStyles = {
  border: '1px solid #ccc',
  background: '#fff',
  fontSize: '2em',
  padding: 15,
  margin: 5,
  width: 200,
}

const asAStopWatch = () => WrappedElement =>
  class extends React.Component {
    state = {
      running: this.props.running || false,
      lapse: this.props.lapse || 0,
    }

    setRunning = running => {
      this.setState({running})
    }

    setLapse = lapse => {
      this.setState({lapse})
    }

    render = () => (
      <WrappedElement
        {...this.props}
        {...this.state}
        setRunning={this.setRunning}
        setLapse={this.setLapse}
      />
    )
  }

function Stopwatch({lapse, setLapse, running, setRunning}) {
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

const AAS = asAStopWatch()(Stopwatch)

function Usage(props) {
  return <AAS {...props} />
}
Usage.title = 'Stopwatch: useEffect cleanup'

export default Usage
