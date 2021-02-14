import { uniq, uniqBy } from 'lodash'
import localStore from '@cbcruk/webext-lib/local-store'

export async function update(key, value, property) {
  const prev = (await localStore.get(key)) || []
  const nextValue = prev.concat(value)

  return localStore.set(
    key,
    property ? uniqBy(nextValue, property) : uniq(nextValue)
  )
}
