const grid = document.getElementById('grid');
const playButton = document.getElementById('play');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

const polySynth = new Tone.PolySynth(Tone.Synth).toDestination();

const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
let playNotes = [];

//attach a click listener to a play button
document.querySelector("#play")?.addEventListener("click", async () => {
	await Tone.start();
	console.log("audio is ready");
});

// 그리드 생성
function createGrid() {
    for (let i = 0; i < 8; i++) {  
        // let tone = String.fromCharCode(67+7-i);
        let tone = String.fromCharCode(((67 + 7 - i - 65) % 7) + 65);
        for (let j = 0; j < 31; j++) {
            const cell = document.createElement('div');            
            cell.classList.add('cell');
            cell.classList.add(tone);
            cell.classList.add('step-'+j);
            cell.setAttribute("data-tone", (7-i));
            cell.setAttribute("data-step", j);            
            cell.addEventListener('click', () => toggleCell(cell, i, j));
            grid.appendChild(cell);                    
        }
    }
    
    for(let k=0; k<31; k++){
        playNotes.push([]);
    }
}

// 셀 활성화/비활성화
function toggleCell(cell, row, col) {
    cell.classList.toggle('active');
    let stepInfo = cell.getAttribute("data-step");
    
    let activeKey = document.querySelectorAll(".cell.active.step-"+stepInfo); // 특정 키에 활성화 된 내용을 얻는다.     
    let inner_note = [];
    for(var i=0; i<activeKey.length; i++){
        let tone = activeKey[i].getAttribute("data-tone");
        inner_note.push(notes[tone]);
    }        
    playNotes[stepInfo] = inner_note;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function play() {        
    for (let i = 0; i < playNotes.length; i++) {        
        // let now = Tone.now();
        console.log(playNotes[i]);
        polySynth.triggerAttackRelease(playNotes[i], "8n", Tone.now());
        await delay(300);
    }
}

// 스톱 기능
function stop() {    
    Tone.Transport.stop();
}

// 화면 초기화
function reset(){
    let allCell = document.querySelectorAll(".cell");    
    allCell.forEach((el) =>{
        el.classList.remove("active");
    });

    playNotes = [];
    for(let k=0; k<31; k++){
        playNotes.push([]);
    }
}

// 이벤트 리스너
playButton.addEventListener("click", play);
stopButton.addEventListener("click", stop);
resetButton.addEventListener("click", reset);
createGrid(); // 그리드 생성
