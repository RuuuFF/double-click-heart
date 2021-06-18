const DOM = {
  posts: document.querySelectorAll('.post'),
  times: document.querySelector('#times'),

  createElementOnDoubleClick(event, element) {
    const heart = document.createElement('i')
    heart.className = 'fas fa-heart'

    const { xInside, yInside } = DoubleClick.getClickPosition(event, element)

    heart.style.top = `${yInside}px`
    heart.style.left = `${xInside}px`

    element.appendChild(heart)
    DOM.times.innerHTML = ++DoubleClick.timesClicked

    setTimeout(() => heart.remove(), 800)
  }
}

const DoubleClick = {
  clickTime: 0,
  clickDelay: 800,
  timesClicked: 0,

  getClickPosition(event, element) {
    const x = event.clientX
    const y = event.clientY

    const leftElement = element.getBoundingClientRect().left
    const topElement = element.getBoundingClientRect().top

    const xInside = x - leftElement
    const yInside = y - topElement

    return { xInside, yInside }
  },

  doubleClickEvent(element) {
    element.addEventListener('click', event => {
      // Primeiro Click  
      if (DoubleClick.clickTime === 0) {
        DoubleClick.clickTime = new Date().getTime()
      } else {
        // Segundo Click: verifica o delay entre o primeiro e o segundo.
        // Se for menor que "clickDelay", chama a função e reseta o "clickTime".
        if ((new Date().getTime() - DoubleClick.clickTime) < DoubleClick.clickDelay) {
          DOM.createElementOnDoubleClick(event, element)
          DoubleClick.clickTime = 0
        } else {
          // Conta como "primeiro click" de novo
          DoubleClick.clickTime = new Date().getTime()
        }
      }
    })
  }
}

DOM.posts.forEach(post => DoubleClick.doubleClickEvent(post))