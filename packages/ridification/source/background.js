import browser from 'webextension-polyfill'
import {
  renderWarning,
  renderCount,
  renderError
} from '@cbcruk/webext-lib/badge'
import localStore from '@cbcruk/webext-lib/local-store'
import { openTab } from '@cbcruk/webext-lib/tabs-service'
import { renderIcon } from '@cbcruk/webext-lib/icon'
import { getNotificationUnreadCount } from './api'

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
  const data = await getNotificationUnreadCount()
  await localStore.set('unreadCount', data.count)
  await localStore.set('success', data.success)

  return data
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

async function handleBrowserActionClick() {
  const url = 'https://ridibooks.com/notification'

  await openTab(url)

  renderCount(0)
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

async function update() {
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

  browser.browserAction.onClicked.addListener(handleBrowserActionClick)
  browser.runtime.onMessage.addListener(update)

  update()
}

init()
