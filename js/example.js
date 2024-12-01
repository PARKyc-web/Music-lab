const example_note_1 = [
                        ["C5", "C4"], ["B4", "D4"], ["A4", "E4"], ["G4", "F4"], ["G4", "F4"], ["A4", "E4"], ["B4", "D4"],
                        ["C5", "C4"], ["B4", "D4"], ["A4", "E4"], ["G4", "F4"], ["G4", "F4"], ["A4", "E4"], ["B4", "D4"],
                        ["C5", "C4"], ["B4", "D4"], ["A4", "E4"], ["G4", "F4"], ["G4", "F4"], ["A4", "E4"], ["B4", "D4"],
                        ["C5", "C4"], ["B4", "D4"], ["A4", "E4"], ["G4", "F4"], ["G4", "F4"], ["A4", "E4"], ["B4", "D4"],
                        ["C5", "C4"], [], []
                       ]
const example_bg_1 = "/image/super-mario.png";

const exmaple_note_2 = [];
const example_bg_2 = "";

function loadExample(num){
    var note = (num==1) ? example_note_1 : exmaple_note_2;
    var bg = (num==1) ? example_bg_1 : example_bg_2;

    note.forEach((el, idx) => {
        // el => Array
        // idx => 0, 1, 2 .... 30        
        let inner_note = el;        
        inner_note.forEach((ie, step) =>{
            let i_cell = document.querySelector('div[data-tone="'+ notes.indexOf(ie) +'"][data-step="'+ idx +'"]');
            toggleCell(i_cell);            
        });        
    });

}

