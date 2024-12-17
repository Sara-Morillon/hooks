import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'

export interface IDialog {
  ref: RefObject<HTMLDialogElement>
  visible: boolean
  show: () => void
  hide: () => void
}

export function useDialog(): IDialog {
  const ref = useRef<HTMLDialogElement>(null)
  const [visible, setVisible] = useState(false)

  const show = useCallback(() => {
    setVisible(true)
  }, [])

  const hide = useCallback(() => {
    setVisible(false)
  }, [])

  useEffect(() => {
    if (ref.current) {
      if (!visible) ref.current.close()
      else if (!ref.current.open) ref.current.showModal()
    }
  }, [visible])

  return useMemo(() => ({ ref, visible, show, hide }), [visible, show, hide])
}
