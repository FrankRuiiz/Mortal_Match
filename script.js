/**
 * Created by FrankyR on 4/12/2016.
 */

/**
 * global game variable
 * @type {cards}
 */


var Card = function(imgPath){
    var self = this;
    this.$element = null;

    this.path = 'images/' + imgPath + 'jpg';

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
        console.log(self.$element);
    }
};

var card1 = new Card('jax');

card1.render();






