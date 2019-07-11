document.addEventListener('DOMContentLoaded', () => {

    /// DOM ELEMENTS ///
    const usersUrl = `http://localhost:3000/api/v1/users`
    const messagesUrl = `http://localhost:3000/api/v1/messages`
    const itemsUrl = `http://localhost:3000/api/v1/items`
    const userForm = document.querySelector("#user-form")
    const messageDiv = document.querySelector('#message-div')
    const inboxContainer = document.querySelector('#inbox')
    const sell = document.getElementById('sell')
    const menuBtn = document.getElementById('menuButton')
    const map = document.getElementById('map')
    const logout = document.getElementById('logout')
    const inbox = document.getElementById('inbox')
    const browse = document.getElementById('browse')
    

    ///local state///
    let userId = null
    let messages = []

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

    //begin itemDiv listener
    sell.addEventListener('click', (e) => {
        if (e.target.id === 'sell') {
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
             <select name = "category" form = "item-info">
                 <option value = "clothing" > Clothing </option> 
                 <option value = "records" > Records </option> 
                 <option value = "video games" > Video Games </option> 
                 <option value = "books" > Books </option> 
                 <option value = "electronics" > Electronics </option> 
                 </select>
             Price:
             <input type="text" name="price" >
             <input hidden type="text" value=${userId} >
             <input type="submit" name="submit" >
             </form>
        </div>
        `
        }
        closeNav()
        itemDiv.style.display = 'block'
    }) //end itemDiv listener

    inbox.addEventListener('click', e => {
        // console.log('click');
        if (e.target.id === 'messages')

            messageDiv.innerHTML = ''
            messageDiv.innerHTML = `
                <div id='message-info'>
                    <input id='msg-body' type='textarea' name='body'>
                    <input data-id=${userId} id='send' type='submit' name='send' value='send'>
                </div>

                `

        const messageInfo = document.querySelector('#message-info')

        messageInfo.addEventListener('click', e => {
            if (e.target.id === 'send') {
                const user = e.target.dataset.id
                let messageBody = document.querySelector('#msg-body').value
                console.log(user, messageBody);

                fetch(messagesUrl, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            body: messageBody,
                            user_id: user,
                            item_id: 1
                        }) // end of body
                    }) // end of Fetch
                    .then(r => r.json())
                    .then(newMsg => {
                        console.log(newMsg)
                    })
            } // end of if


        }) //end of messageInfo listener


    }) // end of messageDiv listener

    inboxContainer.addEventListener('click', e => {
        if (e.target.id === 'message') {
            fetch(messagesUrl)
                .then(r => r.json())
                .then(msgObjs => {
                    messages = msgObjs
                    // console.log(msgObjs);
                    console.log(messages);
                    console.log(userId)
                    let userMsgs = messages.filter(msgObjs => msgObjs.user_id === userId)
                    console.log(userMsgs)
                    userMsg.forEach(msg => {
                        inboxContainer.innerHTML = ''
                        inboxContainer.innerHTML += `
          

        `
                    })
                }) // end of fetch Msgs

        }


    }) // end of inbox listener

    logout.addEventListener('click', e => {
        if (e.target.innerText === 'Logout')
            closeNav()
        menuBtn.style.display = 'none'
        userForm.style.display = 'block'
        itemDiv.style.display = 'none'
        map.style.display = 'none'
    })
    // function renderItems(item){
        // itemDiv.innerHTML += `
        // <div>
        //     <ul id='itemName'> 
        //     ${item.title}
        //     </ul> 
        //     <br>
        // </div>
        // `
        
    //     const itemName = document.querySelector("#itemName")
    //     itemName.addEventListener('click', e => {
    //         if (e.target.innerText === "")
    //         itemName.innerHTML += `
    //         <ul>
    //             Description:${item.description}
    //             Photo:${item.photo}
    //             Category:${item.category}
    //             Price:${item.price}
    //         </ul>
    //         `
    //     })
    // }

    browse.addEventListener('click', e => {
        if (e.target.innerText === 'Browse')
        closeNav()
        map.style.display = 'none'
        itemDiv.innerHTML = `
        <button>Electronics</button>
        <button>Clothing</button>
        <button>Books</button>
        <button>Video Games</button>
        <button>Records</button>
        `
            itemDiv.addEventListener('click', e => {
                if (e.target.innerText === "Electronics")
                fetch(itemsUrl)
                .then(resp => resp.json())
                .then(json => {
                    json.forEach()
                })
            })
        // fetch(itemsUrl)
        // .then(resp => resp.json())
        // .then(json => {
        //     json.forEach(item => {
        //         itemDiv.innerHTML += `
        //         <div id='itemName'>
        //             <ul>
        //             ${item.title}
        //             </ul> 
        //             <br>
        //         </div>
        //         `
        //     })
        //     let itemName = document.querySelector('#itemName')
        //     itemName.addEventListener('click', e => {
        //         if (e.target.innerHTML === `${item.title}`)
        //         itemName.innerHTML += `
        //         <ul>
        //         ${item.description}
        //         </ul> 
        //         `
        //     })
        // })
    })

}) // end of DOM load


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
