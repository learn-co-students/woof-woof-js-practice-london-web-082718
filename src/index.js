
let puppersNotFromServer
const doggoLineup = document.getElementById('dog-bar')
const doggoFilterBtn = document.getElementById('good-dog-filter')
const doggoContainer = document.getElementById('dog-summary-container')
const dogInfo = document.getElementById('dog-info')

function renderPupper (pup) {
  const pupper = document.createElement('span')
  // doggo.classList.add('dog-bar')
  pupper.innerHTML = `
    <p onclick="moreDisplay()" class="pup-id" id="pup-${pup.id}">${pup.name}
    </p>
  `
  pupper.addEventListener('click', () => {
    dogInfo.innerHTML = `
    <img src="${pup.image}">
      <h2 class="pup-id" id="pup-${pup.id}">${pup.name}</h2>
      <h3>Good pup status:</h3>
      <button id="pup-status">${pup.isGoodDog}</button>
    `
    doggoContainer.appendChild(dogInfo)
    const pupStatusButton = document.getElementById('pup-status')
    // Pup status change
    pupStatusButton.addEventListener('click', () => {
      if (pup.isGoodDog === true) {
        pup.isGoodDog = false
      } else {
        pup.isGoodDog = true
      }
      API.editPupStatus(pup.id, pup.isGoodDog)
      pupStatusButton.innerHTML = pup.isGoodDog
    })
  })

  return pupper
}

function appendPup (pup) {
  const puppo = renderPupper(pup)
  doggoLineup.appendChild(puppo)
}

function appendPups (puppers) {
  puppers.forEach(pup => appendPup(pup))
}

doggoFilterBtn.addEventListener('click', () => {
  doggoFilterBtn.innerHTML = doggoFilterBtn.innerHTML === 'Filter good puppers: OFF' 
    ? 'Filter good puppers: ON'
    : 'Filter good puppers: OFF'
  let goodPuppers = []
  puppersNotFromServer.forEach(pupper => {
    if (pupper.isGoodDog === true) {
      goodPuppers.push(pupper)
    }
    doggoLineup.innerHTML = ''
    if (doggoFilterBtn.innerHTML === 'Filter good puppers: ON') {
      appendPups(goodPuppers)
    } else {
      appendPups(puppersNotFromServer)
    }
  })
})

API.getPups()
  .then(pupsFromServer => {
    puppersNotFromServer = pupsFromServer
    appendPups(pupsFromServer)
  })
