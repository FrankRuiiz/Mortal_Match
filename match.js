
var Mortal_Match = function() {
    var self = this;
    this.theme_music = new Audio('audio/theme.mp3');
    this.first_card_clicked = null;
    this.second_card_clicked = null;
    this.total_possible_matches = 9;
    this.win = false;
    this.match_counter = 0;
    this.canClick = true;
    this.attempts = 0;
    this.accuracy = 0;
    this.games_played = 0;
    this.$game_area = $('.game-area');
    this.images = ['nightwolf', 'kano', 'liuekang', 'reptile', 'scorpion', 'shangtsung', 'sonya', 'subzero', 'jax'];

    this.init = function() {
        this.displayStats();
        this.createGame();
    };

    this.displayStats = function() {
        $('.games-played .value').html(this.games_played);
        $('.attempts .value').html(this.attempts);
        $('.accuracy .value').html(this.accuracy + '%');
    };

    this.createGame = function() {
        this.$game_area.empty();
        var game_images = [].concat((this.images).concat(this.images));

        for( var i=0; i<3; i+=1 ) {
            game_images = this.randomize(game_images);
        }
        game_images.forEach(this.renderCards); // creates elements for each card and appends them to the DOM
    };

    this.renderCards = function(value, index) {
        var mk_card = new Card(value, index, self);
    };

    this.randomize = function(arr) {
        var counter = arr.length;
        while (counter > 0) {
            var index = Math.floor(Math.random() * counter);
            counter--;
            var temp = arr[counter];
            arr[counter] = arr[index];
            arr[index] = temp;
        }
        return arr;
    };

    this.cardClicked = function($elem) {
        console.log($elem.find('.front').attr('id'));

        self.theme_music.play();
        self.theme_music.volume = 0.15;

        if (!this.canClick) {
            return;
        }

        $elem.addClass('flipped');

        if (this.first_card_clicked === null) {
            this.first_card_clicked = $elem;
        }
        else if (this.first_card_clicked.find('.front').attr('id') != $elem.find('.front').attr('id')){
            this.second_card_clicked = $elem;
            this.attempts++;
            this.displayStats();
            this.checkForMatch();
        }
    }


};









