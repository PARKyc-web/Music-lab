/* Tone.js - Poly 초기화 */
let toneSound = null;
function changeInstrument(type){    
    toneSound = null;
    switch(type) {
        case 'synth':
            console.log("Loading Synth");
            toneSound = new Tone.PolySynth(Tone.Synth).toDestination();
            break;
        case 'piano':
            console.log("Loading Piano");
            toneSound = new Tone.Sampler({    
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
            break;            
    }
    toneSound.connect(destination);
}


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
        toneSound.triggerAttackRelease(playNotes[i], "0.8s", Tone.now()); // 8n >> 아 8등분해서 출력한다.
        
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

// MediaRecorder로 오디오 캡처
const audioContext = Tone.context;
const destination = audioContext.createMediaStreamDestination();

// MediaRecorder 객체 생성
const mediaRecorder = new MediaRecorder(destination.stream);
let chunks = [];

// 녹음 데이터 처리
mediaRecorder.ondataavailable = (event) => {
  chunks.push(event.data);
};

// 녹음 종료 후 처리
mediaRecorder.onstop = () => {
  const blob = new Blob(chunks, { type: 'audio/wav' });
  const audioUrl = URL.createObjectURL(blob);
  const audio = new Audio(audioUrl);
  // audio.play();  // 녹음된 오디오 재생
  saveAudio(blob);  // 녹음된 오디오 저장
};

// 오디오 저장 함수
function saveAudio(blob) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'recorded_audio.wav';  // 다운로드할 파일 이름 설정
  link.click();  // 파일 다운로드 트리거
}

async function recordMusic(){
    // playSound();  // 음악 시작
    mediaRecorder.start();  // 녹음 시작    
    for (let i = 0; i < 10;/*playNotes.length;*/ i++) { // length 31      
      displayCurCell(i);

      toneSound.triggerAttackRelease(playNotes[i], "1s", Tone.now());
      await delay(300);
    }      
        
    setTimeout(() => {
        mediaRecorder.stop();
    }, 2000);    
}

// 버튼 클릭 시 녹음 시작
document.getElementById('save').addEventListener('click', recordMusic);


  