const track_length = 70 //sometimes constant variables are all CAPS
const startBtn = document.getElementById('startBtn')
const messageEl = document.getElementById('message')
const trackEl = document.getElementById('track')


let tortoisePosition = 1
let harePosition = 1
let raceIntervalId = null
let stepCount = 0

//tortoise
let tortoiseWin = 0

//hare
let hareWin = 0


//start the race with a button click
startBtn.addEventListener("click", startRace)

function startRace(){
    tortoisePosition = 1
    harePosition = 1
    console.log(`Hare wins: ${hareWin}` )
    console.log(`Tortoise wins: ${tortoiseWin}` )

    messageEl.textContent = "BANG!!!!! AND THEY ARE OFF!!!!"

    startBtn.disabled = true

    //avoid double tracks
    if(raceIntervalId !== null){
        clearInterval(raceIntervalId)
    }
    //trigger the move every second (setInterval())
    raceIntervalId = setInterval(raceStep, 1000)
}

function raceStep(){
    stepCount += 1
    //move the tortoise randomly - display (math.random)
    moveTortoise()


    //move the hare randomly - display (math.random)
    moveHare()


    //fix position if they go beyound the range (0-70)
    clampPosition()

    renderTrack()

 
    //when one of the animals reach 70+, show result message
    if (tortoisePosition >= track_length || harePosition >= track_length){
        clearInterval(raceIntervalId)
        raceIntervalId = null
        showResult()
        startBtn.disabled = false
    }

    //render the track with the new positions
}

function moveTortoise(){
    let roll = Math.floor(Math.random() * 10) + 1

    if(roll >= 1 && roll <= 5){
        //1-5 fast plod
        tortoisePosition += 4
    } else if(roll >= 6 && roll <= 7){
        //6-7 slip
        tortoisePosition -= 5
    } else {
        //8 - 10 slow plod
        tortoisePosition += 1
    }
}

function moveHare(){
    let roll = Math.floor(Math.random()*10) + 1
    
    if(roll >= 1 && roll <= 2){
        //1-2 sleep - no move
        harePosition += 0
    } else if(roll >= 3 && roll <= 4){
        //3-4 big hop
        harePosition += 9
    } else if(roll === 5){
        //5 slip
        harePosition -= 12
    } else if(roll >= 6 && roll <= 8){
        //6-8 small hop
        harePosition += 1
    } else {
        //9-10 small slip
        harePosition -= 2
    }
}

function clampPosition(){
    tortoisePosition = Math.min(track_length, Math.max(1, tortoisePosition))

    harePosition = Math.min(track_length, Math.max(1, harePosition))

}

function renderTrack(){
    trackEl.innerHTML = ""
    
    for(let i = 1; i <= track_length; i++){
        let cell = document.createElement("div")
        cell.classList.add("cell")

        let isTortoiseHere = tortoisePosition === i
        let isHareHere = harePosition === i

        if(isTortoiseHere && isHareHere){
            cell.classList.add('both')
            cell.textContent = "🔥"
        } else if(isTortoiseHere){
            cell.classList.add('tortoise')
            cell.textContent = "🐢"
        }
        else if(isHareHere){
            cell.classList.add('hare')
            cell.textContent = "🐇"
        }

        trackEl.appendChild(cell)
    }
}
function showResult(){
    if(tortoisePosition >= track_length && harePosition >= track_length){
        messageEl.textContent = `IT'S A TIE!`
    } else if(tortoisePosition >= track_length){
        messageEl.textContent = `TORTOISE WINS!!! YAYAYAYAY!!!`
        tortoiseWin = tortoiseWin + 1
    } else if (harePosition >= track_length){
        messageEl.textContent = `aw shucks.. hare wins. yuck!`
        hareWin = hareWin + 1
    } else {
        messageEl.textContent = `The race has stopped?`
}
}

//render the track - initial render of the empty track

    renderTrack()