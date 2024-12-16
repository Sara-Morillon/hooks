import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'

export interface IPagination {
  page: number
  goTo: Dispatch<SetStateAction<number>>
  first: () => void
  previous: () => void
  next: () => void
  last: () => void
  canPrevious: boolean
  canNext: boolean
}

export function usePagination(maxPage: number, initialPage = 1): IPagination {
  const [page, setPage] = useState(initialPage)

  const goTo = useCallback(
    (action: number | ((page: number) => number)) => {
      setPage((page) => Math.max(1, Math.min(typeof action === 'number' ? action : action(page), maxPage)))
    },
    [maxPage],
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
    () => ({ page, goTo, first, previous, next, last, canPrevious, canNext }),
    [page, goTo, first, previous, next, last, canPrevious, canNext],
  )
}
