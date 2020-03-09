const DEFAULT_HOST = 'https://ridibooks.com'
const API_HOST = 'https://store-api.ridibooks.com'

export async function getNotificationUnreadCount() {
  const response = await fetch(`${DEFAULT_HOST}/api/notification/unread_count`)
  const data = await response.json()

  return data
}

async function getBearerToken() {
  const pattern = /apiToken: '(?<token>\w.+)',/u
  const response = await fetch(`${DEFAULT_HOST}/notification`)
  const html = await response.text()
  const result = pattern.exec(html)

  return result.groups.token
}

export async function postNotification(init) {
  const formData = new FormData()
  formData.append('_method', 'PUT')

  await fetch(`${API_HOST}/notification`, {
    ...init,
    method: 'POST',
    body: formData
  })
}

export async function getNotification(limit = 5) {
  const token = await getBearerToken()
  const init = {
    headers: { authorization: `Bearer ${token}` }
  }
  const response = await fetch(`${API_HOST}/notification?limit=${limit}`, init)
  const data = await response.json()

  if (data.unreadCount > 0) {
    await postNotification(init)
  }

  return data
}
