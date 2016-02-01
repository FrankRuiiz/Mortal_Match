//************************
//GLOBAL VARIABLES
//************************
var first_card_clicked = null;
var second_card_clicked = null;
//Assign the total possible matches 118/2 = 9
var total_possible_matches = 9;
//Tracks the number of matches during the game
var first = null;
var second = null;
var canClick = true;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;



//************************
//DOCUMENT READY FUNCTION
//************************
$(document).ready(function(){
    display_stats();

    $('.resetBtn').click(function(){
        games_played++;
        reset_stats();
        display_stats();
        $('.fatality').hide();
        $('.card').find('.back').show();
    });

    //Event handler will run the function card-clicked when an element with a class of .card is clicked
    $('.card').click(function(){
        card_clicked(this);
    });
});


//Function to execute when a card is clicked
function card_clicked(element){

    if(!canClick) {
        return;
    }
    //The element card's back image is set to hidden when clicked
    $(element).find('.back').hide();

    //check to see if the fist card clicked var is set to null
    if(first_card_clicked === null){
        //if it is, it is set to the element's img src attribute value
        first_card_clicked = $(element).find('img').attr('src');
        first = $(element).find('.back');
        return;
    }
    else {
        //if it is not set to null, the second card var gets the img src attr value
        second_card_clicked = $(element).find('img').attr('src');
        second = $(element).find('.back');
        attempts++;
        //now that we have a value other than null in both variables, we can compare to see if they are a match
        if(first_card_clicked === second_card_clicked) {
            removeNOtFlippedClass(first,second);
            //if they are we increment the match counter, and then set the two vars back to null
            matches++;
            set_accuracy();
            resetCardsToNull();
            //if match counter and total possible matches are equal, all pairs have been matched and the game is over
            if(matches === total_possible_matches) {
                $('.fatality').show();
                return;
            }
            //if they are not we run the next block
            else {
            }
        }
        else {
            set_accuracy();
            canClick = false;
            //sets the unmatched cards to show the back again after two seconds
            setTimeout(function(){
                $('.card').find('.notFlipped').show();
                canClick = true;
            },2000);
            resetCardsToNull();
        }

        display_stats();
    }
}

function resetCardsToNull() {
    first_card_clicked = null;
    second_card_clicked = null;
}

function removeNOtFlippedClass(first,second) {
    $(first).removeClass('notFlipped');
    $(second).removeClass('notFlipped');
}

function display_stats() {
    $('.games-played .value').text(games_played);
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(accuracy + "%");
}


function reset_stats() {
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();
}

function set_accuracy() {
    accuracy = Math.round((matches / attempts) * 100);
}



