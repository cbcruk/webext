import localStore from '@cbcruk/webext-lib/local-store'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { update } from '../../store'
import { LOCALSTORE_KEYWORDS } from '../../constants'

function useKeywords() {
  const [keywords, setKeywords] = useState([])

  useEffect(() => {
    async function main() {
      const keywords = await localStore.get(LOCALSTORE_KEYWORDS)
      setKeywords(keywords)
    }
    main()
  }, [setKeywords])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()

      const { value } = e.target.keyword

      await update(LOCALSTORE_KEYWORDS, value)

      setKeywords((p) => p.concat(value))

      e.target.reset()
    },
    [setKeywords]
  )

  const handleDelete = useCallback(
    async (keyword) => {
      const nextValue = keywords.filter((k) => k !== keyword)

      await localStore.set(LOCALSTORE_KEYWORDS, nextValue)

      setKeywords(nextValue)
    },
    [keywords, setKeywords]
  )

  return {
    keywords,
    handleSubmit,
    handleDelete,
  }
}

export default useKeywords
