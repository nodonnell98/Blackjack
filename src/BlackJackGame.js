import Player from './People/Player.js'
import BlackJackDealer from './People/Dealers/BlackJackDealer.js';

export default class Game {
    constructor() {
        this.dealer = new BlackJackDealer(8);
        this.pot = 0;
        this.player = new Player();
    }

    start() {
        this.playButton();
        document.getElementById("container").style.display = "none";
        this.showBet();
        this.playMusic();
    }

    dealHands() {
        this.playerTurn()
        this.dealer.hand = this.dealer.deal(this.dealer, 1, "back");
        this.dealer.hand = this.dealer.deal(this.dealer, 1, "front");
    }

    playerTurn() {
        this.player.hand = this.dealer.deal(this.player, 2, "front");
    }

    

    //this function checks the player hand for several things:
    //It checks the hand for aces - if there are aces and the hand would now exceed 21 it changes the 
    //value of the ace from 11 to 1
    //After that it checks if the player hand is over 21, even with low aces - if so then the player is bust
    //Sets the approptiate UI display
    //TODO: Seperate check Ace as a person function
    check(player) {
        player.handTotal = player.countHand();        
        window.game.checkAces(player);
        player.handTotal = player.countHand();
        if (player.handTotal > 21) { //checking if over 21
            if (player.name == "Player") {
                window.game.showRestart();
                window.game.showBust(player);
                window.game.playFail();   
            } else if (player.name == "Dealer") {
                window.game.showRestart();
                window.game.showBust(player); 
                window.game.playWin();               
                window.game.player.returnBet(window.game.pot * 2);            
            }
            window.game.hideButtons();
        }
        if ((player.hand.length == 5) && (player.handTotal <= 21)) { //this means that even if a players hand is <= 21, if they have 5 cards they win automatically
            window.game.showRestart();
            document.getElementById("output").innerHTML = (player.name + " wins - 5 CARD TRICK!!");
            if(player.name == "Player"){
            window.game.player.returnBet(this.pot * 2.5);
            this.playWin();
            }
            else if(player.name = "Dealer"){
                this.playFail();
            }
            window.game.hideButtons();
        }

    }

    checkAces(player) {
        if ((player.name == "Player") && (player.handTotal > 21)) {
            for (let i = 0; i < player.hand.length; i++) {
                if (player.hand[i].value == "Ace") {
                    player.hand[i].trueValue = 1; //setting the ace to 1
                }
            }
        } else if (((player.name == "Dealer") && (player.handTotal > 21)) || ((player.name == "Dealer") && (player.handTotal < 17))) {
            for (let i = 0; i < player.hand.length; i++) {
                if (player.hand[i].value == "Ace") {
                    console.log("DEALER ACE")
                    player.hand[i].trueValue = 1;
                }
            }
        }
    }

    //this is the dealer's turn
    //Here the dealer gets dealt a hand and its populated on the page    
    dealerTurn() {
        this.dealer.flipHidden(0);
        this.dealer.countHand();
        if (this.dealer.handTotal < 17) {
            this.dealer.hand = this.dealer.deal(this.dealer, 1, "front");
        }
        this.check(this.dealer);
        this.dealer.dealHand(this.dealer, this.check);
    }

    //this function compares the player hand values and ouputs the appropriate response
    compareHands(player, dealer) {
        player.countHand();
        dealer.countHand();
        if ((player.handTotal > dealer.handTotal) && (player.handTotal <= 21)) {
            this.showRestart();
            if (this.player.doubleDown == false) {
                this.player.returnBet(this.pot * 2);
            } else if (this.player.doubleDown == true) {
                this.player.returnBet(this.pot * 4);
            }
            document.getElementById("output").innerHTML = "Player wins";
            this.playWin();

        }else if ((player.handTotal == dealer.handTotal)) {
            console.log("draw");
            this.showRestart();
            this.player.returnBet(this.pot);
            console.log(this.player.money);
            document.getElementById("output").innerHTML = "DRAW";
            this.playFail();
        } 
        else if(dealer.handTotal > 21){
            this.showBust(dealer);
            this.playWin(); 
        }        
        else {
            this.showRestart();
            document.getElementById("output").innerHTML = "Dealer wins";
            this.playFail();
        }
    }

