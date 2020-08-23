function convertToJson(html) {
  const parser = new DOMParser()
  const document = parser.parseFromString(html, 'text/html')
  const posts = [
    ...document.querySelector('.list_content').querySelectorAll('.list_item'),
  ].map((item) => {
    const { boardSn, authorId, commentCount } = item.dataset
    const likeCount = item.querySelector('.list_symph').textContent.trim()
    const subject = item.querySelector('.list_subject')
    const category = subject.querySelector('.shortname').textContent.trim()
    const title = subject.querySelector('.subject_fixed').getAttribute('title')
    const url = subject.getAttribute('href')
    const nickname =
      item.querySelector('.nickname').textContent.trim() ||
      item.querySelector('.nickname > img').getAttribute('alt')
    const hit = item.querySelector('.hit').textContent.trim()
    const timestamp = item.querySelector('.timestamp').textContent.trim()

    return {
      boardSn,
      authorId,
      commentCount: parseInt(commentCount, 10),
      likeCount: parseInt(likeCount, 10),
      category,
      subject: title,
      url,
      nickname,
      hit: parseInt(hit, 10),
      timestamp,
    }
  })

  return posts
}

export async function getPosts() {
  const response = await fetch('https://www.clien.net/service/group/allsell')
  const html = await response.text()
  const posts = convertToJson(html)

  return posts
}
