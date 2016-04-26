

var first_card_clicked = null,
    second_card_clicked = null,
    total_possible_matches = 2,
    match_counter = 0,
    canClick = true;


function card_clicked($element) {

    if(!canClick) {
        return;
    }

    $element.find('.back').hide();
    if( first_card_clicked === null ) {
        first_card_clicked = $element;
    }
    else {
        second_card_clicked = $element;
        checkForMatch();
    }
}

function checkForMatch() {
    if(first_card_clicked.find('.front img').attr('src') === second_card_clicked.find('.front img').attr('src')) {
        match_counter++;
        checkGameWin();
        resetCards();
    }
    else {
        canClick = false;
        setTimeout(function() {
            first_card_clicked.find('.back').show();
            second_card_clicked.find('.back').show();
            canClick = true;
            resetCards();
        }, 2000);
    }
}

function checkGameWin() {
    if ( match_counter === total_possible_matches ) {
        alert("you win!");  //TODO: Display win condition message
    }
}

function resetCards() {
    first_card_clicked = null;
    second_card_clicked = null;
}




















$(document).ready(function(){

    $('#game-area').on('click', '.card', function (e) {
        e.preventDefault();
        card_clicked($(this));
    });

});