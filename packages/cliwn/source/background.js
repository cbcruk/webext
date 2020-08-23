import browser from 'webextension-polyfill'
import {
  renderWarning,
  renderCount,
  renderError,
} from '@cbcruk/webext-lib/badge'
import localStore from '@cbcruk/webext-lib/local-store'
import { renderIcon } from '@cbcruk/webext-lib/icon'
import { getPosts } from './rpc'
import { LAST_UPDATED_ID } from './constants'

async function scheduleNextAlarm(interval) {
  const intervalSetting = (await localStore.get('interval')) || 60
  const intervalValue = interval || 60

  if (intervalSetting !== intervalValue) {
    await localStore.set('interval', intervalValue)
  }

  const delayInMinutes = Math.max(Math.ceil(intervalValue / 60), 1)

  browser.alarms.create({ delayInMinutes })
}

async function handleLastModified(newLastModified) {
  const lastModified = (await localStore.get('lastModified')) || new Date(0)

  if (newLastModified !== lastModified) {
    await localStore.set('lastModified', new Date())
  }
}

async function getNotificationCount() {
  try {
    const posts = await getPosts()
    const lastUpdatedId = await localStore.get(LAST_UPDATED_ID)
    const lastUpdatedIndex = posts.findIndex(
      (post) => post.boardSn === lastUpdatedId
    )
    const count = posts.filter((_, index) => index < lastUpdatedIndex).length

    await localStore.set('unreadCount', count)
    await localStore.set('success', true)

    return {
      success: true,
      count,
    }
  } catch (error) {
    await localStore.set('success', false)
  }
}

async function updateNotificationCount() {
  const { count, success } = await getNotificationCount()

  scheduleNextAlarm()

  if (!success) {
    renderIcon('default')
    return
  }

  renderIcon('active')
  renderCount(count)
  handleLastModified()
}

function handleError(error) {
  scheduleNextAlarm()

  if (error) {
    renderError(error)
  }
}

function handleOfflineStatus() {
  renderWarning('offline')
}

export async function update() {
  if (navigator.onLine) {
    try {
      await updateNotificationCount()
    } catch (error) {
      handleError(error)
    }
  } else {
    handleOfflineStatus()
  }
}

function handleConnectionStatus() {
  if (navigator.onLine) {
    update()
  } else {
    handleOfflineStatus()
  }
}

async function init() {
  window.addEventListener('online', handleConnectionStatus)
  window.addEventListener('offline', handleConnectionStatus)

  browser.alarms.onAlarm.addListener(update)
  browser.alarms.create({ when: Date.now() + 2000 })

  browser.runtime.onMessage.addListener(update)

  update()
}

init()
