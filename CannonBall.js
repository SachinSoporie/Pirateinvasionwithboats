class CannonBall{
    constructor(x, y){
        var options = {
            restitution:0.8,
            friction: 1,
            density: 1,
            isStatic:true
        }
        this.r = 40;
        this.body = Bodies.circle(x, y, this.r, options);
        this.image = loadImage("./assets/cannonball.png");
        this.trail = [];
        World.add(world, this.body);
    }
    shoot(){
        var velocity = p5.Vector.fromAngle(cannon.angle);
        velocity.mult(20);
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body, {x:50, y:-30});
    }
    display(){
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.r, this.r);
        pop();
        if(this.body.velocity.x > 0 && this.body.position.x > 250){
            var position = [this.body.position.x, this.body.position.y];
            this.trail.push(position);
        }
        for(var a = 0; a < this.trail.length; a++){
            image(this.image, this.trail[a][0], this.trail[a][1], 5, 5);
        }
    }
}