var Card = function(value, index, parent) {
    this.createCard = function() {
        var $cardContainer = $('<div>', {
            class: 'card-container'
        });
        var $card = $('<div>', {
            class: 'card',
            click: function() {
                parent.cardClicked($(this));
            }
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
        $cardContainer.appendTo(parent.$game_area);

        this.renderCard();
    };

    this.renderCard = function() {
        $.each($('.card-container'), function(i, card){
            var currentCard = $(card).hide();
            setTimeout(function(){
                currentCard.fadeIn('slow');
            },200 + ( i * 200 ));
        });
    };

    this.createCard();
};





















$(document).ready(function() {
    var game = new Mortal_Match();
    game.init();
});





































/**
 * global variables
 * @type {null}
 */
// var first_card_clicked = null,
//     second_card_clicked = null,
//     total_possible_matches = 9,
//     win = false,
//     match_counter = 0,
//     canClick = true,
//     attempts = 0,
//     accuracy = 0,
//     games_played = 0,
//     $game_area = $('.game-area'),
//     images = ['nightwolf', 'kano', 'liuekang', 'reptile', 'scorpion', 'shangtsung', 'sonya', 'subzero', 'jax'];
//     images = ['nightwolf', 'kano'];  // Test Array

/**
 * sounds - object holding game sounds
 * @type {{theme_song: Audio, jax: Audio, kano: Audio, nightwolf: Audio, liuekang: Audio, reptile: Audio, scorpion: Audio, shangtsung: Audio, sonya: Audio, subzero: Audio}}
 */
// var sounds = {
//     jax: new Audio('audio/jax.mp3'),
//     kano: new Audio('audio/kano.mp3'),
//     nightwolf: new Audio('audio/nightwolf.mp3'),
//     liuekang: new Audio('audio/liukang.mp3'),
//     reptile: new Audio('audio/reptile.mp3'),
//     scorpion: new Audio('audio/scorpion.mp3'),
//     shangtsung: new Audio('audio/shangtsung.mp3'),
//     sonya: new Audio('audio/sonya.mp3'),
//     subzero: new Audio('audio/subzero.mp3'),
//     win: new Audio('audio/excellent.wav'),
//     bad1:new Audio('audio/bad1.mp3'),
//     bad2:new Audio('audio/bad2.mp3'),
//     bad3:new Audio('audio/bad3.mp3'),
//     bad4:new Audio('audio/bad4.mp3'),
//     bad5:new Audio('audio/laugh.wav')
// };
//
// // var theme_music = new Audio('audio/theme.mp3');
//
// /**
//  * function playSound - (soundParam) plays a specific sound, depending on the soundParam passed in
//  * @param soundParam
//  */
// function playSound(soundParam) {
//         sounds[soundParam].play();
// }
//
// /** Game Creation **/
//
/**
 * function createGame - Builds game_images array, sends it to be randomized, and then calls render cards for each item in the array
 */
// function createGame() {
//     $game_area.empty();
//     var game_images = [].concat(images).concat(images);
//
//     for (var i = 0; i < 3; i++) {   // will shuffle the game_images array 3 times to ensure randomness
//         game_images = randomize(game_images);
//     }
//     game_images.forEach(renderCards); // creates elements for each card and appends them to the DOM
// }

/**
 * function renderCards(value, index) - DOM creation for the game cards, uses value to set the image src attribute, and index as an id for later game flow/card comparison
 * @param value
 * @param index
 */
// function renderCards(value, index) {
//
//     var $cardContainer = $('<div>', {
//         class: 'card-container'
//     });
//     var $card = $('<div>', {
//         class: 'card'
//     }).appendTo($cardContainer);
//     var $cardBack = $('<img>', {
//         class: 'back',
//         src: 'images/' + value + '.jpg'
//     }).appendTo($card);
//     var $cardFront = $('<img>', {
//         class: 'front',
//         src: 'images/mkcardback.jpg',
//         id: index
//     }).appendTo($card);
//     $cardContainer.appendTo($game_area);
//
//     $.each($('.card-container'), function(i, card){
//         var currentCard = $(card).hide();
//         setTimeout(function(){
//             currentCard.fadeIn('slow');
//         },200 + ( i * 200 ));
//     });
//
// }

/**
 * function randomize(arr) - Fisher Yates alg. used to make the image_array random
 * @param arr
 * @returns {*}
 */
// function randomize(arr) {
//     var counter = arr.length;
//     while (counter > 0) {
//         var index = Math.floor(Math.random() * counter);
//         counter--;
//         var temp = arr[counter];
//         arr[counter] = arr[index];
//         arr[index] = temp;
//     }
//     return arr;
// }
//
//
// /** Game Flow **/
//
// /**
//  * function card_clicked($element) -  Primary function is to set the first_card_clicked and second_card_clicked variables to $element (jQuery element)
//  * @param $element
//  */
// function card_clicked($element) {
//     console.log($element.find('.front').attr('id'));
//
//     theme_music.play();
//     theme_music.volume = 0.15;
//
//     if (!canClick) {
//         return;
//     }
//
//     $element.addClass('flipped');
//
//     if (first_card_clicked === null) {
//         first_card_clicked = $element;
//     }
//     else if (first_card_clicked.find('.front').attr('id') != $element.find('.front').attr('id')){
//         second_card_clicked = $element;
//         attempts++;
//         displayStats();
//         checkForMatch();
//     }
// }
//
// /**
//  * function checkForMatch() - compares first_card_clicked and second_card_clicked for a match
//  */
// function checkForMatch() {
//     if (first_card_clicked.find('.back').attr('src') === second_card_clicked.find('.back').attr('src')) {
//         match_counter++;
//         first_card_clicked.add(second_card_clicked).fadeOut('slow');
//         var matchedSrc = first_card_clicked.find('.back').attr('src');
//         matchedSrc = matchedSrc.slice(7).split('.');
//         playSound(matchedSrc[0]);
//         calculateAverage();
//         checkGameWin();
//         resetCards();
//     }
//     else {
//         var randomUnmatched = randomize(['bad1', 'bad2', 'bad3', 'bad4', 'bad5']);
//         playSound(randomUnmatched[0]);
//         console.log(randomUnmatched);
//         canClick = false;
//         setTimeout(function () {
//             first_card_clicked.removeClass('flipped');
//             second_card_clicked.removeClass('flipped');
//             resetCards();
//             canClick = true;
//         }, 1000);
//         calculateAverage();
//     }
// }
//
// /**
//  * function checkGameWin - checks to see if the match_counter is equal to the total_possible_matches
//  */
// function checkGameWin() {
//     if (match_counter === total_possible_matches) {
//         win = true; // variable doesn't matter right now since the user currently does not lose
//         stopThemeMusic();
//         setTimeout(function() {
//         winMessage(win);
//         }, 400);
//     }
// }
//
// function winMessage(win) {
//     $game_area.empty();
//     var $div = $('<div>', {
//        class: 'win-lose'
//     }).hide();
//     var $h1 = $('<h1>');
//
//     if(win) {
//         $h1.text('Excellent!');
//         $div.append($h1);
//         setTimeout(function() {
//             $div.appendTo($game_area).fadeIn();
//             playSound('win');
//         }, 1200);
//     }
//     // else{  // TODO: requres an added feature where the player has a limited amount of  tries or life
//     //     $h1.text('Fatality!');
//     //     $div.append($h1);
//     //     $div.appendTo($game_area);
//     // }
// }
//
// /**
//  * function resetCards - resets cards back to null
//  */
// function resetCards() {
//     first_card_clicked = null;
//     second_card_clicked = null;
// }
//
//
// /** Stats Functionality **/
//
// /**
//  * function calculateAverage - calculates average
//  */
// function calculateAverage() {
//     accuracy = Math.round((match_counter / attempts) * 100);
// }
//
// /**
//  * function displayStats - updates the DOM statistics elements
//  */
// function displayStats() {
//     $('.games-played .value').html(games_played);
//     $('.attempts .value').html(attempts);
//     $('.accuracy .value').html(accuracy + '%');
// }
//
// /**
//  * function resetStats - sets stats section back to initial value 0
//  */
// function resetStats() {
//     accuracy = 0;
//     match_counter = 0;
//     attempts = 0;
//     displayStats();
// }
//
// function stopThemeMusic() {
//     theme_music.pause();
//     theme_music.currentTime = 0;
// }
//
// /** Document Ready **/
//
// $(document).ready(function () {
//     displayStats();
//     createGame();
//
//     $game_area.on('click', '.card', function (e) {
//         e.preventDefault();
//         card_clicked($(this));
//     });
//
//     $('#resetBtn').on('click', function (e) {
//         e.preventDefault();
//         stopThemeMusic();
//         games_played++;
//         createGame();
//         resetStats();
//         displayStats();
//     });
//
// });