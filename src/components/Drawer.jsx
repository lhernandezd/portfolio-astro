import React, { Fragment, useEffect } from "react"
import { FaRegMoon, FaRegSun } from "react-icons/fa"

const Drawer = ({ setOpen, pages, open, theme, toggleTheme }) => {
  useEffect(() => {
    setOpen(false)
  }, [setOpen])

  return (
    <Fragment>
      <div className="drawer__links">
        {pages.map((page) => (
          <a
            key={page}
            className="link"
            href={`#${page}`}
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            {`${page[0].toUpperCase()}${page.slice(1)}`}
          </a>
        ))}
        <span
          className="link link-last icon"
          role="button"
          tabIndex={open ? 0 : -1}
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
          {" "}
          {theme === "light" ? "Dark mode" : "Light mode"}
        </span>
      </div>
    </Fragment>
  )
}

export default Drawer
