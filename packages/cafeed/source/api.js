export async function getNotificationUnreadCount() {
  const response = await fetch(
    'https://apis.naver.com/cafe-home-web/cafe-home/v2/badge-counts'
  )
  const data = await response.json()

  return data
}

export async function getMarketFeeds() {
  const response = await fetch(
    'https://apis.naver.com/cafe-web/cafe-alarm/v1/market-feeds?badgeCountReset=true'
  )
  const data = await response.json()

  return data
}
