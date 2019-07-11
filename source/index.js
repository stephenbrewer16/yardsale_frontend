document.addEventListener('DOMContentLoaded', () => {

    /// DOM ELEMENTS ///
    const usersUrl = `http://localhost:3000/api/v1/users`
    // const messagesUrl = `http://localhost:3000/api/v1/messages`
    const itemsUrl = `http://localhost:3000/api/v1/items`
    const userForm = document.querySelector("#user-form")
    // const messageDiv = document.querySelector('#message-div')
    // const inboxContainer = document.querySelector('#inbox')
    const sell = document.getElementById('sell')
    const menuBtn = document.getElementById('menuButton')
    const map = document.getElementById('map')
    const logout = document.getElementById('logout')
    // const inbox = document.getElementById('inbox')
    const browse = document.getElementById('browse')
    const itemBox = document.querySelector('#item-div')
    const itemDis = document.querySelector('#item-display')
    const itemShow = document.querySelector('#item-show')

    ///local state///
    let userId = null

    menuBtn.style.display = 'none'
    map.style.display = 'none'

    userForm.addEventListener('submit', e => {
        e.preventDefault()

        let name = userForm[0].value
        let location = userForm[1].value

        fetch(usersUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    location
                }) // end of body
            }) // end of Fetch
            .then(r => r.json())
            .then(newUser => {
                if (newUser.id) {
                    userId = newUser.id
                    menuBtn.style.display = 'block'
                    userForm.style.display = 'none'
                    map.style.display = 'block'
                } 
            })
    }) // end of userForm listener

    //begin itemBox listener
    sell.addEventListener('click', (e) => {
        itemBox.innerHTML = ""
        itemShow.innerHTML = ""
        if (e.target.id === 'sell') {
            itemBox.innerHTML += `
         <div id="item-info">
         <ul>
             <form id="item-form" >
             Title:
             <input type="text" name="title" >
             <br>
             Description:
             <input type="text" name="description" >
             <br>
             Photo URL:
             <input type="text" name="photo" >
             <br>
             Category:
             <select name = "category" form = "item-info">
                 <option value = "Clothing" > Clothing </option> 
                 <option value = "Records" > Records </option> 
                 <option value = "Books" > Books </option> 
                 <option value = "Electronics" > Electronics </option> 
                 </select>
                 <br>
             Price:
             <input type="text" name="price" >
             <input hidden type="text" value=${userId} >
             <input type="submit" name="submit" >
             </form>
        </div>
        </ul>
        `
        }
        closeNav()
    }) //end itemBox listener

    logout.addEventListener('click', e => {
        if (e.target.innerText === 'Logout')
            closeNav()
        menuBtn.style.display = 'none'
        userForm.style.display = 'block'
        itemBox.style.display = 'none'
        map.style.display = 'none'
    })

    browse.addEventListener('click', e => {
        if (e.target.innerText === 'Browse')
        itemShow.innerHTML = ""
        itemBox.innerHTML = ""
        closeNav()
        itemShow.innerHTML += `
        <ul>
        <button>Electronics</button>
        <button>Clothing</button>
        <button>Books</button>
        <button>Records</button>
        </ul>
        `
            itemShow.addEventListener('click', e => {
               if (e.target.nodeName === "BUTTON"){
                fetch(itemsUrl+"/"+e.target.innerText)
                .then(resp => resp.json())
                .then(items => {
                    itemBox.innerHTML = "";
                    items.forEach(item => {
                        itemBox.innerHTML += `
                        <ul> 
                            <b>${item.title}</b>
                            <ul>
                                <b> Description: </b>${item.description}
                                <br>
                                <b> Price: </b>${item.price}
                            </ul>
                        </ul>
                        `
                    })
                })
            }
        })
    })

}) // end of DOM load


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
