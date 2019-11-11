import Person from '../Person.js';
import Deck from '../../Deck.js';

export default class Dealer extends Person{
    constructor(){
        super();        
        this.deck = new Deck(1);
        this.name = "Dealer";
    }

    //this pops a card from the deck into a players hand, once there it takes the side paramater to set if the card displays its front or back
    deal(player, number, side){
        let newHand = [];
        for(let i = 0; i < number; i++){
        newHand = player.hand;
        newHand.push(this.deck.cards.pop());        
        player.hand[(player.hand.length -1)].setImage(side); 
       
        }
       
        
        this.cardTwist(player);
       this.populateHand(player);
        return newHand;
    }

    //this adds/removes the class 'cardTwist' which enables the flipping animation
    cardTwist(player){
        for(let i = 0; i < player.hand.length; i++){
            player.hand[i].image.classList.remove("cardTwist");
        }
        if((player.hand.length - 1) > 1){
        player.hand[(player.hand.length -1)].image.classList.add("cardTwist");
        }
        var audio = new Audio('../src/assets/sounds/flip.mp3');
        audio.play();
       
    }

    //this takes a players hand a appends the images of the card to the player div
    populateHand(player){
        this.getPlayerHandLocation(player).innerHTML = "";
        for (var i = 0; i < player.hand.length; i++) {           
            var elem = player.hand[i].image;                  
            this.getPlayerHandLocation(player).appendChild(elem);
           
        }
        this.getPlayerHandLocation(player).style.display = "visible";
        
    }

    //this seperates haveing the html hardcoded into the logic
    getPlayerHandLocation(player){
        let handLocation = document.getElementById((player.name + "Hand"))
        return handLocation;
    }

    //creates a new deck
    newDeck(){
        this.deck = new Deck(this.deckNumber);        
    }
    
    //this flips a card from its back to front at a certain index
    flipHidden(index){
        this.hand[index].setImage("front");
        this.populateHand(this);
    }    
}