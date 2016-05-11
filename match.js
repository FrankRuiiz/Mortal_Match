/**
 * Mortal_Match Object contains all properties and methods for the game
 * @constructor
 */
var Mortal_Match = function() {
    var self = this;
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
    //this.images = ['nightwolf', 'kano'];  // Test array
    this.theme_music = new Audio('audio/theme.mp3');  // Main game song
    this.soundFx = {                                  // Game sound fx
        jax: new Audio('audio/jax.mp3'),
        kano: new Audio('audio/kano.mp3'),
        nightwolf: new Audio('audio/nightwolf.mp3'),
        liuekang: new Audio('audio/liukang.mp3'),
        reptile: new Audio('audio/reptile.mp3'),
        scorpion: new Audio('audio/scorpion.mp3'),
        shangtsung: new Audio('audio/shangtsung.mp3'),
        sonya: new Audio('audio/sonya.mp3'),
        subzero: new Audio('audio/subzero.mp3'),
        win: new Audio('audio/excellent.wav'),
        bad1:new Audio('audio/bad1.mp3'),
        bad2:new Audio('audio/bad2.mp3'),
        bad3:new Audio('audio/bad3.mp3'),
        bad4:new Audio('audio/bad4.mp3'),
        bad5:new Audio('audio/laugh.wav')
    };

    /**
     * init - Initializes the game on page load
     */
    this.init = function() {
        this.displayStats();
        this.createGame();
    };

    /**
     * createGame - clears out the game area, builds a new game_images array
     */
    this.createGame = function() {
        this.$game_area.empty();
        var game_images = [].concat((this.images).concat(this.images));

        for( var i=0; i<3; i+=1 ) {
            game_images = this.randomize(game_images);
        }
        game_images.forEach(this.createCards); // creates elements for each card and appends them to the DOM
    };

    /**
     * randomize - Standard function used to make arrays random. Used to randomize game_images and also unmatched images arrays
     * @param arr
     * @returns {*}
     */
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


    /**
     * renderCards - After game_array has been randomized, this function uses the Card constructor to create the game card objects
     * @param value
     * @param index
     */
    this.createCards = function(value, index) {
        new Card(value, index, self);
    };

    /**
     * displayStats - Updates DOM Stat values
     */
    this.displayStats = function() {
        $('.games-played .value').html(this.games_played);
        $('.attempts .value').html(this.attempts);
        $('.accuracy .value').html(this.accuracy + '%');
    };

    /**
     * calculateAverage - Standard math for computing the average based on the match_counter and user attempts
     */
    this.calculateAverage = function() {
        this.accuracy = Math.round((this.match_counter / this.attempts) * 100);
    };

    /**
     * cardClicked - Handles the click events passed from the card being clicked and assigns them to the appropriate variables for comparison
     * @param $elem
     */
    this.cardClicked = function($elem) {
        self.theme_music.play();
        self.theme_music.volume = 0.15;

        if (!this.canClick) {  // prevents the user from clicking more than 2 cards
            return;
        }

        $elem.addClass('flipped');

        if (this.first_card_clicked === null) {
            this.first_card_clicked = $elem;  // sets the first card to $elem
        }
        else if (this.first_card_clicked.find('.front').attr('id') != $elem.find('.front').attr('id')){  // compares id's to ensure that the same card isn't clicked
            this.second_card_clicked = $elem;  // sets the second card to $elem
            this.attempts++;
            this.displayStats();
            this.checkForMatch();
        }
    };

    /**
     * checkForMatch - once the two cards are clicked, this function is called to see if te card faces are a match
     */
    this.checkForMatch = function() {
        if (this.first_card_clicked.find('.back').attr('src') === this.second_card_clicked.find('.back').attr('src')) { // a match is determined by comparing the src values
            this.match_counter++;
            this.first_card_clicked.add(this.second_card_clicked).fadeOut('slow');
            var matchedSrc = this.first_card_clicked.find('.back').attr('src');
            matchedSrc = matchedSrc.slice(7).split('.');
            this.playSound(matchedSrc[0]);  // plays the matched card's sound for a good match
            this.calculateAverage();
            this.checkForWin(); // checks if all cards have been matched
            this.resetCards();
        }
        else {
            var randomUnmatched = this.randomize(['bad1', 'bad2', 'bad3', 'bad4', 'bad5']);
            this.playSound(randomUnmatched[0]);  // plays a random sound for a bad match
            this.canClick = false;
            setTimeout(function () {
                self.first_card_clicked.removeClass('flipped');
                self.second_card_clicked.removeClass('flipped');
                self.resetCards();
                self.canClick = true;
            }, 1000);
            this.calculateAverage();
        }
    };

    /**
     * checkForWin - if match_counter and the total_possible_matches is equal, the game is over and displays a win message
     */
    this.checkForWin = function() {
        if (this.match_counter === this.total_possible_matches) {
            this.win = true; // variable doesn't matter right now since the user currently does not lose
            this.stopThemeMusic();
            setTimeout(function() {
                self.winMessage(self.win);
            }, 400);
        }
    };

    /**
     * winMessage - currenly the user cannot lose the game so when all cards are matched this function will display the winning message
     * @param win
     */
    this.winMessage = function(win) {
        this.$game_area.empty();
        var $div = $('<div>', {
            class: 'win-lose'
        }).hide();
        var $h1 = $('<h1>');
        var $p = $('<p>');

        if(this.win) {
            $h1.text('Excellent!');
            $p.text('Press RESTART to play again!');
            $div.append($p, $h1);
            setTimeout(function() {
                $div.appendTo(self.$game_area).fadeIn();
                self.playSound('win');
            }, 1200);
        }
        // else{  // TODO: requires an added feature where the player can lose the game
        //     $h1.text('Fatality!');
        //     $div.append($h1);
        //     $div.appendTo($game_area);
        // }
    };

    /**
     * playSound - Dynamically plays sounds for cards matched, and not matched
     * @param soundParam
     */
    this.playSound = function(soundParam) {
        this.soundFx[soundParam].play();
    };

    /**
     * stopThemMusic - Stops game theme music
     */
    this.stopThemeMusic = function() {
        this.theme_music.pause();
        this.theme_music.currentTime = 0;
    };

    /**
     * resetStats - Sets the statistics elements to their initial state on page load and game reset
     */
    this.resetStats = function() {
        this.accuracy = 0;
        this.match_counter = 0;
        this.attempts = 0;
        this.displayStats();
    };

    /**
     * resetCards - Sets card variables to null after matches, and none matches
     */
    this.resetCards = function() {
        this.first_card_clicked = null;
        this.second_card_clicked = null;
    };

    /**
     * Click handler for reset button, clears game area and initializes a new game
      */
    $('#resetBtn').on('click', function (e) {
        e.preventDefault();
        self.stopThemeMusic();
        self.games_played++;
        self.resetStats();
        self.init();
    });

};

/**
 * Card - constructor function for the game cards
 * @param value
 * @param index
 * @param parent
 * @constructor
 */
var Card = function(value, index, parent) {
    /**
     * createCardElements - DOM creation for each card
     */
    this.createCardElements = function() {
        var $cardContainer = $('<div>', {
            class: 'card-container'
        });
        var $card = $('<div>', {
            class: 'card',
            click: function() {     // onclick handler for each card
                parent.cardClicked($(this));  // calls cardClicked()
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

        this.renderCard();  // call render cards display them
    };

    /**
     * rederCards - handles the animation that shows the cards on the DOM with a 2 millisecond delay
     */
    this.renderCard = function() {
        $.each($('.card-container'), function(i, card){
            var currentCard = $(card).hide();
            setTimeout(function(){
                currentCard.fadeIn('slow');
            },200 + ( i * 200 ));
        });
    };

    this.createCardElements();  // initializes card creation methods
};

/**
 *  Creates and initializes the game on page load
 */
$(document).ready(function() {
    var game = new Mortal_Match();
    game.init();
});