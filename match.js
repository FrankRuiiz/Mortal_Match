//************************
//GLOBAL VARIABLES
//************************
var first_card_clicked = null;
var second_card_clicked = null;
//Assign the total possible matches (for this test run it is 2/ 2 pairs)
var total_possible_matches = 9;
//Tracks the number of matches during the game
var match_counter = 0;
var first = null;
var second = null;
var canClick = true;


//************************
//DOCUMENT READY FUNCTION
//************************
$(document).ready(function(){
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
        //now that we have a value other than null in both variables, we can compare to see if they are a match
        if(first_card_clicked === second_card_clicked) {
            removeNOtFlippedClass(first,second);
            //if they are we increment the match counter, and then set the two vars back to null
            match_counter++;
            resetCardsToNull();
            //if match counter and total possible matches are equal, all pairs have been matched and the game is over
            if(match_counter === total_possible_matches) {
                    $('#game-area').html('<h1 class="fatality">Fatality!</h1>');
                    return;
            }
            //if they are not we run the next block
            else {
                return;
            }
        }
        else {
            canClick = false;
            //sets the unmatched cards to show the back again after two seconds
            setTimeout(function(){
                $('.card').find('.notFlipped').show();
                canClick = true;
            },2000);
            resetCardsToNull();
            return;
        }
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

