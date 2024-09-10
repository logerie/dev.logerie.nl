const decks = document.querySelectorAll('div.deck')
let observers = []

decks.forEach((deck, deckNo) => {
  let controls = Object.assign(document.createElement('div'), { className: 'controls' })
  let inner = document.createElement('div')
  controls.appendChild(inner)

  observers.push(new IntersectionObserver(deckInView, { root: deck, rootMargin: '0px', threshold: 0.6 }))

  deck.childNodes.forEach((article, articleNo) => {
    if (article.nodeName === 'ARTICLE') {
      let button = document.createElement('button')
      button.className = article.nodeName.toLowerCase()
      button.innerHTML = `<span class="visually-hidden">${article.firstElementChild.innerHTML}</span>`
      button.setAttribute('data-deck', deckNo)
      button.setAttribute('data-article', articleNo)
      button.addEventListener('click', deckButtonHandler)
      inner.appendChild(button)

      article.childNodes.forEach((picture, pictureNo) => {
        if (picture.nodeName === 'PICTURE') {
          console.log(picture)
          observers.push(new IntersectionObserver(pictureInView, { root: picture, rootMargin: '0px', threshold: 0.6 }))
          let button = document.createElement('button')
          button.className = picture.nodeName.toLowerCase()
          button.innerHTML = `<span class="visually-hidden">${article.firstElementChild.innerHTML}</span>`
          button.setAttribute('data-deck', deckNo)
          button.setAttribute('data-article', articleNo)
          button.setAttribute('data-picture', pictureNo)
          button.addEventListener('click', deckButtonHandler)
          inner.appendChild(button)
        }
      })
    }
  })
  deck.after(controls)
})

/**
 * Handles button clicks, scrolls the targeted element into view
 * @param {*} event the passed event
 */
function deckButtonHandler(event) {
  // remove active on everything in this specific deck
  event.target.classList.toggle('active')

  const data = event.target.dataset
  const scroller = document.querySelectorAll('div.deck')[data.deck]
  const scrollTarget = getScrollTarget(data.deck, data.article, data.picture).getBoundingClientRect()
  scroller.scroll({ left: scroller.scrollLeft + scrollTarget.x, behavior: 'smooth' })
}

/**
 * Finds the target element for a scroll action, be it an article or a picture
 * @param {Number} deck the slidedeck that contains the target
 * @param {Number} article the article that is either the target or contains it
 * @param {Number} picture the picture that is the target (optional)
 * @returns the element to scroll to
 */
function getScrollTarget(deck, article, picture) {
  return picture === undefined
    ? document.querySelectorAll('div.deck')[deck].childNodes[article]
    : document.querySelectorAll('div.deck')[deck].childNodes[article].childNodes[picture]
}

function deckScrollHandler(event) {
  console.log(event.target)
}

function deckInView(entries, observer) {
  entries.forEach((entry) => {
    // Each entry describes an intersection change for one observed
    // target element:
    //   entry.boundingClientRect
    //   entry.intersectionRatio
    //   entry.intersectionRect
    //   entry.isIntersecting
    //   entry.rootBounds

    console.log(entry.target)
    //   entry.time
  })
}

function pictureInView() {
  entries.forEach((entry) => {
    console.log(entry.target)
  })
}
