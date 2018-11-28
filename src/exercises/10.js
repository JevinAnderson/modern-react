import React, {useState, memo} from 'react'

const Upper = memo(
  function Upper({children}) {
    console.log('render: ', children)
    const [count, setCount] = useState(0)
    return (
      <div>
        Uppercase version: {children.toUpperCase()}{' '}
        <button onClick={() => setCount(count + 1)}>{count}</button>
      </div>
    )
  },
  (prev, next) => next.children === prev.children,
)

// class Upper extends React.PureComponent {
//   state = {
//     count: 0,
//   }

//   increment = () => {
//     this.setState({count: this.state.count + 1})
//   }
//   render = () => console.log(this.props.children) || (
//     <div>
//       Uppercase version: {this.props.children.toUpperCase()}{' '}
//       <button onClick={this.increment}>{this.state.count}</button>
//     </div>
//   )
// }

function App() {
  const [first, setFirstName] = useState('')
  const [last, setLastName] = useState('')
  return (
    <div>
      <label htmlFor="first-name-input">First Name</label>
      <input
        id="first-name-input"
        onChange={e => setFirstName(e.target.value)}
      />
      {/* Derived example, but this is a pretty common issue when you're doing prop spreading */}
      {/* IE, <Upper {...state} />, <Upper {...props} />, etc... */}
      <Upper first={first} last={last}>
        {first}
      </Upper>
      <hr />
      <label htmlFor="last-name-input">Last Name</label>
      <input id="last-name-input" onChange={e => setLastName(e.target.value)} />
      <Upper first={first} last={last}>
        {last}
      </Upper>
    </div>
  )
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.

function Usage() {
  return <App />
}
Usage.title = 'React.memo'

export default Usage
