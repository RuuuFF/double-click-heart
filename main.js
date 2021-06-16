const posts = document.querySelectorAll('.post')
const times = document.querySelector('#times')

let clickTime = 0
let timesClicked = 0

posts.forEach(post => {
  post.addEventListener('click', (event) => {
    if (clickTime === 0) {
      clickTime = new Date().getTime()
    } else {
      if ((new Date().getTime() - clickTime) < 800) {
        createHeart(event, post)
        clickTime = 0
      } else {
        clickTime = new Date().getTime()
        console.log(clickTime)
      }
    }
  })
})

const createHeart = (event, post) => {
  const heart = document.createElement('i')
  heart.className = 'fas fa-heart'

  const x = event.clientX
  const y = event.clientY

  const leftOffset = event.target.offsetLeft
  const topOffset = event.target.offsetTop

  const xInside = x - leftOffset
  const yInside = y - topOffset

  heart.style.top = `${yInside}px`
  heart.style.left = `${xInside}px`

  post.appendChild(heart)
  times.innerHTML = ++timesClicked

  setTimeout(() => heart.remove(), 1000)
}