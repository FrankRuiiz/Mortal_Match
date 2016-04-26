

var first_card_clicked = null,
    second_card_clicked = null,
    total_possible_matches = 2,
    match_counter = 0,
    canClick = true,
    attempts = 0,
    accuracy = 0,
    games_played = 0;



// Game flow functionality
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
        attempts++;
        calculateAverage();
        displayStats();
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



// Stats Section Functionality
function calculateAverage() {
    accuracy = Math.round((match_counter / attempts) * 100);
}

function displayStats() {
    $('.games-played .value').html(games_played);
    $('.attempts .value').html(attempts);
    $('.accuracy .value').html( accuracy + ' %');
}

function resetStats() {
    accuracy = 0;
    match_counter = 0;
    attempts = 0;
    displayStats();
}




$(document).ready(function(){
    displayStats();

    $('#game-area').on('click', '.card', function (e) {
        e.preventDefault();
        card_clicked($(this));
    });

    $('#resetBtn').click(function(e) {
        e.preventDefault();
        games_played++;
        resetStats();
        displayStats();
        $('.card').find('.back').show();
    });

});