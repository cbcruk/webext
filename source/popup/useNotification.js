import { useReducer, useEffect } from 'preact/hooks'
import { getNotification } from '../lib/api'
import { renderCount } from '../lib/badge'
import localStore from '../lib/local-store'

const NOTIFICATION_REQUEST = 'NOTIFICATION_REQUEST'
const NOTIFICATION_SUCCESS = 'NOTIFICATION_SUCCESS'
const NOTIFICATION_FAILURE = 'NOTIFICATION_FAILURE'

function useNotification() {
  const [{ unreadCount, ...notification }, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case NOTIFICATION_REQUEST:
          return {
            ...state,
            isFetching: true
          }
        case NOTIFICATION_SUCCESS:
          return {
            ...state,
            ...action.payload,
            isFetching: false
          }
        case NOTIFICATION_FAILURE:
          return {
            ...state,
            errors: action.payload,
            isFetching: false
          }
        default:
          return state
      }
    },
    {
      notifications: [],
      unreadCount: 0,
      isFetching: false,
      errors: {}
    }
  )

  useEffect(() => {
    ;(async () => {
      try {
        const localUnreadCount = await localStore.get('unreadCount')

        if (localUnreadCount > 0 || localUnreadCount === undefined) {
          dispatch({
            type: NOTIFICATION_REQUEST
          })

          const limit = Math.max(~~localUnreadCount, 5)
          const response = await getNotification(limit)

          dispatch({
            type: NOTIFICATION_SUCCESS,
            payload: response
          })

          await localStore.set('notifications', response.notifications)
        } else {
          const notifications = (await localStore.get('notifications')) || []

          dispatch({
            type: NOTIFICATION_SUCCESS,
            payload: { notifications }
          })
        }
      } catch (error) {
        dispatch({
          type: NOTIFICATION_FAILURE,
          payload: error
        })
      }
    })()
  }, [])

  useEffect(() => {
    if (unreadCount > 0) {
      renderCount(0)
    }
  }, [unreadCount])

  return notification
}

export default useNotification
