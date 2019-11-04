export async function getNotificationResponse() {
  const response = await fetch(
    'https://ridibooks.com/api/notification/unread_count'
  )
  const json = await response.json()

  return json
}
