console.log("hi!!")

// INITIALIZE
const fetchMonster = () => {
  fetch(`http://localhost:3000/monsters/?_limit=5&_page=${num}`)
    .then(response => response.json())
    .then(monstersArray => {
      monstersArray.forEach(monsterObj => {
        renderOneMonster(monsterObj)
      })
    })
}

// DOM ELEMENTS
const monsterContainer = document.querySelector("#monster-container")
const h1 = document.querySelector("#create-monster")
const form = document.createElement("form")
const nameInput = document.createElement("input")
nameInput.id = "name"
nameInput.placeholder = "name..."
const ageInput = document.createElement("input")
ageInput.type = "number"
ageInput.id = "age"
ageInput.placeholder = "age..."
const descInput = document.createElement("input")
descInput.id = "bio"
descInput.placeholder = "bio..."
const createBtn = document.createElement("button")
createBtn.id = "btn"
createBtn.style.color = "pink"
createBtn.style.fontFamily = "Comic Sans MS, cursive, sans-serif"
createBtn.style.background = "red"
createBtn.textContent = "Click Here To Create Monster"

let num = 1
console.log(num)

h1.append(form)
form.append(nameInput, ageInput, descInput, createBtn)

// RENDER
const renderOneMonster = (monsterObj) => {
  const div = document.createElement("div")
  const h2 = document.createElement("h2")
  h2.textContent = monsterObj.name
  h2.dataset.id = monsterObj.id
  const h4 = document.createElement("h4")
  h4.textContent = `Age: ${monsterObj.age}`
  const p = document.createElement("p")
  p.textContent = `Bio: ${monsterObj.description}`
  monsterContainer.append(div)
  div.append(h2, h4, p)
}

// EVENT HANDLERS
const createMonster = (event) => {
  event.preventDefault()

  const newMonster = {
    name: event.target.name.value,
    age: event.target.age.value,
    description: event.target.bio.value
  }

  fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(newMonster),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      (renderOneMonster(newMonster))
    })

  event.target.reset()

}

const changeMonsterPage = (event) => {
  // console.log(event.target)
  if (event.target.matches("#back")) {
    if (num >= 1) {
      monsterContainer.innerHTML = ""
      num = num - 1
      fetchMonster()
    }
    else {
      alert(`Oops there is no page 0. Please click the forward button to get to page 1`)
    }

  }
  else if (event.target.matches("#forward")) {
    monsterContainer.innerHTML = ""
    num = num + 1
    fetchMonster()
  }
}


// EVENT LISTENERS
form.addEventListener("submit", createMonster)
document.addEventListener("click", changeMonsterPage)


fetchMonster()