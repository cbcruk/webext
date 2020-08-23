import { css } from 'emotion'

export const wrapper = css`
  --size-padding-x: 8px;

  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: var(--size-padding-x);
  padding-left: var(--size-padding-x);

  &.is-new {
    background: rgba(187, 134, 252, 0.08);
  }

  & + & {
    border-top: 1px solid var(--color-outline);
  }
`

export const link = css`
  text-decoration: none;
  color: inherit;
`

export const subject = css`
  font-size: 14px;
  word-break: keep-all;
  color: var(--color-font-title);
`

export const meta = css`
  display: flex;
  gap: 5px;
`

export const category = css``

export const nickname = css`
  color: rgba(255, 255, 255, 0.7);
`

export const hit = css``

export const time = css``

export const separated = css`
  --gap: 5px;

  > * + * {
    &::before {
      content: '•';
      display: inline-flex;
      padding-right: var(--gap);
      padding-left: var(--gap);
    }
  }
`

export const feedback = css`
  display: inline-flex;
  gap: 5px;
  margin-left: auto;
`

export const icon = css`
  width: 12px;
`

export const withIcon = css`
  display: inline-flex;
  align-items: center;

  ${`.${icon}`} {
    margin-right: 2px;
  }
`

export const comment = css`
  ${withIcon}
`

export const like = css`
  ${withIcon}
`
