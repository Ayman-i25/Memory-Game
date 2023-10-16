
let time = document.querySelector(".main-info .timer span");
let res = document.querySelector(".restart");
let olEle = document.querySelector(".leaderBoard ol")
let winners = [];

//*? ===============================================
//*? ======= set the name and play the music =======
//*? ===============================================
document.querySelector(".btn span").onclick = function () {
    let yourName = prompt("What Is Your Name?")

    if (yourName == "" || yourName == null) {
        document.querySelector(".name span").innerHTML = "Unknown";
    } else {
        document.querySelector('.name span').innerHTML = yourName;
    }
    document.querySelector(".btn").remove()

    document.querySelector(".music").play()

    // winners.filter((e) => {
    //     if(e.Name == nameOfPlayer.innerHTML){
    //         console.log(`yes`)
    //     }
    // })
    countDown = setInterval(timer, 1000)
}




//*? ===============================================
//*? ======= get players from localStorage  =======
//*? ===============================================
function getDateFromLocal() {
    if(window.localStorage.getItem("players")) {
        winners = JSON.parse(localStorage.getItem("players"));
        addWinerToLeaderBoard(winners)
    }
}

getDateFromLocal()

let triesEle = document.querySelector(".tries span");
let duration = 1000;
let boxContainer = document.querySelector(".holder-box")
let boxs = Array.from(boxContainer.children)
let orderRange = [...Array(boxs.length).keys()]
let nameOfPlayer = document.querySelector(".name span");
shuffle(orderRange);

//*? ===============================================
//*? ======= set order style to boxes =============
//*? ===============================================
boxs.forEach((box, index) => {
    box.style.order = orderRange[index];

    box.addEventListener("click", function () {
        flipBox(box)
    })
})


console.log(Date.now())


let winBox = document.querySelector(".winbox")
let winbtn = document.querySelector(".winbox .text span")
let bgcWiner = document.querySelector(".bgc_for_win")
let bgcLoser = document.querySelector(".bgc_for_lose")


function flipBox(selectedBox) {
    selectedBox.classList.add("is-flipped")

    let allFlippedBox = boxs.filter((flippedBox) => flippedBox.classList.contains("is-flipped"))

    // cheack numbers of flibed card
    if (allFlippedBox.length == 2) {
        stopClicking()
        checkedMatchedBox(allFlippedBox[0], allFlippedBox[1])
    }
    let countFlipeed = boxs.filter((e) => e.classList.contains("has-match"))

    // cheack if all card are flipped to show win box 
    if(countFlipeed.length == boxs.length){
        winBox.classList.add("display")
        bgcWiner.classList.add("display")
        clearInterval(countDown)
        winbtn.addEventListener("click", (e) => {
            e.preventDefault()
            winBox.classList.remove("display")
            bgcWiner.classList.remove("display")
            boxContainer.classList.remove("no-clicking")
            count.innerHTML = 60
            triesEle.innerHTML = 0
            boxs.forEach((box) => {
                box.classList.remove("is-flipped")
                box.classList.remove("has-match")
            })
            // shuffle all card
            shuffle(orderRange);
            boxs.forEach((box,index) => {
                box.style.order = orderRange[index]
            })
        })
        winners.map((winer) => {
            if(winer.Name === nameOfPlayer.innerHTML){
                winer.wins = winer.wins + 1
                addWinerToLeaderBoard(winners)
                addDataToLocalStorage(winners)
            } else {
                addWinners(nameOfPlayer.innerHTML)
            }
        })
        // add winer to the leaderboard
        // addWinners(nameOfPlayer.innerHTML)

    }
}


//*? ===============================================
//*? ======= add winers to the winners array =======
//*? ===============================================
function addWinners(winner){
    const player = {
        id: Date.now(),
        Name: winner,
        wins: 1,
    }
    winners.push(player)
    addWinerToLeaderBoard(winners)
    addDataToLocalStorage(winners)
}


//*? ===============================================
//*? ======= add winers to the leaderboard =======
//*? ===============================================
function addWinerToLeaderBoard(winers) {
    olEle.innerHTML = "";
    winers.forEach(function(ele) {
        let li = document.createElement("li")
        li.setAttribute("data-id", ele.id)
        li.appendChild(document.createTextNode(ele.Name))
        olEle.appendChild(li)
        let span = document.createElement("span")
        span.appendChild(document.createTextNode(ele.wins))
        li.appendChild(span)
    })
}

//*? ===============================================
//*? ======= add winers to localStorage =======
//*? ===============================================
function addDataToLocalStorage(data) {
    window.localStorage.setItem("players" , JSON.stringify(data))
}

//*? ===============================================
//*? ======= Prevent the user from clicking =======
//*? ===============================================
function stopClicking() {
    boxContainer.classList.add("no-clicking")

    setTimeout(() => {
        boxContainer.classList.remove("no-clicking")
    }, duration)
}

//*? ===============================================
//*? ======= checked Matched card =======
//*? ===============================================
function checkedMatchedBox(firstBox, secondBox) {

    if (firstBox.dataset.tech === secondBox.dataset.tech) {
        firstBox.classList.remove("is-flipped")
        secondBox.classList.remove("is-flipped")

        document.querySelector(".win").play()

        firstBox.classList.add("has-match")
        secondBox.classList.add("has-match")
    } else {
        triesEle.innerHTML = parseInt(triesEle.innerHTML) + 1;

        setTimeout(() => {
            firstBox.classList.remove("is-flipped")
            secondBox.classList.remove("is-flipped")
        }, duration)

        document.querySelector(".lose").play()
    }
}

//*? ===============================================
//*? ======= set cards is random ============
//*? ===============================================
function shuffle(arry) {
    let current = arry.length,
        temp,
        random;

    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = arry[current];
        arry[current] = arry[random];
        arry[random] = temp
    }
    return arry;
}

let restBtn = document.querySelector(".restart .text span")
let restBox = document.querySelector(".restart")
let count = document.querySelector(".timer span")

// set timer
function timer() {
    if (count.innerHTML > 0) {
        count.innerHTML--
        if (count.innerHTML == 0) {
            setTimeout(() => {
                restBox.classList.add("display")
                bgcLoser.classList.add("display")
                boxContainer.classList.add("no-clicking")
                restAll()
            }, 1000)
        }
    }
}
// set all card
function restAll() {
    restBtn.addEventListener("click", (e) => {
        e.preventDefault()
        restBox.classList.remove("display")
        bgcLoser.classList.remove("display")
        boxContainer.classList.remove("no-clicking")
        count.innerHTML = 50
        triesEle.innerHTML = 0
        boxs.forEach((box) => {
            box.classList.remove("is-flipped")
            box.classList.remove("has-match")
        })
        shuffle(orderRange);
        boxs.forEach((box,index) => {
            box.style.order = orderRange[index]
        })
    })
}

