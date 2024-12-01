const grid = document.getElementById('grid');

/* Drag 관련 변수 */
let isDragging = false;
let lastCell = null;

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

/* 셀 활성화/비활성화 */
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


/* Dragging 하는 중에 실행되는 Function */
function handleMouseMove(event) {    
    if (isDragging) {
        // 드래그 중인 경우, 현재 마우스 위치에 해당하는 셀을 찾기
        console.log("handleMouseMove");
        const cell = getCellUnderMouse(event);
        if (cell && cell !== lastCell) {
            toggleCell(cell, cell.getAttribute('data-tone'), cell.getAttribute('data-step'));
            lastCell = cell;  // 마지막 셀 업데이트
        }
    }
}

// throttle 함수 구현 (기본적인 스로틀링)
function throttle(fn, delay) {
    let lastTime = 0;
    return function() {
        const now = Date.now();
        if (now - lastTime >= delay) {
            lastTime = now;
            fn.apply(this, arguments);
        }
    }
}
const throttledHandleMouseMove = throttle(handleMouseMove, 100);

/* Drag를 시작했을 때 실행되는 Function */
function startDragging(event) {    
    const cell = getCellUnderMouse(event);
    if (cell) {
        console.log("startDragging");
        toggleCell(cell, cell.getAttribute('data-tone'), cell.getAttribute('data-step'));
        isDragging = true;
        lastCell = cell;  // 마지막 셀 초기화
    }
}

/* Drag가 멈췄을때 */
function stopDragging() {
    console.log("stopDragging");
    isDragging = false;
    lastCell = null;  // 마지막 셀 초기화
}

function getCellUnderMouse(event) {
    const rect = grid.getBoundingClientRect(); // grid의 위치와 크기
    const x = event.clientX - rect.left; // 마우스 X 좌표
    const y = event.clientY - rect.top;  // 마우스 Y 좌표

    // 그리드의 셀 크기 (60px)와 그리드의 배치 구조에 맞춰서 셀의 인덱스를 계산
    const col = Math.floor(x / 60); // 셀의 열 인덱스 (60px 간격)
    const row = Math.floor(y / 60); // 셀의 행 인덱스 (60px 간격)

    // 셀 인덱스가 그리드 범위 내에 있는지 확인
    console.log(document.querySelector(`.cell.step-${col}.cell:nth-child(${row + 1})`));
    if (col >= 0 && col < 31 && row >= 0 && row < 8) {        
        // .step-와 .cell 클래스를 가진 셀
        const cell = document.querySelector(`.cell.step-${col}.cell:nth-child(${row + 1})`);
        return cell;
    }
   
    return null; // 범위를 벗어났다면 null을 반환
}

/* 배경 변경 */
function uploadBackground(event){
    // 파일 선택 시 이벤트 처리    
    const file = event.target.files[0]; // 사용자가 선택한 파일
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            // 파일을 읽은 후 배경 이미지로 설정
            grid.style.backgroundImage = `url(${e.target.result})`;
            grid.style.backgroundSize = 'cover';
            grid.style.backgroundPosition = 'center center';
        };

        // 파일 읽기
        reader.readAsDataURL(file);
    }
    reset();
}

function backgrounType(type){
    var ge = document.getElementById('grid');

    if(type == 'part'){
        ge.style.backgroundSize = 'cover';
    } else if (type == 'full'){
        ge.style.backgroundSize = 'contain';
    }    
}


// Drag Function
/*
grid.addEventListener('mousedown', startDragging);
grid.addEventListener('mousemove', throttledHandleMouseMove);
grid.addEventListener('mouseup', stopDragging);
grid.addEventListener('mouseleave', stopDragging); // 마우스가 그리드 밖으로 나가면 드래그 종료
*/
