

export default class Card{
    constructor(value, suit, trueValue, imgCode, side){        
       
        this.suit = suit;
        this.trueValue = trueValue;
        this.value = this.setPicture(value);       
        this.frontImageCode = ("../src/assets/cards/" + imgCode + ".png");
        this.backImageCode = ("../src/assets/cards/cardBack.png")
        this.image = this.setImage(side);       
        this.name = this.name(this.value, suit);        
        
        return this;
    }

    setImage(side){
        var elem = document.createElement("img");
        if(side == "front"){
            elem.setAttribute("src", this.frontImageCode);
        }
        else if(side == "back"){
            elem.setAttribute("src", this.backImageCode);
        }
            elem.setAttribute("width", 140);
            elem.setAttribute("height", 190);
            elem.classList.add("card");

            this.image = elem;
            return elem;
    }

    setPicture(value){

        let suits = ['Jack', 'Queen', 'King'];
        if(value < 2){
            value = 'Ace'
            this.trueValue = 11;
        }
        else if(value > 10){
            value = suits[(value-11)];
        }
        
        return value;
    }

    name(value, suit){
        let name = value + " of " + suit;

        return name;
    }
}