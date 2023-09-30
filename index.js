const appSettings = {
    databaseURL:"https://messaging-app-basic-default-rtdb.asia-southeast1.firebasedatabase.app/" // linked my databse to a variable in JS
}

import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js" // imported a function initializeApp from the link provided, which needs an argument

const app = initializeApp(appSettings)

import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js" //imported another function

const database = getDatabase(app)

const msgInDb = ref(database, "messageSent")

// firebase connected

let text1 = document.getElementById("mainform")

let inputto = document.getElementById("inpto")

let inputfrom = document.getElementById("inpfrom")

const btnsend = document.getElementById("btn1")

let ullist = document.getElementById("ull")

// basic elements linked

btnsend.addEventListener("click", function(){
    
    let inpval = text1.value

    push(msgInDb, inpval)

    clearinpvalue()
})

function clearinpvalue(){

    text1.value = ""

}

onValue(msgInDb, function(snapshot){

    
    if (snapshot.exists){

        let objToArray = Object.entries(snapshot.val())

        deletePrevUl()

        for (let i=0; i<objToArray.length;i++){

            let arrayWithIdValue = objToArray[i]

            appendToLocalList(arrayWithIdValue)
        }
        
    }

    else{
        ullist.textContent = "Feel the fire? Make the first move!"
    }
}
)

function appendToLocalList(inputRawArr){ 

    let arrayId = inputRawArr[0]

    let arrayValue = inputRawArr[1]

    let toinp = inputto.value

    let froinp = inputfrom.value

    let createLists = document.createElement("li")

    createLists.textContent = `${toinp} Sent ${arrayValue} to  ${froinp}`

    ullist.append(createLists)



    //deleting on double click

    createLists.addEventListener("dblclick", function(){

        let delId = ref(database, `messageSent/${arrayId}` )
    
        remove(delId)
    })

}

function deletePrevUl(){

    ullist.textContent = ""
}






