import { useEffect, useRef, useState } from "react"

export default function useTheme() {
  const [theme, setTheme] = useState("dark")
  const isFirstRun = useRef(true)

  useEffect(() => {
    setTheme(window.localStorage.getItem("theme") === "light" ? "light" : "dark")
  }, [])

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    const root = document.getElementById("app-root")
    if (!root) return
    root.classList.remove("light", "dark")
    root.classList.add(theme)
    document.documentElement.style.backgroundColor = theme === "light" ? "#f5f5f5" : "#121212"
    window.localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"))
  }

  return { theme, toggleTheme }
}
