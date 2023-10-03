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

let messele = document.getElementById("messdiv")

// basic elements linked

btnsend.addEventListener("click", function(){
    
    let toval = inputto.value

    let froval = inputfrom.value

    let inpval = text1.value

    let finval = {
        "receiver" : toval,
        "messa" : inpval,
        "sender" : froval

    }

    push(msgInDb, finval,)

    clearinpvalue()

})

function clearinpvalue(){

    text1.value = ""
    inputto.value = ""
    inputfrom.value = ""
    
}

onValue(msgInDb, function(snapshot){

    
    if (snapshot.exists){

        let objToArray = Object.entries(snapshot.val())

        messele.innerHTML = ""

        for (let i=0; i<objToArray.length;i++){

            let arrayWithIdValue = objToArray[i]

            let arrayWithId = arrayWithIdValue[0]

            let arrayWithValue = arrayWithIdValue[1]

            // now we extract values from the array created with 'arrayWithValue'

            let receiverfin = arrayWithValue.receiver

            let messafin = arrayWithValue.messa

            let senderfin = arrayWithValue.sender

            displayelements(receiverfin, messafin, senderfin)


        }
        
    }

    else{
        messele.textContent = "Feel the fire? Make the first move!"
    }
}
)

function displayelements(receiverfin,messafin,senderfin){ 

    if ( receiverfin != "" && senderfin != ""){

        let displayItems = `<div class="unlist" id="ull">
    <p id="sentid">To ${receiverfin}</p>
    <p id="messid">${messafin}</p>
    <p id="senderid">From ${senderfin}</p>
    </div> `

    messele.innerHTML += displayItems

    }

    else{

        let displayItems = `<div class="unlist" id="ull">
    <p id="messid">${messafin}</p>
    </div> `

    messele.innerHTML += displayItems

    }

}

