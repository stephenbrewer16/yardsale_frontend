//INITIALIZE MAP

const map = L.map('map').setView([40.7128, -74.0060], 13)
const mapDiv = document.querySelector('#map')
let userId = localStorage.getItem("user")

const mapWindow = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic21pdGhhbTUwIiwiYSI6ImNqeHZ4NWNxcjA5cGYzY29jZjBlNnFub2kifQ.s8Am01fhZoezrzcGmFV1SQ', {
    attribution: "Thank you, Mapbox!",
    minZoom: 9,
    maxZoom: 17,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic21pdGhhbTUwIiwiYSI6ImNqeHZ4NWNxcjA5cGYzY29jZjBlNnFub2kifQ.s8Am01fhZoezrzcGmFV1SQ'
}).addTo(map)

//MAP EVENT LISTENER
mapDiv.addEventListener('click', function(e) {
    if (e.target.className === "item-title") {
        renderItem(e.target.id)
    }
})

//END MAP EVENT LISTENER



//ADD MARKERS
const userArray = []

function fetchPins() {
    fetch('http://localhost:3000/api/v1/users')
    .then(resp => resp.json())
    .then(users => {
        users.forEach(user => {
            userArray.push(user)
        })
    })
    .then(renderPins)
}
fetchPins()

function renderPins() {
    userArray.forEach(user => {
        let userCaption = ""

        if (user.items.length !== 0) {
            user.items.forEach(item => {
                userCaption += `<h5 id=${item.id} class="item-title">${item.title} $${item.price} \n </h5>`
            })
            let marker = L.marker([user.lat, user.long])
            .bindPopup(userCaption)
            .addTo(map)
        }
    })
}

//RENDER ITEMS ON MARKER CLICK
const itemsURL = 'http://localhost:3000/api/v1/items'

function renderItem(itemId) {
    fetch('http://localhost:3000/api/v1/items')
        .then(resp => resp.json())
        .then(items => {
            items.forEach(item => {
                if (item.id === parseInt(itemId)) {
                    itemDiv.innerHTML = ""
                    //Slap item to DOM
                    itemDiv.innerHTML += `
                    <div id='item-info'>
                    <h4 class='info-row'>${item.title} $${item.price}</h4>
                    <h5 class='info-row'>${item.category}</h5>
                    <p class='info-row'>${item.description}</p>
                    <div class='message-info'>
                        <input class='msg-body' type='textarea' name='body'>
                        <br>
                        <input data-id=${item.user.id} data-item=${item.id} id='send' type='submit' name='send' value='Message Seller'>
                    </div>
                    <div class='message-thread'>
                    </div>
                    <br>
                    </div>
                `
                //LIST MESSAGES


                    item.messages.forEach(message => {
                        itemDiv.querySelector('.message-thread').innerHTML += `
                        <p><strong>${message.user.name}</strong>: ${message.body}</p>
                        `
                    })
                //END LIST MESSAGES

                }
            })
        })//end fetch
}
//END RENDER ITEMS

//ADD INDIVIDUAL MARKER
const itemsUrl = `http://localhost:3000/api/v1/items`
const itemDiv = document.querySelector("#item-display")
const itemForm = document.querySelector("#item-div")
const itemBox = document.querySelector('#item-div')

itemForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const itemForm = document.querySelector('#item-form')
    let title = itemForm[0].value
    let description = itemForm[1].value
    let category = e.target.querySelector("select").value
    let price = itemForm[2].value
    let userNum = itemForm[3].value
    console.log(title, description, category, price, userNum)
    fetch(itemsUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            title,
            description,
            category,
            price,
            user_id: userNum
        }) // end of body
    }) // end of Fetch
        .then(r => r.json())
        .then(newItem => {
            postPin(newItem)
        })
    itemBox.innerHTML = ""
}) // end of itemDiv event listener

function postPin(newItem) {
    let userCaption = ""

    userCaption = `<h5 id=${newItem.id} class="item-title">${newItem.title} $${newItem.price}</h5>`
    L.marker([newItem.user.lat, newItem.user.long])
        .bindPopup(userCaption)
        .addTo(map)

    map.panTo([newItem.user.lat, newItem.user.long])
}


//MESSAGE EVENT LISTENER
const messageThread = document.querySelector('.message-thread')
const messagesUrl = `http://localhost:3000/api/v1/messages`

itemDiv.addEventListener('click', e => {
        if (e.target.id === 'send') {

            const thisThread = e.target.parentElement.nextElementSibling


            let messageBody = document.querySelector('.msg-body').value
            console.log(userId, messageBody);

debugger
            fetch(messagesUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    body: messageBody,
                    user_id: parseInt(userId),
                    item_id: e.target.dataset.item,
                }) // end of body
            }) // end of Fetch
                .then(r => r.json())
                .then(message => {
                 //NEEDS MESSAGE THREAD SPECIFIC TO ITEM
                    thisThread.innerHTML += `
                        <strong>${message.user.name}</strong>: ${message.body} \n
                    `
                })
        } // end of if


    }) //end of messageInfo listener
//END MESSAGE EVENT LISTENER


//ADD BROWSE EVENT LISTENER

itemBox.addEventListener('click', function(e) {
    renderItem(e.target.closest('div').dataset.id)
})

//END BROWSE EVENT LISTENER
