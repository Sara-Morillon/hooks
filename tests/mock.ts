import { act } from '@testing-library/react'

class MatchMediaMock extends EventTarget {
  constructor(public matches: boolean) {
    super()
  }
}

class MediaQueryListEvent extends Event {
  public matches: boolean

  constructor(type: string, init?: MediaQueryListEventInit) {
    super(type, init)
    this.matches = init?.matches || false
  }
}

const matchMediaMock = new MatchMediaMock(false)

export function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(() => {
      matchMediaMock.matches = matches
      return matchMediaMock
    }),
  })
}

export function changeMatchMedia(matches: boolean) {
  act(() => {
    matchMediaMock.dispatchEvent(new MediaQueryListEvent('change', { matches }))
  })
}

export function flushPromises() {
  return act(() => new Promise((resolve) => setTimeout(resolve, 0)))
}

export interface IData {
  name: string
  age: number
}

export function mockTableData(): IData[] {
  return [
    { name: 'Zola Ray', age: 30 },
    { name: 'Arlo Curtis', age: 32 },
    { name: 'Alexis West', age: 39 },
    { name: 'Diego Fitzpatrick', age: 40 },
    { name: 'Annabella Vargas', age: 37 },
    { name: 'Ryker Gregory', age: 34 },
    { name: 'Alaya Winters', age: 40 },
    { name: 'Deandre Vu', age: 32 },
    { name: 'Kimora Higgins', age: 38 },
    { name: 'Sterling Pugh', age: 30 },
    { name: 'Landry Pineda', age: 31 },
    { name: 'Gerardo Pearson', age: 39 },
    { name: 'Kiara Nava', age: 34 },
    { name: 'Stefan Hart', age: 35 },
    { name: 'Gemma Terrell', age: 38 },
    { name: 'Jaxen Smith', age: 35 },
    { name: 'Olivia Camacho', age: 30 },
  ]
}
