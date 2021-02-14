import browser from 'webextension-polyfill'
import {
  renderWarning,
  renderCount,
  renderError,
} from '@cbcruk/webext-lib/badge'
import localStore from '@cbcruk/webext-lib/local-store'
import { renderIcon } from '@cbcruk/webext-lib/icon'
import { getPosts } from './rpc'
import {
  LOCALSTORE_INTERVAL,
  LOCALSTORE_KEYWORDS,
  LOCALSTORE_NOTIFICATIONS,
} from './constants'

async function scheduleNextAlarm(interval) {
  const intervalSetting = (await localStore.get(LOCALSTORE_INTERVAL)) || 60
  const intervalValue = interval || 60

  if (intervalSetting !== intervalValue) {
    await localStore.set(LOCALSTORE_INTERVAL, intervalValue)
  }

  const delayInMinutes = Math.max(Math.ceil(intervalValue / 60), 1)

  browser.alarms.create({ delayInMinutes })
}

async function getNotification() {
  try {
    const posts = await getPosts()
    const keywords = (await localStore.get(LOCALSTORE_KEYWORDS)) || []
    const result = posts.filter((post) => {
      return keywords.find((keyword) => post.subject.includes(keyword))
    })

    await update(LOCALSTORE_NOTIFICATIONS, result, 'boardSn')
  } catch (error) {
    console.error(error)
  }
}

async function updateNotificationCount() {
  await getNotification()

  const notifications = (await localStore.get(LOCALSTORE_NOTIFICATIONS)) || []

  renderIcon('active')
  renderCount(notifications.length)

  scheduleNextAlarm()
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
