

class Vehicle{

    constructor(brand, model, speed){
        this.brand= brand;
        this.model= model;
        this.speed=speed;
    }

    displayDetails(){
        console.log(`You've chosen ${brand} car of model: ${this.model}, which could speed upto ${this.speed} km/hr`)
    }
}

class Car extends Vehicle{
    constructor(brand, model, speed, seats){
        super(brand, model, speed)
        this.seats= seats
    }


    displayDetails(){
        console.log(`You've chosen ${this.brand} car of model: ${this.model}, which could speed upto ${this.speed} km/hr`)
        console.log(`Your selected ${this.brand} car has ${this.seats} seats`)
    }
}

class Bike extends Vehicle{
    constructor(brand, model, speed, seats){
        super(brand, model, speed)
        this.seats= seats
    }

    displayDetails(){
        console.log(`You've chosen ${this.brand} car of model: ${this.model}, which could speed upto ${this.speed} km/hr`)
        console.log(`Your selected ${this.brand} car has ${this.seats} seats`)
    }
}


