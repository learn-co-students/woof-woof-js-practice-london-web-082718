const dogBarEl = document.getElementById('dog-bar') 
const dogInfo = document.getElementById('dog-info') 
const dogFilterBtn = document.getElementById('good-dog-filter')
const filterDivEl = document.getElementById('filter-div')


const getDogs = () => 
    fetch("http://localhost:3000/pups")
        .then(resp => resp.json()) 

const updateDog = (id, data) => 
    fetch(`http://localhost:3000/pups/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            isGoodDog: data.isGoodDog
        })
    }).then(resp => resp.json())


const renderAllDogs = dogs => {
    dogs.forEach(renderDog)
}

const filterGoodDogs = dogs => {
    let goodDogs = dogs.filter(dog => dog.isGoodDog === true)
    goodDogs.forEach(renderDog)
}

getDogs() 
    .then(renderAllDogs)
 

const renderDog = dog => {
    const dogSpan = document.createElement('span')
    dogSpan.id = `${dog.id}`
    dogSpan.innerText = `${dog.name}`
    dogBarEl.append(dogSpan)

    dogSpan.addEventListener('click', (e) => {

        while (dogInfo.firstChild) {
            dogInfo.removeChild(dogInfo.firstChild)
        }

        btnGood = "Good Dog"
        btnBad = "Bad Dog"

        const dogImg = document.createElement('img')
        dogImg.src = `${dog.image}`
        const dogHeading = document.createElement('h2')
        dogHeading.innerText = `${dog.name}`
        const dogButton = document.createElement('button') 
        dogButton.innerText = dog.isGoodDog ? btnGood : btnBad

        dogInfo.append(dogImg, dogHeading, dogButton)

            dogButton.addEventListener('click', (e) => {
                console.log('click')
                if (e.target.innerText === btnGood) {
                    e.target.innerText = btnBad
                    updateDog(dog.id, {isGoodDog: false})

                } else if (e.target.innerText === btnBad) {
                    e.target.innerText = btnGood
                    updateDog(dog.id, {isGoodDog: true})
                }
            })
    })
}

dogFilterBtn.addEventListener('click', (e) => {
    // const filterOnOrOff = e.target.innerText.split(" ")[3]

    // e.target.innerText.includes('OFF')

    if (e.target.innerText.includes('OFF')) {
        
        dogBarEl.innerHTML = ""
    
        getDogs() 
            .then(filterGoodDogs)   
    
        e.target.innerText = 'Filter good dogs: ON' 
    } else if (e.target.innerText.includes('ON')) {

    
        dogBarEl.innerHTML = ""
        getDogs() 
            .then(renderAllDogs)

        e.target.innerText = 'Filter good dogs: OFF'  

    }
})