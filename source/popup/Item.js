import { html } from 'htm/preact'
import { css } from 'emotion'

function Item({ imageUrl, imageType, landingUrl, message, strCreatedAt }) {
  const isBook = imageType === 'book'

  return html`
    <a class=${css(styles.container)} href=${landingUrl} target="_blank">
      <img
        src="https:${imageUrl}"
        alt=""
        class=${css([
          styles.media,
          isBook && {
            width: 38,
            boxShadow: '0 0 3px 0 rgba(0, 0, 0, .3)'
          }
        ])}
      />
      <div class=${css(styles.body)}>
        <div
          class=${css(styles.message)}
          dangerouslySetInnerHTML=${{
            __html: message
          }}
        />
        <p class=${css(styles.created)}>
          ${strCreatedAt}
        </p>
      </div>
    </a>
  `
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: 12,
    '& + &': {
      borderTop: '1px solid #e5e5e5'
    },
    color: 'inherit',
    textDecoration: 'none'
  },
  media: {
    width: 34,
    objectFit: 'cover'
  },
  body: {
    marginLeft: 15
  },
  message: {
    wordBreak: 'keep-all'
  },
  created: {
    fontSize: 12,
    color: '#666'
  }
}

export default Item
