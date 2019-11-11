export default class Person {
    constructor() {
        this.hand = [];        
        this.handTotal = this.countHand(this.hand);
    }    

    countHand() {
        this.handTotal = 0;
        for (var i = 0; i < this.hand.length; i++) {
            this.handTotal += this.hand[i].trueValue;
        }
        return this.handTotal;
    }
}