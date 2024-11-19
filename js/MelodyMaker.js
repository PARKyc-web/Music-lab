/* Tone.js - Poly 초기화 */
// const toneSound = new Tone.PolySynth(Tone.Synth).toDestination();
const recorder = new Tone.Recorder();

// Audio Sample 구하기 >> 피아노, 기타 등등 코드 값에 맞는 소리를 구해야함.
const toneSound = new Tone.Sampler({    
    urls: {
        "C4": "../sound/piano_c4.wav",
        "D4": "../sound/piano_d4.wav",
        "E4": "../sound/piano_e4.wav",
        "F4": "../sound/piano_f4.wav",
        "G4": "../sound/piano_g4.wav",
        "A4": "../sound/piano_a4.wav",
        "B4": "../sound/piano_b4.wav",
        "C5": "../sound/piano_c5.wav"
    },
    onload: () => {
        console.log('피아노 소리가 로드되었습니다!');
    }
}).toDestination();

/* Tone.js 음 관련 변수 */
const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
let playNotes = [];
let isPlay = false;

//attach a click listener to a play button
document.querySelector("#play")?.addEventListener("click", async () => {
	await Tone.start();
	console.log("Audio is ready");
});

/* 실행관련 Function */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function play() {    
    isPlay = true;
    for (let i = 0; i < playNotes.length; i++) { // length 31
        if(!isPlay){
            break;
        }
        // let now = Tone.now();
        displayCurCell(i);

        // console.log(playNotes[i]);
        toneSound.triggerAttackRelease(playNotes[i], "1s", Tone.now()); // 8n >> 아 8등분해서 출력한다.
        
        if(isPlay && i == (playNotes.length-1)){
            i=-1;
        } // Play 중 무한루프를 위한 부분
        await delay(300);
    }
}

function displayCurCell(i){
    let preStep = (i==0) ? playNotes.length-1 : (i-1); 
    let preKey = document.querySelectorAll(".cell:not(.active).step-"+preStep); // 이전에 실행했던 부분의 열 표시 제거    
    preKey.forEach( el => {
        el.classList.remove("c-step");
    });    

    let curKey = document.querySelectorAll(".cell:not(.active).step-"+i); // 현재 실행중인 부분의 열 표시
    curKey.forEach( el => {
        el.classList.add("c-step");
    });
}

// 스톱 기능
function stop() {
    isPlay = false;
    Tone.Transport.stop();

    let key = document.querySelectorAll(".cell:not(.active)"); // 특정 키에 활성화 된 내용을 얻는다.
    key.forEach( el => {
        el.classList.remove("c-step");
    })
}

// 화면 초기화
function reset(){
    let allCell = document.querySelectorAll(".cell");    
    allCell.forEach((el) =>{
        el.classList.remove("active");
    });

    playNotes = new Array(31).fill([]);    
}



/* 예시 불러오기
1. 배경 이미지 불러오기
2. 미리 찍어둔 노트 불러오기 
3.
*/
function loadExample(num){

}

// 이벤트 리스너
/*
saveButton.addEventListener("click", saveToMP3);
upload.addEventListener("change", uploadBackground);
*/