import Cookies from 'js-cookie'

const { chrome } = window

const UPDATE = 'UPDATE'

function main() {
  const { __NEXT_DATA__ } = window
  const { query } = JSON.parse(__NEXT_DATA__.innerText)
  const isLogin = query.is_login === 'true'
  const token = Cookies.get('ridi_notification_token')

  chrome.runtime.sendMessage({
    type: UPDATE,
    payload: {
      isLogin,
      token,
    },
  })
}

main()