    //this takes the players bet and puts it in the pot
    bet() {
        this.playButton();
        if (document.getElementById("betInput").value <= this.player.money) {
            this.player.bet(parseInt(document.getElementById("betInput").value));
            this.pot = parseInt(document.getElementById("betInput").value);
            this.hidBet();
            this.showUI();
            this.dealHands();
        } else {
            alert("You don't have enough money for this bet try again");
        }
    }

    //this restarts the game
    restart() {
        document.getElementById("output").style.display = "none";
        document.getElementById("restart").style.display = "none";
        document.getElementById("DealerHand").innerHTML = "";
        this.showBet();
        this.dealer.newDeck();
        this.clearHands();
        this.start();
    }

    //this function will clear all hands
    clearHands() {
        this.dealer.clearHand(this.player);
        this.dealer.clearHand(this.dealer);
        this.player.doubleDown = false;
    }

    //this function displays the UI elements needed for blackJack
    showUI() {
        document.getElementById("twist").style.display = "inline-block";
        document.getElementById("stick").style.display = "inline-block";
        document.getElementById("double").style.display = "inline-block";
    }

    showBet() {
        document.getElementById("betInput").style.display = "inline-block";
        document.getElementById("betBtn").style.display = "inline-block";
    }

    hidBet() {
        document.getElementById("betInput").style.display = "none";
        document.getElementById("betBtn").style.display = "none";
    }

    //this will ouput bust
    showBust(player) {
        document.getElementById("output").innerHTML = (player.name + " is bust!!");
    }

    //this displays the play again button
    showRestart() {
        document.getElementById("restart").style.display = "inline-block";
        document.getElementById("output").style.display = "inline-block";
    }

    //this hides the twist and stick buttons
    hideButtons() {
        document.getElementById("twist").style.display = "none";
        document.getElementById("stick").style.display = "none";
        document.getElementById("double").style.display = "none";
    }


    //This function is called when the player clicks the twist button and deals a card to their hand
    twist() {
        this.playButton();
        this.player.hand = this.dealer.deal(this.player, 1, "front");
        this.check(this.player);
        document.getElementById("double").style.display = "none";       
    }

    //this function is called by the stick button and removes the UI/starts the dealer's turn
    stick() {
        this.playButton();
        this.hideButtons();
        this.dealerTurn(this.dealer);        
    }

    doubleDown() {
        this.playButton();
        this.player.doubleDown = true;
        this.player.hand = this.dealer.deal(this.player, 1, "front");
        this.player.handTotal = this.player.countHand();
        this.check(this.player);
        if (this.player.handTotal <= 21) {
            this.hideButtons();
            this.dealerTurn(this.dealer);
        } else {
            this.showBust();
            this.showRestart();
        }
    }

    showRules() {
        console.log("Welcome to BlackJack!");
        console.log("\n");
        console.log("Rule 1: Try to make 21 with your cards (pictures are worth 10)");
        console.log("Rule 2: Ace can be worth 1 or 11");
        console.log("Rule 3: The dealer will twist until they get 17 or above");
        console.log("\n");
        console.log("WINNING");
        console.log("You win if your hand isn't over 21 but beats the dealer's hand");
        console.log("You can also win by having 5 cards in your hand");
        console.log("\n");
        console.log("DRAW");
        console.log("If you and the dealer have the same hand - your bet is returned to you")
    }

    playWin(){
        var audio = new Audio('../src/assets/sounds/win2.mp3');
        audio.play();
    }

    playFail(){
        var audio = new Audio('../src/assets/sounds/lose.wav');
        audio.play();
    }

    playButton(){
        var audio = new Audio('../src/assets/sounds/buttonClick.wav');
        audio.play();
    }

    playMusic(){
        let music = document.getElementById("music")
        let crowd = document.getElementById("crowd")
        music.play();
        music.loop = true;
        music.volume = 0.5;
        crowd.play();
        crowd.loop = true;
        crowd.volume = 0.3;        
    }

    playCoin(){
        let audio = new Audio('../src/assets/sounds/coin.wav');
        audio.play();
    }
}