import Person from './Person.js';

export default class Player extends Person{
    constructor(){
        super();
        this.name = "Player";
        this.money = 500;
        this.doubleDown = false;
    }

    //this subtracts the bet from the players total money
    bet(value){        
        this.money -= value;
        this.setMoneyUI(this.money);
                  
    }    

    setMoneyUI(value){
        document.getElementById("playerMoney").innerHTML = ("£" + value);     
    }

    //this returns any winnings back to the players money
    returnBet(value){
        this.money += value;
        this.setMoneyUI(this.money);
    }

    split(){
        // TODO: a player will be able to split their hand if its a pair
    }
}