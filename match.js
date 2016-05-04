/**
 * global variables
 * @type {null}
 */
var first_card_clicked = null,
    second_card_clicked = null,
    total_possible_matches = 9,
    win = false,
    match_counter = 0,
    canClick = true,
    attempts = 0,
    accuracy = 0,
    games_played = 0,
    $game_area = $('.game-area'),
    images = ['nightwolf', 'kano', 'liuekang', 'reptile', 'scorpion', 'shangtsung', 'sonya', 'subzero', 'jax'];
    //images = ['nightwolf', 'kano'];

/**
 * sounds - object holding game sounds
 * @type {{theme_song: Audio, jax: Audio, kano: Audio, nightwolf: Audio, liuekang: Audio, reptile: Audio, scorpion: Audio, shangtsung: Audio, sonya: Audio, subzero: Audio}}
 */
var sounds = {
    theme_song: new Audio('audio/theme.mp3'),
    jax: new Audio('audio/jax.mp3'),
    kano: new Audio('audio/kano.mp3'),
    nightwolf: new Audio('audio/nightwolf.mp3'),
    liuekang: new Audio('audio/liukang.mp3'),
    reptile: new Audio('audio/reptile.mp3'),
    scorpion: new Audio('audio/scorpion.mp3'),
    shangtsung: new Audio('audio/shangtsung.mp3'),
    sonya: new Audio('audio/sonya.mp3'),
    subzero: new Audio('audio/subzero.mp3'),
    win: new Audio('audio/excellent.wav')
};

/**
 * function playSound - (soundParam) plays a specific sound, depending on the soundParam passed in
 * @param soundParam
 */
function playSound(soundParam) {
        sounds[soundParam].play();
}

/** Game Creation **/

/**
 * function createGame - Builds game_images array, sends it to be randomized, and then calls render cards for each item in the array
 */
function createGame() {
    $game_area.empty();
    var game_images = [].concat(images).concat(images);

    for (var i = 0; i < 3; i++) {   // will shuffle the game_images array 3 times to ensure randomness
        game_images = randomize(game_images);
    }
    game_images.forEach(renderCards); // creates elements for each card and appends them to the DOM
}

/**
 * function renderCards(value, index) - DOM creation for the game cards, uses value to set the image src attribute, and index as an id for later game flow/card comparison
 * @param value
 * @param index
 */
function renderCards(value, index, array) {

    var $cardContainer = $('<div>', {
        class: 'card-container'
    });
    var $card = $('<div>', {
        class: 'card'
    }).appendTo($cardContainer);
    var $cardBack = $('<img>', {
        class: 'back',
        src: 'images/' + value + '.jpg'
    }).appendTo($card);
    var $cardFront = $('<img>', {
        class: 'front',
        src: 'images/mkcardback.jpg',
        id: index
    }).appendTo($card);
    $cardContainer.appendTo($game_area);

    // setInterval(function() {
    //     $cardContainer.each(function() {
    //         $(this).appendTo($game_area).fadeIn('slow');
    //     });
    //
    // }, 1000);
    $.each($('.card-container'), function(i, card){
        card = $(card);
        card.hide();
        setTimeout(function(){
            card.fadeIn('slow');
            // }, 450);
        },200 + ( i * 200 ));
    });

}

/**
 * function randomize(arr) - Fisher Yates alg. used to make the image_array random
 * @param arr
 * @returns {*}
 */
function randomize(arr) {
    var counter = arr.length;
    while (counter > 0) {
        var index = Math.floor(Math.random() * counter);
        counter--;
        var temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }
    return arr;
}


/** Game Flow **/

/**
 * function card_clicked($element) -  Primary function is to set the first_card_clicked and second_card_clicked variables to $element (jQuery element)
 * @param $element
 */
function card_clicked($element) {
    console.log($element.find('.front').attr('id'));

    sounds.theme_song.play();
    sounds.theme_song.volume = 0.15;

    if (!canClick) {
        return;
    }

    $element.addClass('flipped');

    if (first_card_clicked === null) {
        first_card_clicked = $element;
    }
    else if (first_card_clicked.find('.front').attr('id') != $element.find('.front').attr('id')){
        second_card_clicked = $element;
        attempts++;
        displayStats();
        checkForMatch();
    }
}

/**
 * function checkForMatch() - compares first_card_clicked and second_card_clicked for a match
 */
function checkForMatch() {
    if (first_card_clicked.find('.back').attr('src') === second_card_clicked.find('.back').attr('src')) {
        first_card_clicked.add(second_card_clicked).fadeOut('slow');
        var matchedSrc = first_card_clicked.find('.back').attr('src');
        matchedSrc = matchedSrc.slice(7).split('.');
        console.log('matched src',matchedSrc);
        playSound(matchedSrc[0]);
        match_counter++;
        calculateAverage();
        checkGameWin();
        resetCards();
    }
    else {
        canClick = false;
        setTimeout(function () {
            first_card_clicked.removeClass('flipped');
            second_card_clicked.removeClass('flipped');
            resetCards();
            canClick = true;
        }, 1000);
        calculateAverage();
    }
}

/**
 * function checkGameWin - checks to see if the match_counter is equal to the total_possible_matches
 */
function checkGameWin() {
    if (match_counter === total_possible_matches) {
        win = true;
        setTimeout(function() {
        winMessage(win);
        }, 400);
    }
}

function winMessage(win) {
    $game_area.empty();
    var $div = $('<div>', {
       class: 'win-lose'
    }).hide();
    var $h1 = $('<h1>');

    if(win) {
        $h1.text('Excellent!');
        $div.append($h1);
        setTimeout(function() {
            $div.appendTo($game_area).fadeIn();
            playSound('win');
        }, 1200);
    }
    // else{  // TODO: requres an added feature where the player has a limited amount of  tries or life
    //     $h1.text('Fatality!');
    //     $div.append($h1);
    //     $div.appendTo($game_area);
    // }
}

/**
 * function resetCards - resets cards back to null
 */
function resetCards() {
    first_card_clicked = null;
    second_card_clicked = null;
}


/** Stats Functionality **/

/**
 * function calculateAverage - calculates average 
 */
function calculateAverage() {
    accuracy = Math.round((match_counter / attempts) * 100);
}

/**
 * function displayStats - updates the DOM statistics elements 
 */
function displayStats() {
    $('.games-played .value').html(games_played);
    $('.attempts .value').html(attempts);
    $('.accuracy .value').html(accuracy + ' %');
}

/**
 * function resetStats - sets stats section back to initial value 0
 */
function resetStats() {
    accuracy = 0;
    match_counter = 0;
    attempts = 0;
    displayStats();
}

/** Document Ready **/

$(document).ready(function () {
    displayStats();
    createGame();

    $game_area.on('click', '.card', function (e) {
        e.preventDefault();
        card_clicked($(this));
    });

    $('#resetBtn').click(function (e) {
        e.preventDefault();
        games_played++;
        createGame();
        resetStats();
        displayStats();
    });

});