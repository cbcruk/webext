const DEFAULT_HOST = 'https://ridibooks.com'
const API_HOST = 'https://store-api.ridibooks.com'

export async function getNotificationResponse() {
  const response = await fetch(`${DEFAULT_HOST}/api/notification/unread_count`)
  const json = await response.json()

  return json
}

async function getApiToken() {
  const pattern = /apiToken: '(?<token>\w.+)',/u
  const response = await fetch(`${DEFAULT_HOST}/notification`)
  const html = await response.text()
  const result = pattern.exec(html)

  return result.groups.token
}

export async function postNotification(token) {
  const formData = new FormData()
  formData.append('_method', 'PUT')

  await fetch(`${API_HOST}/notification`, {
    headers: {
      authorization: `Bearer ${token}`
    },
    method: 'POST',
    body: formData
  })
}

export async function getNotification() {
  const token = await getApiToken()
  const response = await fetch(`${API_HOST}/notification`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  const json = await response.json()

  return json
}
