import React, {Component} from 'react'

const buttonStyles = {
  border: '1px solid #ccc',
  background: '#fff',
  fontSize: '2em',
  padding: 15,
  margin: 5,
  width: 200,
}

const asAStopWatch = () => WrappedElement => class {
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

export class Stopwatch extends Component {
  componentWillUnmount() {
    this.handleClearClick()
  }

  handleRunClick = () => {
    if (this.state.running) {
      clearInterval(this.interval)
    } else {
      const startTime = Date.now() - this.state.lapse
      this.interval = setInterval(() => {
        this.props.setLapse(Date.now() - startTime)
      }, 1)
    }

    this.props.setRunning(!this.props.running)
  }

  handleClearClick = () => {
    clearInterval(this.interval)
    this.props.setLapse(0)
    this.props.setRunning(false)
  }

  render = () => (
    <div style={{textAlign: 'center'}}>
      <label
        style={{
          fontSize: '5em',
          display: 'block',
        }}
      >
        {this.props.lapse}
        ms
      </label>
      <button onClick={this.handleRunClick} style={buttonStyles}>
        {this.props.running ? 'Stop' : 'Start'}
      </button>
      <button onClick={this.handleClearClick} style={buttonStyles}>
        Clear
      </button>
    </div>
  )
}

const StopWatchWithWrapper = asAStopWatch(Stopwatch)

function Usage() {
  return <StopWatchWithWrapper />
}
Usage.title = 'Stopwatch: useEffect cleanup'

export default Usage
