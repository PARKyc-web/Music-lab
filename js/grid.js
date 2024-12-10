const grid = document.getElementById('grid');

let isDragging = false;
let lastCell = null;
let gridWidth = 32; // Grud Default Cols >> 32
const cellWidth = 60;

// 그리드 생성
function createGrid() {
    const gridCols = Math.floor(window.innerWidth / cellWidth);    
    grid.style.gridTemplateColumns = `repeat(${gridCols}, ${cellWidth}px)`;
    grid.style.gridTemplateRows = `repeat(8, ${cellWidth}px)`;    
    gridWidth = gridCols;
    grid.innerHTML = '';

    for (let i = 0; i < 8; i++) { 
        // let tone = String.fromCharCode(67+7-i);
        let tone = String.fromCharCode(((67 + 7 - i - 65) % 7) + 65);
        for (let j = 0; j < gridCols; j++) {
            const cell = document.createElement('div');            
            cell.classList.add('cell');
            cell.classList.add(tone);
            cell.classList.add('step-'+j);
            cell.setAttribute("data-tone", (7-i));
            cell.setAttribute("data-step", j);            
            cell.addEventListener('click', () => toggleCell(cell));
            grid.appendChild(cell);
        }
    }
    
    playNotes = [];
    for(let k=0; k<gridCols; k++){
        playNotes.push([]);
    }
}

/* 셀 활성화/비활성화 */
function toggleCell(cell) {
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
    displayBackBtn(type);
}
function displayBackBtn(type){
    let bg_btn = document.querySelectorAll(".list-group-item-action.panel-right");
    bg_btn.forEach(function(btn) {        
        btn.classList.remove("active");
        if(btn.classList.contains(type)){
            btn.classList.add("active");
        }
    });
}

window.addEventListener('resize', createGrid);