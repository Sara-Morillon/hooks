import { act, renderHook } from '@testing-library/react'
import type { DragEvent } from 'react'
import { useDrag, useDrop } from '../../src/useDnd.js'

function mockDragEvent() {
  return {
    preventDefault: vi.fn(),
    dataTransfer: { getData: vi.fn().mockReturnValue('dragged'), setData: vi.fn() },
  } as unknown as DragEvent
}

describe('useDrag', () => {
  it('should not be dragged by default', () => {
    const { result } = renderHook(() => useDrag('dragged'))
    expect(result.current[0]).toBe(false)
  })

  it('should be dragged when starting drag', () => {
    const { result } = renderHook(() => useDrag('dragged'))
    act(() => result.current[1].onDragStart(mockDragEvent()))
    expect(result.current[0]).toBe(true)
  })

  it('should not be dragged when ending drag', () => {
    const { result } = renderHook(() => useDrag('dragged'))
    act(() => result.current[1].onDragStart(mockDragEvent()))
    act(() => result.current[1].onDragEnd(mockDragEvent()))
    expect(result.current[0]).toBe(false)
  })

  it('should set data in event when starting drag', () => {
    const { result } = renderHook(() => useDrag('dragged'))
    const event = mockDragEvent()
    act(() => result.current[1].onDragStart(event))
    expect(event.dataTransfer.setData).toHaveBeenCalledWith('source', 'dragged')
  })

  it('should prevent default event handler when ending drag', () => {
    const { result } = renderHook(() => useDrag('dragged'))
    const event = mockDragEvent()
    act(() => result.current[1].onDragEnd(event))
    expect(event.preventDefault).toHaveBeenCalled()
  })
})

describe('useDrop', () => {
  it('should not be over by default', () => {
    const { result } = renderHook(() => useDrop(vi.fn()))
    expect(result.current[0]).toBe(false)
  })

  it('should be over when hovering target', () => {
    const { result } = renderHook(() => useDrop(vi.fn()))
    act(() => result.current[1].onDragOver(mockDragEvent()))
    expect(result.current[0]).toBe(true)
  })

  it('should not be over when leaving target', () => {
    const { result } = renderHook(() => useDrop(vi.fn()))
    act(() => result.current[1].onDragOver(mockDragEvent()))
    act(() => result.current[1].onDragLeave(mockDragEvent()))
    expect(result.current[0]).toBe(false)
  })

  it('should not be over when dropping', () => {
    const { result } = renderHook(() => useDrop(vi.fn()))
    act(() => result.current[1].onDragOver(mockDragEvent()))
    act(() => result.current[1].onDrop(mockDragEvent()))
    expect(result.current[0]).toBe(false)
  })

  it('should prevent default event handler when hovering target', () => {
    const { result } = renderHook(() => useDrop(vi.fn()))
    const event = mockDragEvent()
    act(() => result.current[1].onDragOver(event))
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should prevent default event handler when leaving target', () => {
    const { result } = renderHook(() => useDrop(vi.fn()))
    const event = mockDragEvent()
    act(() => result.current[1].onDragLeave(event))
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should prevent default event handler when dropping', () => {
    const { result } = renderHook(() => useDrop(vi.fn()))
    const event = mockDragEvent()
    act(() => result.current[1].onDrop(event))
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should call drop handler when dropping', () => {
    const onDrop = vi.fn()
    const { result } = renderHook(() => useDrop(onDrop))
    act(() => result.current[1].onDrop(mockDragEvent()))
    expect(onDrop).toHaveBeenCalledWith('dragged')
  })
})
