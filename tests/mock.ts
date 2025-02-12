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
  address: {
    number: number
    street: string
    city: string
  }
}

export function mockTableData(): IData[] {
  return [
    { name: 'Zola Ray', age: 30, address: { number: 47, street: 'Crescent Avenue', city: 'Druimkinnerras' } },
    { name: 'Arlo Curtis', age: 32, address: { number: 50, street: 'Iolaire Road', city: 'New Inn' } },
    { name: 'Alexis West', age: 39, address: { number: 6, street: 'Overton Circle', city: 'Little Woolstone' } },
    { name: 'Diego Fitzpatrick', age: 40, address: { number: 6, street: 'Witney Way', city: 'Kirtling Green' } },
    { name: 'Annabella Vargas', age: 37, address: { number: 13, street: 'Sandyhill Rd', city: 'Frostenden' } },
    { name: 'Ryker Gregory', age: 34, address: { number: 41, street: 'Hounslow Rd', city: 'Sopworth' } },
    { name: 'Alaya Winters', age: 40, address: { number: 67, street: 'Harehills Lane', city: 'Rowley' } },
    { name: 'Deandre Vu', age: 32, address: { number: 12, street: 'Warner Close', city: 'Haslington' } },
    { name: 'Kimora Higgins', age: 38, address: { number: 97, street: 'Wade Lane', city: 'Sandaig' } },
    { name: 'Sterling Pugh', age: 30, address: { number: 11, street: 'Guildry Street', city: 'Gartavaich' } },
    { name: 'Landry Pineda', age: 31, address: { number: 49, street: 'North Promenade', city: 'Dowland' } },
    { name: 'Gerardo Pearson', age: 39, address: { number: 19, street: 'Annfield Rd', city: 'Beckley' } },
    { name: 'Kiara Nava', age: 34, address: { number: 96, street: 'Cunnery Rd', city: 'Malling' } },
    { name: 'Stefan Hart', age: 35, address: { number: 31, street: 'South Crescent', city: 'Lynemore' } },
    { name: 'Gemma Terrell', age: 38, address: { number: 19, street: 'Ilchester Road', city: 'Myddfai' } },
    { name: 'Jaxen Smith', age: 35, address: { number: 42, street: 'Folkestone Road', city: 'Winslade' } },
    { name: 'Olivia Camacho', age: 30, address: { number: 19, street: 'Well Lane', city: 'Parkham' } },
  ]
}
