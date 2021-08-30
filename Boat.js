class Boat{
    constructor(x, y, width, height, boatpos){

        var options = {
            restitution: 0.8,
            friction: 1,
            density:1
        }
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.width = width;
        this.height = height;
        this.boatPosition = boatpos;
        this.image = loadImage("./assets/boat.png");
        World.add(world, this.body);
    }
    remove(index){
        World.remove(world, boats[index].bodybody);
        boats.splice(index, 1);
    }
    display(){
        var angle = this.body.angle;
        var pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, this.boatPosition, this.width, this.height);
        noTint();
        pop();
    }
}