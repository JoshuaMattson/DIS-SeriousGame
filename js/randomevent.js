class RandomEvent {

    constructor() {
        this.text = "";
        this.stat = ""; //exercise, social, food, sleep, work
        this.magnitude = 0;
    }

    generate = function() {
        let numEvents = 7;
        let seedNum = Math.floor(Math.random() * numEvents);

        if (seedNum === 0) {
            this.text = "You just can't seem to focus today. (-20 Work)";
            this.stat = "Work";
            this.magnitude = 20;
        } else if (seedNum === 1) {
            this.text = "It was a long, restless night tossing and turning. (-30 Sleep)";
            this.stat = "Sleep";
            this.magnitude = 30;
        } else if (seedNum === 2) {
            this.text = "The thought of facing the world today is just too much. (-25 Social)";
            this.stat = "Social";
            this.magnitude = 25;
        } else if (seedNum === 3) {
            this.text = "Finding the motivation to work out has been a problem lately. (-40 Exercise)";
            this.stat = "Exercise";
            this.magnitude = 40;
        } else if (seedNum === 3) {
            this.text = "The fridge is full but your apetite is nowhere to be seen. (-30 Food)";
            this.stat = "Food";
            this.magnitude = 30;
        } else if (seedNum === 4) {
            this.text = "Friends are getting together but you just don't have the energy. (-10 Social)";
            this.stat = "Social";
            this.magnitude = 10;
        } else if (seedNum === 5) {
            this.text = "Up all night with racing thoughts. (-50 Sleep)";
            this.stat = "Sleep";
            this.magnitude = 50;
        } else if (seedNum === 6) {
            this.text = "You've been taking a few too mant days off lately. (-35 Work)";
            this.stat = "Work";
            this.magnitude = 35;
        }
    }
}