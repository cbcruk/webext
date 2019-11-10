import { useReducer, useEffect } from 'preact/hooks'
import { getNotification } from '../lib/api'

const NOTIFICATION_REQUEST = 'NOTIFICATION_REQUEST'
const NOTIFICATION_SUCCESS = 'NOTIFICATION_SUCCESS'
const NOTIFICATION_FAILURE = 'NOTIFICATION_FAILURE'

function useNotification() {
  const [notification, dispatch] = useReducer(
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

  return notification
}

export default useNotification
