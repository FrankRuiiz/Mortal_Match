/**
 * global variables
 * @type {null}
 */
var first_card_clicked = null,
    second_card_clicked = null,
    total_possible_matches = 9,
    match_counter = 0,
    canClick = true,
    attempts = 0,
    accuracy = 0,
    games_played = 0,
    $game_area = $('.game-area'),
    images = ['kitana', 'kano', 'liuekang', 'reptile', 'scorpion', 'shangtsung', 'sonya', 'subzero', 'jax'];


/**
 * sounds - object holding game sounds
 * @type {{theme_song: Audio, jax: Audio, kano: Audio, kitana: Audio, liuekang: Audio, reptile: Audio, scorpion: Audio, shangtsung: Audio, sonya: Audio, subzero: Audio}}
 */
var sounds = {
    theme_song: new Audio('audio/theme.mp3'),
    jax: new Audio('audio/jax.mp3'),
    kano: new Audio('audio/kano.mp3'),
    kitana: new Audio('audio/kitana.mp3'),
    liuekang: new Audio('audio/liukang.mp3'),
    reptile: new Audio('audio/reptile.mp3'),
    scorpion: new Audio('audio/scorpion.mp3'),
    shangtsung: new Audio('audio/shangtsung.mp3'),
    sonya: new Audio('audio/sonya.mp3'),
    subzero: new Audio('audio/subzero.mp3')
};

/**
 * function playSound - (soundParam) plays a specific sound, depending on the soundParam passed in
 * @param soundParam
 */
function playSound(soundParam) {
    var parsedParam = soundParam.slice(7).split('.');
    console.log(parsedParam);
    switch (parsedParam[0]) {
        case 'jax':
            sounds.jax.play();
            break;
        case 'kano':
            sounds.kano.play();
            break;
        case 'kitana':
            sounds.kitana.play();
            break;
        case 'liuekang':
            sounds.liuekang.play();
            break;
        case 'reptile':
            sounds.reptile.play();
            break;
        case 'scorpion':
            sounds.scorpion.play();
            break;
        case 'shangtsung':
            sounds.shangtsung.play();
            break;
        case 'sonya':
            sounds.sonya.play();
            break;
        case 'subzero':
            sounds.subzero.play();
            break;
    }
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
function renderCards(value, index) {
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
        console.log('second card set');
        second_card_clicked = $element;
        attempts++;
        calculateAverage();
        displayStats();
        checkForMatch();
    }
}

/**
 * function checkForMatch() - compares first_card_clicked and second_card_clicked for a match
 */
function checkForMatch() {
    if (first_card_clicked.find('.back').attr('src') === second_card_clicked.find('.back').attr('src')) {
        var matchedSrc = first_card_clicked.find('.back').attr('src');
        playSound(matchedSrc);
        match_counter++;
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
    }
}

/**
 * function checkGameWin - checks to see if the match_counter is equal to the total_possible_matches
 */
function checkGameWin() {
    if (match_counter === total_possible_matches) {
        alert("you win!");  //TODO: Display win condition message
    }
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