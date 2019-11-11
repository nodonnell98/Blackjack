import Dealer from './Dealer.js';
import Deck from '../../Deck.js';


export default class BlackJackDealer extends Dealer{
    constructor(deckNo){
        super();
        this.deckNumber = deckNo;
        this.deck = new Deck(this.deckNumber);                
    }

    //this function deals another card to the dealer if their hand is < 17
    //It does this with a delay to give the impression of cards being dealt
    //If the hand is still less than 17, the function repeats until it is > 17
        dealHand(dealer, funct) {
            if ((dealer.countHand() < 17) && (dealer.hand.length < 5)) {
                window.setTimeout(deal.bind(this), 1000);
    
                function deal() {
                    dealer.hand = dealer.deal(dealer, 1, "front");
                    dealer.handTotal = dealer.countHand();                    
                    funct(dealer);                    
                    if (dealer.countHand() < 17) {
                        this.dealHand(dealer, funct);
                    } else if (dealer.countHand() >= 17) {                                              
                        window.game.compareHands(window.game.player, dealer);
                    }
                }
            } else if (dealer.countHand() <= 21) {    
                window.game.compareHands(window.game.player, dealer);
            }
        }

        newDeck(){            
            this.deck = new Deck(this.deckNumber);        
        }

        clearHand(player){
            player.hand = [];
            this.populateHand(player)            
        }
    
}