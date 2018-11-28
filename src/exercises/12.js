import React, {Suspense, useState} from 'react'

const Tilt = React.lazy(() => import('../tilt'))


function Usage() {
  const [showTilt, setShowTilt] = useState()
  return (
    <div>
      <label>
        <input
          type="checkbox"
          value={showTilt}
          onChange={e => setShowTilt(e.target.checked)}
        />
        {' show tilt'}
      </label>
      <div>
        <Suspense fallback="loading...">
          {showTilt ? (
            <div className="totally-centered">
              <Tilt>
                <div className="totally-centered">vanilla-tilt.js</div>
              </Tilt>
            </div>
          ) : null}
        </Suspense>
      </div>
    </div>
  )
}
Usage.title = 'VanillaTilt: React.lazy'

export default Usage
