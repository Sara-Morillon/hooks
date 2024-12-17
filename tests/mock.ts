import { act } from '@testing-library/react-hooks'

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
    value: jest.fn().mockImplementation(() => {
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

export function mockPromiseChain() {
  return jest.fn().mockReturnValue({
    then: jest.fn().mockReturnValue({
      catch: jest.fn().mockReturnValue({
        finally: jest.fn(),
      }),
    }),
  })
}
