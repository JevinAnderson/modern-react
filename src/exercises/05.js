// VanillaTilt: useRef
// 🐨 1. you'll want useRef, and useLayoutEffect
// you can use `useLayoutEffect` the same way you use `useEffect`.
// Make sure to ask me what the difference is!
// https://reactjs.org/docs/hooks-reference.html#useref
// https://reactjs.org/docs/hooks-reference.html#uselayouteffect
import React, {useRef, useLayoutEffect} from 'react'
import VanillaTilt from 'vanilla-tilt'

function Tilt(props) {
  const tiltNode = useRef()

  useLayoutEffect(() => {
    VanillaTilt.init(tiltNode.current, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    })

    return () => {
      tiltNode.current.vanillaTilt.destroy()
    }
  }, [])

  return (
    <div className="tilt-root" ref={tiltNode}>
      <div className="tilt-child">{props.children}</div>
    </div>
  )
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.

function Usage() {
  return (
    <div className="totally-centered">
      <Tilt>
        <div className="totally-centered">vanilla-tilt.js</div>
      </Tilt>
    </div>
  )
}
Usage.title = 'VanillaTilt: useRef'

export default Usage
