function getPayload({ posts, lastUpdatedId }) {
  const lastUpdatedIndex = posts.findIndex(
    (post) => post.boardSn === lastUpdatedId
  )
  const payload = posts.map((post, index) => {
    return {
      ...post,
      isNew: lastUpdatedIndex > index,
    }
  })

  return payload
}

export default getPayload
