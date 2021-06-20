const DoubleClick = {
  posts: document.querySelectorAll('.post'),
  likesCounterEl: document.querySelectorAll('.likes-counter'),
  hearts: document.querySelectorAll('.interactions .fas.fa-heart'),
  anchors: document.querySelectorAll('.interactions a'),

  likesCounterArray: [],
  heartPumpQueue: [],

  clickTime: 0,
  clickDelay: 800,
  clickedElementIndex: null,

  likeOnAnchor(anchor, index) {
    anchor.addEventListener('click', event => {
      event.preventDefault()
      if (anchor.title === 'Like') DoubleClick.incrementLikesCounter(index / 3)
    })
  },

  animationOnDoubleClick(index) {
    if (!DoubleClick.hearts[index].classList.contains('fav')) {
      DoubleClick.hearts[index].classList.add('fav')
    } else if (DoubleClick.hearts[index].classList.contains('fav') && DoubleClick.hearts[index].classList.contains('pump')) {
      return
    } else {
      DoubleClick.hearts[index].classList.add('pump')
      setTimeout(() => DoubleClick.hearts[index].classList.remove('pump'), 850)
    }
  },

  incrementLikesCounter(index) {
    DoubleClick.likesCounterArray[index] += 1
    DoubleClick.likesCounterEl[index].innerHTML = this.likesCounterArray[index]

    DoubleClick.animationOnDoubleClick(index)
  },
  
  getClickPosition(event, element) {
    const x = event.clientX
    const y = event.clientY

    const leftElement = element.getBoundingClientRect().left
    const topElement = element.getBoundingClientRect().top

    const xInside = x - leftElement
    const yInside = y - topElement

    return { xInside, yInside }
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
        // Se for menor que "clickDelay", chama a função e reseta o "clickTime" e "elementIndex".
        if (((new Date().getTime() - DoubleClick.clickTime) < DoubleClick.clickDelay) && DoubleClick.clickedElementIndex === index) {
          DoubleClick.createElementOnDoubleClick(event, element)
          DoubleClick.incrementLikesCounter(index)
          DoubleClick.clickTime = 0
          DoubleClick.clickedElementIndex = null
        } else {
          // Conta como "primeiro click" de novo e atribui o novo index do elemento.
          DoubleClick.clickTime = new Date().getTime()
          DoubleClick.clickedElementIndex = index
        }
      }
    })
  }
}

DoubleClick.posts.forEach((post, index) => {
  DoubleClick.likesCounterArray.push(0)
  DoubleClick.doubleClickEvent(post, index)
})
DoubleClick.anchors.forEach((anchor, index) => DoubleClick.likeOnAnchor(anchor, index))