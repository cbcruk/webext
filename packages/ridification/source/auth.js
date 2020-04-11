const { chrome } = window

const UPDATE = 'UPDATE'

function main() {
  const { __NEXT_DATA__ } = window
  const { query } = JSON.parse(__NEXT_DATA__.innerText)
  const isLogin = query.is_login === 'true'

  chrome.runtime.sendMessage({
    type: UPDATE,
    payload: {
      isLogin,
    },
  })
}

if (location.search === '?from=ext') {
  main()
}
