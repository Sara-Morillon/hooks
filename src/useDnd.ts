import { type DragEvent, useCallback, useMemo, useState } from 'react'

interface IDragEvents {
  onDragStart: (e: DragEvent) => void
  onDragEnd: (e: DragEvent) => void
}

export function useDrag(source: string): [boolean, IDragEvents] {
  const [isDragged, setIsDragged] = useState(false)

  const onDragStart = useCallback(
    (e: DragEvent) => {
      setIsDragged(true)
      e.dataTransfer.setData('source', source)
    },
    [source],
  )

  const onDragEnd = useCallback((e: DragEvent) => {
    e.preventDefault()
    setIsDragged(false)
  }, [])

  return useMemo(() => [isDragged, { onDragStart, onDragEnd }], [isDragged, onDragStart, onDragEnd])
}

interface IDropEvents {
  onDragOver: (e: DragEvent) => void
  onDragLeave: (e: DragEvent) => void
  onDrop: (e: DragEvent) => void
}

export function useDrop(dropHandler: (source: string) => void): [boolean, IDropEvents] {
  const [isOver, setIsOver] = useState(false)

  const onDragOver = useCallback((e: DragEvent) => {
    e.preventDefault()
    setIsOver(true)
  }, [])

  const onDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault()
    setIsOver(false)
  }, [])

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault()
      dropHandler(e.dataTransfer.getData('source'))
      setIsOver(false)
    },
    [dropHandler],
  )

  return useMemo(() => [isOver, { onDragOver, onDragLeave, onDrop }], [isOver, onDragOver, onDragLeave, onDrop])
}
