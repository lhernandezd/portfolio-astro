import React, { useState, useEffect } from "react"
import { useTrail, animated } from "react-spring"

const items = [
  "Hi I'm Luis.",
  "Senior Software Developer",
  "with 7+ years of experience,",
  "building web & Roku apps.",
]
const config = { mass: 5, tension: 1000, friction: 250 }

const HeroTrail = () => {
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    setToggle(true)
  }, [])

  const trail = useTrail(items.length, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 20,
    height: toggle ? 80 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })

  return (
    <div className="home__container">
      {trail.map(({ x, height, ...rest }, index) => (
        <animated.div
          key={items[index]}
          id={index === 0 ? "gradient" : ""}
          className={index === 0 ? "container__text" : "container__subtext"}
          style={{
            ...rest,
            transform: x.to((x) => `translate3d(0,${x}px,0)`),
          }}
        >
          <animated.div style={{ height }}>{items[index]}</animated.div>
        </animated.div>
      ))}
    </div>
  )
}

export default HeroTrail
