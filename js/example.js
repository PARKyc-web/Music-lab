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
    var note = (num==1) ? example_note_1 : exmaple_note_2;
    var bg = (num==1) ? example_bg_1 : example_bg_2;
    var ge = document.getElementById('grid');

    ge.style.backgroundImage = 'url("'+ bg +'")';
    reset();

    for(let idx = 0; idx<playNotes.length; idx++){
        note[idx]
    }

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

