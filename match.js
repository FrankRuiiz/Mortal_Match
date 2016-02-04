var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var first = null;
var second = null;
var canClick = true;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

var imgSource = [
    "images/katana.jpg",
    "images/reptile.jpg",
    "images/jax.jpg",
    "images/kato.jpg",
    "images/luekang.jpg",
    "images/scorpion.jpg",
    "images/shangtsung.jpg",
    "images/sonja.jpg",
    "images/subzero.jpg",
    "images/katana.jpg",
    "images/reptile.jpg",
    "images/jax.jpg",
    "images/kato.jpg",
    "images/luekang.jpg",
    "images/scorpion.jpg",
    "images/shangtsung.jpg",
    "images/sonja.jpg",
    "images/subzero.jpg",
];

var randomImages = [];
var imgSourceLength = imgSource.length;

function shuffleCards() {
    for (var i = 0; i < imgSourceLength; i++) {
        var currentLength = imgSource.length;
        var randomNumber = Math.floor(Math.random() * currentLength);
        var temp = (imgSource.splice(randomNumber, 1));
        randomImages.push(temp[0]);
    }
    console.log(randomImages);

    for(var j = 0; j < randomImages.length; j++) {
        $('#game-area .card:nth-child(' + (j + 1) + ')').prepend('<div class="front"><img src="' + randomImages[j] + '"></div>');
    }
}







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

            else { //if they are not we run the next block
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
    shuffleCards()
}

function set_accuracy() {
    accuracy = Math.round((matches / attempts) * 100);
}

//************************
//DOCUMENT READY FUNCTION
//************************
$(document).ready(function(){

    shuffleCards();

    $('.fatality').hide();

    display_stats();

    $('.resetBtn').click(function(){
        games_played++;
        reset_stats();
        display_stats();
        $('.fatality').hide();
        $('.card').find('.back').show().addClass('notFlipped');
    });

    //Event handler will run the function card-clicked when an element with a class of .card is clicked
    $('.card').click(function(){
        card_clicked(this);
    });
});



