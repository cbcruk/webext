import { useEffect, useReducer } from 'preact/hooks'
import { getPayload, handleLastUpdated } from './helper'
import { getPosts } from '../../rpc'

export const RequestStatus = {
  Idle: 'idle',
  Loading: 'loading',
  Success: 'success',
  Failure: 'failure',
}

const initialState = {
  posts: [],
  status: RequestStatus.Idle,
  error: {},
}

function reducer(state, action) {
  switch (action.type) {
    case RequestStatus.Loading:
      return {
        ...state,
        status: action.type,
        error: {},
      }
    case RequestStatus.Success:
      return {
        ...state,
        status: action.type,
        posts: action.payload,
      }
    case RequestStatus.Failure:
      return {
        ...state,
        status: action.type,
        error: action.payload,
      }
    default:
      return state
  }
}

function useSold() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({
      type: RequestStatus.Loading,
    })
    ;(async () => {
      try {
        const posts = await getPosts()
        const lastUpdatedId = await handleLastUpdated(posts[0].boardSn)
        const payload = getPayload({ posts, lastUpdatedId })

        dispatch({
          type: RequestStatus.Success,
          payload,
        })
      } catch (error) {
        dispatch({
          type: RequestStatus.Failure,
          payload: error,
        })
      }
    })()
  }, [])

  return state
}

export default useSold
