document.addEventListener('DOMContentLoaded', ()=>{

/// DOM ELEMENTS ///
const usersUrl = `http://localhost:3000/api/v1/users`
const itemsUrl = `http://localhost:3000/api/v1/items`
const userForm = document.querySelector("#user-form")
const itemDiv = document.querySelector("#itemDiv")
let userId = null


userForm.addEventListener('submit', e=>{
e.preventDefault()

let name = userForm[0].value 
let location = userForm[1].value
let email = userForm[2].value

fetch(usersUrl, {
    method:"POST",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        name,
        location,
        email
    })// end of body 
})// end of Fetch
    .then(r => r.json())
    .then(newUser => {
        userId = newUser.id
    })




})// end of userForm

//begin itemDiv listener
    itemDiv.addEventListener('click', (e) => {
        if (e.target.id === 'add-item') {
            itemDiv.innerHTML = ""
            itemDiv.innerHTML += `
             <div id="item-info">
                 <form id="item-form" >
                 Title: 
                 <input type="text" name="title" >  
                 Description: 
                 <input type="text" name="description" >  
                 Photo URL: 
                 <input type="text" name="photo" >  
                 Category: 
                 <input type="text" name="category" >   
                 Condition:  
                 <input type="text" name="condition" >  
                 Price:  
                 <input type="text" name="price" >  
                 <input hidden type="text" value=${userId} >  
                 <input type="submit" name="submit" >  
                 </form> 
            </div>
            `
        }
    })//end itemDiv listener
            itemDiv.addEventListener('submit', (e) => {
                e.preventDefault()
                const itemForm = document.querySelector('#item-form')
                let title = itemForm[0].value
                let description = itemForm[1].value
                let photo = itemForm[2].value
                let category = itemForm[3].value
                let condition = itemForm[4].value
                let price = itemForm[5].value
                let userNum = itemForm[6].value
                console.log(title, description, photo, category, condition, price, userNum)
                fetch(itemsUrl, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            title,
                            description,
                            photo,
                            category,
                            condition,
                            price,
                            user_id: userNum
                        }) // end of body 
                    }) // end of Fetch
                    .then(r => r.json())
                    .then(newItem => {
                        console.log(newItem)
                    })
            })







})// end of DOM load


