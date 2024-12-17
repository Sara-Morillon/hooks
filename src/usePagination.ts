import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'

export interface IPagination {
  page: number
  maxPage: number
  setMaxPage: Dispatch<SetStateAction<number>>
  goTo: Dispatch<SetStateAction<number>>
  first: () => void
  previous: () => void
  next: () => void
  last: () => void
  canPrevious: boolean
  canNext: boolean
}

export function usePagination(initialPage = 1): IPagination {
  const [maxPage, setMaxPage] = useState(1)
  const [page, setPage] = useState(initialPage)

  const goTo = useCallback(
    (action: number | ((page: number) => number)) => {
      setPage((page) => Math.max(1, Math.min(typeof action === 'number' ? action : action(page), maxPage)))
    },
    [maxPage]
  )

  const first = useCallback(() => {
    goTo(1)
  }, [goTo])

  const previous = useCallback(() => {
    goTo((page) => page - 1)
  }, [goTo])

  const next = useCallback(() => {
    goTo((page) => page + 1)
  }, [goTo])

  const last = useCallback(() => {
    goTo(maxPage)
  }, [goTo, maxPage])

  const canPrevious = useMemo(() => page > 1, [page])
  const canNext = useMemo(() => page < maxPage, [page, maxPage])

  return useMemo(
    () => ({ page, maxPage, setMaxPage, goTo, first, previous, next, last, canPrevious, canNext }),
    [page, maxPage, setMaxPage, goTo, first, previous, next, last, canPrevious, canNext]
  )
}
