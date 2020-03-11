import { useEffect, useReducer } from 'preact/hooks'
import { getMarketFeeds } from '../api'
import { update } from '../background'

const FETCH = 'FETCH'
const RESOLVE = 'RESOLVE'
const REJECT = 'REJECT'

const initialState = {
  feeds: [],
  status: '',
  error: {}
}

function reducer(state, action) {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        status: 'loading'
      }
    case RESOLVE:
      return {
        ...state,
        status: 'success',
        feeds: action.payload
      }
    case REJECT:
      return {
        ...state,
        status: 'failure',
        error: action.payload
      }
    default:
      return state
  }
}

function useMarketFeeds() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({
      type: FETCH
    })

    getMarketFeeds()
      .then(data => {
        dispatch({
          type: RESOLVE,
          payload: data.message.result.feeds
        })

        update()
      })
      .catch(e => {
        dispatch({
          type: REJECT,
          payload: e
        })
      })
  }, [])

  return state
}

export default useMarketFeeds
