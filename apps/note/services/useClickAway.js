const { useEffect, useRef } = React

const useClickAway = (handler) => {
  const elementRef = useRef()

  useEffect(() => {
    const clickHandler = (event) => {
      if (!elementRef.current.contains(event.target)) {
        handler()
      }
    }

    document.addEventListener('mousedown', clickHandler)

    return () => {
      document.removeEventListener('mousedown', clickHandler)
    }
  }, [])

  return elementRef
}

export default useClickAway