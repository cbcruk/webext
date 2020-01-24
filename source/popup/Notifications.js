import { html } from 'htm/preact'
import { useMemo } from 'preact/hooks'
import Item from './Item'
import Blank from './Blank'

function Notifications({ notifications = [] }) {
  const hasNotifications = useMemo(() => notifications.length > 0, [
    notifications
  ])

  if (hasNotifications) {
    return notifications.map(
      item =>
        html`
          <${Item} key=${item.id} ...${item} />
        `
    )
  } else {
    return html`
      <${Blank} />
    `
  }
}

export default Notifications
