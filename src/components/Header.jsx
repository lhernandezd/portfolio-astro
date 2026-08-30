import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"

import Drawer from "./Drawer"
import useTheme from "../hooks/useTheme"
import { useSpring, animated } from "react-spring"
import { FaRegMoon, FaRegSun } from "react-icons/fa"
import { IoIosMenu, IoIosClose } from "react-icons/io"

const Header = ({ siteTitle }) => {
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [dimensions, setDimensions] = useState({
    height: undefined,
    width: undefined,
  })
  const { o, t } = useSpring({
    config: {
      mass: 1,
      tension: 270,
      friction: 30,
    },
    o: open ? 1 : 0,
    t: open ? 0 : 100,
  })

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window?.innerHeight,
        width: window?.innerWidth,
      })
    }
    handleResize()
    window?.addEventListener("resize", handleResize)
    return () => {
      window?.removeEventListener("resize", handleResize)
    }
  }, [])

  const pages = ["about", "work", "projects", "education", "teaching"]

  return (
    <header className="header">
      <nav className="container--extended header__content">
        <div className="content__title">
          <span
            className="icon content__icon"
            role="button"
            tabIndex={0}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                setOpen(!open)
              }
            }}
          >
            {!open ? <IoIosMenu /> : <IoIosClose />}
          </span>
          <h1>
            <a href="/">{siteTitle}</a>
          </h1>
        </div>
        <div className="content__links">
          {pages.map((page, index) => (
            <a key={`${page}_${index}`} className="link" href={`#${page}`}>
              {`${page[0].toUpperCase()}${page.slice(1)}`}
            </a>
          ))}
          <span
            className="link link-last icon"
            role="button"
            tabIndex={0}
            aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
            onClick={toggleTheme}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                toggleTheme()
              }
            }}
          >
            {theme === "light" ? <FaRegMoon /> : <FaRegSun />}
          </span>
        </div>
      </nav>
      {dimensions.width <= 576 && (
        <>
          <animated.aside
            id="drawer"
            className="header__drawer"
            aria-hidden={!open}
            style={{
              opacity: o,
              transform: t.to((t) => `translateX(${-t}%)`),
            }}
          >
            <Drawer
              setOpen={setOpen}
              pages={pages}
              open={open}
              theme={theme}
              toggleTheme={toggleTheme}
            />
          </animated.aside>
        </>
      )}
    </header>
  )
}
Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
