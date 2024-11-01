const grid = document.getElementById('grid');
let melody = [];
let isDragging = false;

// 음 정의 (주파수)
const notes = [
    261.63, // C
    293.66, // D
    329.63, // E
    349.23, // F
    392.00, // G
    440.00, // A
    493.88  // B
];

// 그리드 생성
for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 16; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.note = i; // 각 셀에 음 번호 저장
        cell.dataset.step = j; // 각 셀에 단계 번호 저장
        cell.addEventListener('mousedown', () => {
            isDragging = true;
            toggleCell(cell);
        });
        cell.addEventListener('mouseover', () => {
            if (isDragging) {
                toggleCell(cell);
            }
        });
        cell.addEventListener('mouseup', () => {
            isDragging = false;
        });
        cell.addEventListener('mouseleave', () => {
            isDragging = false; // 마우스가 그리드 밖으로 나갈 때 드래그 종료
        });
        grid.appendChild(cell);
    }
}

// 셀 활성화/비활성화 함수
function toggleCell(cell) {
    cell.classList.toggle('active'); // 활성화/비활성화 토글
    const noteValue = cell.classList.contains('active') ? cell.dataset.note : null;
    updateMelody(cell.dataset.step, noteValue);
}

// 멜로디 업데이트
function updateMelody(step, note) {
    if (!melody[step]) melody[step] = null; // 단계가 비어있으면 초기화
    melody[step] = note; // 선택된 음으로 업데이트
}

// 음 재생 함수 (Tone.js 사용)
async function playSound(note) {
    const synth = new Tone.Synth().toDestination();
    await synth.triggerAttackRelease(notes[note], '8n'); // 8분음표 길이로 음 재생
}

// 재생 버튼 이벤트 리스너
document.getElementById('play').addEventListener('click', async () => {
    let delay = 0;
    melody.forEach((note, step) => {
        if (note !== null) {
            setTimeout(() => {
                playSound(note);
            }, delay);
            delay += 500; // 0.5초 간격으로 재생
        }
    });
});

// 중지 버튼
document.getElementById('stop').addEventListener('click', () => {
    melody = []; // 멜로디 리셋
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.remove('active')); // 모든 셀 비활성화
});
