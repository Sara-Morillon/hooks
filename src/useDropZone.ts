import { type DragEvent, useCallback, useMemo, useState } from 'react'

export interface IDropZoneEvents {
  onDragOver: (e: DragEvent) => void
  onDragLeave: (e: DragEvent) => void
  onDrop: (e: DragEvent) => void
}

export function useDropZone(dropHandler: (files: FileList) => void): [boolean, IDropZoneEvents] {
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
      dropHandler(e.dataTransfer.files)
      setIsOver(false)
    },
    [dropHandler],
  )

  return useMemo(() => [isOver, { onDragOver, onDragLeave, onDrop }], [isOver, onDragOver, onDragLeave, onDrop])
}
