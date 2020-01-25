export const UPDATE_AUTHORIZATION = 'UPDATE_AUTHORIZATION'

function main() {
  const nextDataScript = document.getElementById('__NEXT_DATA__')
  const NEXT_DATA = nextDataScript
    ? JSON.parse(nextDataScript.innerText)
    : { query: {} }
  const isLogin = NEXT_DATA.query.is_login === 'true'

  chrome.runtime.sendMessage({
    type: UPDATE_AUTHORIZATION,
    isLogin
  })
}
main()
