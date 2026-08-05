import { act, renderHook } from '@testing-library/react'
import type { DragEvent } from 'react'
import { useDropZone } from '../../src/useDropZone.js'

function mockDragEvent() {
  return {
    preventDefault: vi.fn(),
    dataTransfer: { files: [] },
  } as unknown as DragEvent
}

describe('useDropZone', () => {
  it('should not be over by default', () => {
    const { result } = renderHook(() => useDropZone(vi.fn()))
    expect(result.current[0]).toBe(false)
  })

  it('should be over when hovering target', () => {
    const { result } = renderHook(() => useDropZone(vi.fn()))
    act(() => result.current[1].onDragOver(mockDragEvent()))
    expect(result.current[0]).toBe(true)
  })

  it('should not be over when leaving target', () => {
    const { result } = renderHook(() => useDropZone(vi.fn()))
    act(() => result.current[1].onDragOver(mockDragEvent()))
    act(() => result.current[1].onDragLeave(mockDragEvent()))
    expect(result.current[0]).toBe(false)
  })

  it('should not be over when dropping', () => {
    const { result } = renderHook(() => useDropZone(vi.fn()))
    act(() => result.current[1].onDragOver(mockDragEvent()))
    act(() => result.current[1].onDrop(mockDragEvent()))
    expect(result.current[0]).toBe(false)
  })

  it('should prevent default event handler when hovering target', () => {
    const { result } = renderHook(() => useDropZone(vi.fn()))
    const event = mockDragEvent()
    act(() => result.current[1].onDragOver(event))
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should prevent default event handler when leaving target', () => {
    const { result } = renderHook(() => useDropZone(vi.fn()))
    const event = mockDragEvent()
    act(() => result.current[1].onDragLeave(event))
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should prevent default event handler when dropping', () => {
    const { result } = renderHook(() => useDropZone(vi.fn()))
    const event = mockDragEvent()
    act(() => result.current[1].onDrop(event))
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should call drop handler when dropping', () => {
    const onDrop = vi.fn()
    const { result } = renderHook(() => useDropZone(onDrop))
    act(() => result.current[1].onDrop(mockDragEvent()))
    expect(onDrop).toHaveBeenCalledWith([])
  })
})
