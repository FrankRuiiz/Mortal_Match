/**
 * Created by FrankyR on 4/12/2016.
 */

/**
 * global game variable
 * @type {cards}
 */


var Card = function(imgFace){
    var self = this;
    this.$element = null;

    this.path = 'images/' + imgFace + '.jpg';

    this.render = function() {

        var card_container = $('<div>', {
            class: 'card-container'
        });
        var card = $('<div>', {
            class: 'card'
        });
        var flipper = $('<div>', {
            class: 'flipper'
        });
        var front = $('<div>', {
            class: "front"
        });
        var back = $('<div>', {
            class: 'back'
        });

        flipper.append(front, back);
        card.append(flipper);
        card_container.append(card);

        self.$element = card_container;

        var $card = self.$element.find('.card');
        console.log($card);

        $card.addClass('card-' + imgFace);

        $card.find('.front').append('<img src="' + self.path + '" alt="front of card">');
        $card.find('.back').append('<img src="images/scales.jpg" alt="back of card">');

        // $card.on('click', function(event){ TODO: click function for flipping a card
        //    event.preventDefault();
        //
        // });
        console.log(this.$element);

        $('#game').append(this.$element);
        // return this.$element;
    }
};




$(document).ready(function(){
    var card1 = new Card('jax');

    card1.render();



});


