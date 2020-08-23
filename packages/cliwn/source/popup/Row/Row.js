import { html } from 'htm/preact'
import { cx } from 'emotion'
import * as Icon from '../Icon'
import getTimeFromNow from './helper/getTimeFromNow'
import * as styles from './style'

function Row({
  authorId,
  likeCount,
  commentCount,
  category,
  subject,
  url,
  nickname,
  hit,
  timestamp,
  isNew,
}) {
  return html`
    <div class=${cx([
      styles.wrapper,
      {
        'is-new': isNew,
      },
    ])}>
      <a href=https://clien.net/${url} target="_blank" class=${styles.link}>
        <div class=${styles.subject}>
          ${subject}
        </div>
        <div class=${styles.meta}>
          <span title=${authorId} class=${styles.nickname}>${nickname}</span>
          <span class=${styles.separated}>
            <span class=${styles.time}>${getTimeFromNow(timestamp)}</span>
            <span class=${styles.hit}>조회수 ${hit}</span>
            <span class=${styles.category}>${category}</span>
          </span>
          <span class=${styles.feedback}>
            ${
              likeCount > 0 &&
              html`<span hidden=${likeCount === 0} class=${styles.like}
                ><${Icon.Heart} class=${styles.icon} /> ${likeCount}</span
              >`
            }
            ${
              commentCount > 0 &&
              html`<span hidden=${commentCount === 0} class=${styles.comment}>
                <${Icon.Comment} class=${styles.icon} /> ${commentCount}</span
              >`
            }
          </span>
        </div>
      </a>
    </div>
  `
}

export default Row
