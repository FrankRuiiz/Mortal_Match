var first_card_clicked = null,
    second_card_clicked = null,
    total_possible_matches = 9,
    match_counter = 0,
    canClick = true,
    attempts = 0,
    accuracy = 0,
    games_played = 0,
    $game_area = $('.game-area'),
    images = ['katana', 'kato', 'luekang', 'reptile', 'scorpion', 'shangtsung', 'sonja', 'subzero', 'jax'];


// object will hold game sounds
var sounds = {
    theme_song: new Audio('audio/theme.mp3'),
    jax: new Audio('audio/jax.mp3')
};


// Create game area

function createGame() {
    $game_area.empty();
    var game_images = [].concat(images).concat(images);

    for (var i = 0; i < 3; i++) {   // will shuffle the game_images array 3 times to ensure randomness
        game_images = randomize(game_images);
    }
    game_images.forEach(renderCards); // creates elements for each card and appends them to the DOM
}

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


// Game flow functionality

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

function checkForMatch() {
    if (first_card_clicked.find('.back').attr('src') === second_card_clicked.find('.back').attr('src')) {
        sounds.jax.play();
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

function checkGameWin() {
    if (match_counter === total_possible_matches) {
        alert("you win!");  //TODO: Display win condition message
    }
}

function resetCards() {
    first_card_clicked = null;
    second_card_clicked = null;
}


// Stats Functionality

function calculateAverage() {
    accuracy = Math.round((match_counter / attempts) * 100);
}

function displayStats() {
    $('.games-played .value').html(games_played);
    $('.attempts .value').html(attempts);
    $('.accuracy .value').html(accuracy + ' %');
}

function resetStats() {
    accuracy = 0;
    match_counter = 0;
    attempts = 0;
    displayStats();
}


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