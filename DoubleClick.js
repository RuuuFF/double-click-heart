const DoubleClick = {
  posts: document.querySelectorAll('.post'),
  likesEl: document.querySelectorAll('.clickCount'),
  solidHearts: document.querySelectorAll('.interactions .fas.fa-heart'),

  clickCount: [],

  clickTime: 0,
  clickDelay: 800,
  elementIndex: null,

  getClickPosition(event, element) {
    const x = event.clientX
    const y = event.clientY

    const leftElement = element.getBoundingClientRect().left
    const topElement = element.getBoundingClientRect().top

    const xInside = x - leftElement
    const yInside = y - topElement

    return { xInside, yInside }
  },

  incrementClickCount(index) {
    const countEl = DoubleClick.likesEl[index]
    DoubleClick.clickCount[index] += 1
    countEl.innerHTML = DoubleClick.clickCount[index]
  },

  animationAfterDoubleClick(index) {
    if (DoubleClick.solidHearts[index].classList.contains('fav')) {
      DoubleClick.solidHearts[index].classList.add('jump')
      setTimeout(() => DoubleClick.solidHearts[index].classList.remove('jump'), 800)
    } else {
      DoubleClick.solidHearts[index].classList.add('fav')
    }
  },

  createElementOnDoubleClick(event, element) {
    const heart = document.createElement('i')
    heart.className = 'fas fa-heart'

    const { xInside, yInside } = DoubleClick.getClickPosition(event, element)

    heart.style.top = `${yInside}px`
    heart.style.left = `${xInside}px`

    element.appendChild(heart)
    setTimeout(() => heart.remove(), 800)
  },

  doubleClickEvent(element, index) {
    element.addEventListener('click', event => {
      // Primeiro Click  
      if (DoubleClick.clickTime === 0 && DoubleClick.elementIndex === null ) {
        DoubleClick.clickTime = new Date().getTime()
        DoubleClick.elementIndex = index
      } else {
        // Segundo Click: verifica o delay entre o primeiro e o segundo click e se o index do elemento clicado é o mesmo do primeiro clique.
        // Se for menor que "clickDelay", chama a função e reseta o "clickTime".
        if (((new Date().getTime() - DoubleClick.clickTime) < DoubleClick.clickDelay) && DoubleClick.elementIndex === index) {
          DoubleClick.createElementOnDoubleClick(event, element)
          DoubleClick.incrementClickCount(index)
          DoubleClick.animationAfterDoubleClick(index)
          DoubleClick.clickTime = 0
          DoubleClick.elementIndex = null
        } else {
          // Conta como "primeiro click" de novo e atribui o novo index do elemento.
          DoubleClick.clickTime = new Date().getTime()
          DoubleClick.elementIndex = index
        }
      }
    })
  }
}

DoubleClick.posts.forEach((post, index) => {
  DoubleClick.clickCount.push(0)
  DoubleClick.doubleClickEvent(post, index)
})