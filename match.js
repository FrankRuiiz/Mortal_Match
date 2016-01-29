
//Global variables
var first_card_clicked = null;
var second_card_clicked = null;
//Assign the total possible matches (for this test run it is 2/ 2 pairs)
var total_possible_matches = 2;
//Tracks the number of matches during the game
var match_counter = 0;



$(document).ready(function(){

    //Event handler will run the function card-clicked when an element with a class of .card is clicked
    $('.card').click(function(){
        card_clicked(this);
    });
});


//Function to execute when a card is clicked
function card_clicked(element){
    $(element).find('.back').hide();
    if(first_card_clicked === null){
        first_card_clicked = $(element).find('img').attr('src');
        console.log(first_card_clicked);
        return;
    }
    else {
        second_card_clicked = $(element).find('img').attr('src');
            if(first_card_clicked === second_card_clicked) {
                ++match_counter;
                first_card_clicked = null;
                second_card_clicked = null;
                if(match_counter === total_possible_matches) {
                    alert('you win!');
                }
                else {
                    return;
                }
            }
            else {
                setTimeout(function(){
                    $('.card').find('.back').show();},2000);
                    first_card_clicked = null;
                    second_card_clicked = null;
                    return;
            }
    }


}

