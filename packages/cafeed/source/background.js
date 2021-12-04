import browser from 'webextension-polyfill'
import {
  renderWarning,
  renderCount,
  renderError,
} from '@cbcruk/webext-lib/badge'
import localStore from '@cbcruk/webext-lib/local-store'
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
  const { message } = await getNotificationUnreadCount()
  const success = message.status === '200'
  const count = message.result.badgeCounts.alarmCount.marketAlarmCount

  await localStore.set('unreadCount', count)
  await localStore.set('success', success)

  return {
    success,
    count,
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
  self.addEventListener('online', handleConnectionStatus)
  self.addEventListener('offline', handleConnectionStatus)

  browser.alarms.create({ delayInMinutes: 1 })

  browser.alarms.onAlarm.addListener(update)
  browser.alarms.create({ when: Date.now() + 2000 })

  browser.runtime.onMessage.addListener(update)

  update()
}

init()
