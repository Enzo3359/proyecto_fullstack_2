import { useEffect, useRef, useState } from 'react'

function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const elemento = ref.current
    if (!elemento) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(elemento)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(elemento)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`animar-scroll ${visible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  )
}

export default Reveal
