import Card from './Card.js';

export default class Deck {
    constructor(deckNo) {
        this.cards = [];
        this.populate(deckNo);
        this.cards = this.shuffle();
    }

    populate(deckNo) {
        var suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds']
        for (let i = 0; i < deckNo; i++) {
            for (let i = 0; i < suits.length; i++) {
                for (let j = 1; j < 14; j++) {
                    let trueValue = j;
                    if (trueValue > 10) {
                        trueValue = 10;
                    }
                    let imgCode = (suits[i] + j);
                    var card = new Card(j, suits[i], trueValue, imgCode, "front");
                    this.cards.push(card);
                }
            }
        }        
    }

    shuffle() {
        for (let i = (this.cards.length) - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i)
            const temp = this.cards[i]
            this.cards[i] = this.cards[j]
            this.cards[j] = temp
        }
        return this.cards;
    }
}