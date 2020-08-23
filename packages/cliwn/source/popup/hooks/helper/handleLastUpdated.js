import localStore from '@cbcruk/webext-lib/local-store'
import { LAST_UPDATED_ID } from '../../../constants'

async function handleLastUpdated(id) {
  const lastUpdatedId = await localStore.get(LAST_UPDATED_ID)

  await localStore.set(LAST_UPDATED_ID, id)

  return lastUpdatedId
}

export default handleLastUpdated
