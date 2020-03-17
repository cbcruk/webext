import { html } from 'htm/preact'
import { css, cx } from 'emotion'
import get from 'lodash/get'
import { Time, Comment } from './Icon'
import { status } from './Feed/constants'
import styles from './Feed/styles'

function Feed({
  feedConfigValue,
  menuName,
  subject,
  content,
  formattedCost,
  formattedCommentCount,
  saleStatus,
  writerNickname,
  writeDateForView,
  representImage,
  cafeId,
  articleId
}) {
  const subjectWithHighlight = subject.replace(
    new RegExp(feedConfigValue, 'i'),
    match => `<mark>${match}</mark>`
  )
  const mobileImageUrl = get(representImage, 'mobileImageUrl', '')

  return html`
    <a
      href=${`https://m.cafe.naver.com/ca-fe/web/cafes/${cafeId}/articles/${articleId}`}
      target="_blank"
      class=${css(styles.container)}
    >
      <div class=${css(styles.body)}>
        <div class=${css(styles.title)}>
          <span
            class=${cx([css(styles.status), `is-${saleStatus.toLowerCase()}`])}
            >${status[saleStatus]}</span
          >${' '} ${html([subjectWithHighlight])}
        </div>
        <div class=${css(styles.cost)}>${formattedCost}원</div>
        <div class=${css(styles.meta)}>
          <div class=${css(styles.metaItem)}>${writerNickname}</div>
          <div class=${css(styles.metaItem)}>
            <${Time} /> ${writeDateForView}
          </div>
          <div class=${css(styles.metaItem)}>
            <${Comment} /> ${formattedCommentCount}
          </div>
        </div>
      </div>
      ${mobileImageUrl &&
        html`
          <div class=${css(styles.media)}>
            <img src=${mobileImageUrl} alt="" />
          </div>
        `}
    </a>
  `
}

export default Feed
