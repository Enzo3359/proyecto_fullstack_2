import '@testing-library/jest-dom'

// jsdom no implementa IntersectionObserver; lo simulamos para que
// el componente Reveal (animaciones al hacer scroll) no falle en las pruebas.
class IntersectionObserverSimulado {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.IntersectionObserver = IntersectionObserverSimulado
