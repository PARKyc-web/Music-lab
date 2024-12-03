const example_note_1 = [
                        ["C5", "C4"], ["B4", "D4"], ["A4", "E4"], ["G4", "F4"], ["G4", "F4"], ["A4", "E4"], ["B4", "D4"],
                        ["C5", "C4"], ["B4", "D4"], ["A4", "E4"], ["G4", "F4"], ["G4", "F4"], ["A4", "E4"], ["B4", "D4"],
                        ["C5", "C4"], ["B4", "D4"], ["A4", "E4"], ["G4", "F4"], ["G4", "F4"], ["A4", "E4"], ["B4", "D4"],
                        ["C5", "C4"], ["B4", "D4"], ["A4", "E4"], ["G4", "F4"], ["G4", "F4"], ["A4", "E4"], ["B4", "D4"],
                        ["C5", "C4"], [], []
                       ]
const example_bg_1 = "./image/super-mario.png";

const exmaple_note_2 = [
                        ["G4", "F4"], ["A4", "E4"], ["B4", "D4"], ["C5", "C4"], ["B4", "D4"], ["A4", "E4"], ["G4", "F4"],
                        ["F4"], ["G4", "E4"], ["A4", "D4"], ["G4", "E4"], ["A4", "F4", "C4"], ["B4", "E4"], ["C5", "D4"],
                        ["B4", "C4"], ["A4", "D4"], ["G4", "C4"], ["A4", "D4"], ["B4", "E4"], ["C5", "D4"], ["B4", "E4"],
                        ["A4", "F4", "C4"], ["G4", "E4"], ["A4", "F4"], ["B4", "G4", "C4"], ["A4"], ["G4"], ["B4", "F4", "D4"],
                        ["G4", "E4"], ["C5", "C4"], ["A4", "D4"]
                       ];
const example_bg_2 = "./image/super-mario2.jpg";

function loadExample(num){
    // 숫자가 몇개가 되던간에 숫자를 추가해서 만들 수 있도록
    // 그리고 example_note를 동적으로 추가할 수 있도록 하자.
    // 추가만 하면 자동으로 버튼도 생기고 >> 흠... 나중에 추가하기로 하자.
    // playNotes의 숫자가 동적으로 변경되는데? 어떻게 예시를 등록가능하지?
    
    var note = (num==1) ? example_note_1 : exmaple_note_2;
    var bg = (num==1) ? example_bg_1 : example_bg_2;
    var ge = document.getElementById('grid');

    ge.style.backgroundImage = 'url("'+ bg +'")';
    reset();

    note.forEach((el, idx) => {
        // el => Array
        // idx => 0, 1, 2 .... 30        
        let inner_note = el;        
        inner_note.forEach((ie, step) =>{
            let i_cell = document.querySelector('div[data-tone="'+ notes.indexOf(ie) +'"][data-step="'+ idx +'"]');
            toggleCell(i_cell);            
        });        
    });

    if(num==2){
        backgrounType('full');
    }
}

