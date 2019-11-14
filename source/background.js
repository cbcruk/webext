import { renderWarning, renderCount, renderError } from './lib/badge'
import localStore from './lib/local-store'
import { openTab } from './lib/tabs-service'
import { getNotificationUnreadCount } from './lib/api'

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

  return data
}

async function updateNotificationCount() {
  const { count, success } = await getNotificationCount()

  renderCount(count)

  if (!success) {
    renderError()
  }

  scheduleNextAlarm()
  handleLastModified()
}

async function handleBrowserActionClick() {
  const url = 'https://ridibooks.com/notification'

  await openTab(url)

  renderCount(0)
}

function handleError(error) {
  scheduleNextAlarm()

  renderError(error)
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

  update()
}

init()
