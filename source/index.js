document.addEventListener('DOMContentLoaded', ()=>{

/// DOM ELEMENTS ///
const usersUrl = `http://localhost:3000/api/v1/users`
const userForm = document.querySelector("#user-form")


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
        console.log(newUser)
    })




})// end of userForm








})// end of DOM load
