class RandomEvent {
    
    constructor() {
        this.text = "";
        this.stat = 0; //0=exercise, 1=social, 2=food, 3=sleep, 4=work
        this.magnitude = 0;
    }

    generate = function() {
        let seedNum = Math.floor(Math.random() * numEvents);

        if (seedNum === 0) {
            this.text = "You just can't seem to focus today. (-20 Work)";
            this.stat = 4;
            this.magnitude = 20;
        } else if (seedNum === 1) {
            this.text = "It was a long, restless night tossing and turning. (-30 Sleep)";
            this.stat = 3;
            this.magnitude = 30;
        } else if (seedNum === 2) {
            this.text = "The thought of facing the world today is just too much. (-25 Social)";
            this.stat = 1;
            this.magnitude = 25;
        } else if (seedNum === 3) {
            this.text = "Finding the motivation to work out has been a problem lately. (-40 Exercise)";
            this.stat = 0;
            this.magnitude = 40;
        } else if (seedNum === 3) {
            this.text = "The fridge is full but your apetite is nowhere to be seen. (-30 Food)";
            this.stat = 2;
            this.magnitude = 30;
        } else if (seedNum === 4) {
            //more events?
        } else if (seedNum === 5) {
            //...
        } else if (seedNum === 6) {

        }
    }
}