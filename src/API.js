class API {
  static init () {
    this.baseUrl = 'http://localhost:3000/pups'
  }

  static getPups () {
    return fetch(this.baseUrl)
      .then(resp => resp.json())
  }

  static getPup (id) {
    return fetch(`${this.baseUrl}/${id}`)
      .then(resp => resp.json())
  }

  static editPupStatus (id, newStatus) {
    return fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isGoodDog: newStatus })
    }).then(resp => resp.json())
  }
}  
API.init()
