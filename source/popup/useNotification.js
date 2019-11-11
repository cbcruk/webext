import { useReducer, useEffect } from 'preact/hooks'
import { getNotification, postNotification } from '../lib/api'
import { renderCount } from '../lib/badge'

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
            items: action.payload,
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
      items: [],
      unreadCount: 0,
      isFetching: false,
      errors: {}
    }
  )

  useEffect(() => {
    dispatch({
      type: NOTIFICATION_REQUEST
    })

    getNotification()
      .then(response => {
        dispatch({
          type: NOTIFICATION_SUCCESS,
          payload: response.notifications
        })
      })
      .catch(error => {
        dispatch({
          type: NOTIFICATION_FAILURE,
          payload: error
        })
      })
  }, [])

  useEffect(() => {
    if (unreadCount > 0) {
      postNotification()
        .then(() => {
          renderCount(0)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }, [unreadCount])

  return notification
}

export default useNotification
