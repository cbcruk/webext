import { css } from 'emotion'

export const container = css`
  --size-width: 360px;
  --size-height: 400px;

  overflow: auto;
  width: var(--size-width);
  height: var(--size-height);
  padding-bottom: 10px;
  background-color: var(--color-background);
  box-shadow: 2px 4px 10px 0 rgba(0, 0, 0, 0.4);
  color: var(--color-font-body);
`
