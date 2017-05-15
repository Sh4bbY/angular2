import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as PIXI from 'pixi.js';


/* tslint:disable */

@Component({
    selector: 'my-physics',
    template: `
        <md-card>
            <h2>Physics</h2>
            <input #vector type="text">
            <button (click)="fire()">FIRE</button>
            <br/>
            <div #simContainer></div>
        </md-card>
    `,
})

export class PhysicsComponent implements AfterViewInit {
    @ViewChild('simContainer') simContainer: ElementRef;
    @ViewChild('vector') vector: ElementRef;
    
    sim: Sim;
    
    fire() {
        const value = +this.vector.nativeElement.value;
        console.log(value);
        this.sim.fire({ x: value, y: value });
    }
    
    ngAfterViewInit() {
        this.sim = new Sim(this.simContainer.nativeElement);
    }
}

class Sim {
    static WIDTH  = 1200;
    static HEIGHT = 400;
    static G      = 9.87;
    
    isPaused          = false;
    stage: PIXI.Container;
    renderer: PIXI.SystemRenderer;
    objects: Object[] = [];
    timeStamp: number;
    mousedownPoint: IPoint;
    df: number;
    frame             = 0;
    
    constructor(element: HTMLElement) {
        this.initialize(element);
        
        PIXI.ticker.shared.add(this.gameLoop.bind(this));
        this.renderer.render(this.stage);
        
        this.objects.push(new Object(this));
    }
    
    initialize(element: HTMLElement) {
        this.renderer = PIXI.autoDetectRenderer(Sim.WIDTH, Sim.HEIGHT, {
            antialias  : true,
            transparent: true,
            resolution : 1,
        });
        element.appendChild(this.renderer.view);
        this.stage             = new PIXI.Container();
        this.stage.interactive = true;
        this.stage.hitArea     = new PIXI.Rectangle(0, 0, Sim.WIDTH, Sim.HEIGHT);
        this.stage.on('mousedown', (event: any) => {
            const p     = event.data.global;
            this.mousedownPoint = {x: p.x, y: p.y};
        });
        this.stage.on('mouseup', (event: any) => {
            const p     = event.data.global;
            const force = { x: p.x - this.mousedownPoint.x, y: p.y - this.mousedownPoint.y };
            console.log(force);
            this.fire(force);
        });
        this.renderer.view.style.border = '1px solid black';
    }
    
    fire(force: IPoint) {
        this.objects.forEach(obj => obj.vector = force);
    }
    
    gameLoop() {
        this.frame++;
        if (!this.isPaused) {// && this.frame % 10 == 0) {
            const time     = Date.now();
            this.df        = (time - this.timeStamp || 0) / 100;
            this.timeStamp = time;
            this.objects.forEach(obj => obj.update());
            this.renderer.render(this.stage);
        }
    }
}

interface IPoint {
    x: number,
    y: number
}

class Object {
    sim: Sim;
    shape: PIXI.Graphics;
    vector: IPoint;
    pos: IPoint;
    radius: number;
    absorbtion = 0.5;
    
    constructor(sim: Sim) {
        this.sim    = sim;
        this.shape  = new PIXI.Graphics();
        this.vector = { x: 0, y: 0 };
        this.radius = 100;
        this.pos    = {
            x: Sim.WIDTH / 2,
            y: Sim.HEIGHT / 2,
        };
        this.draw();
        this.sim.stage.addChild(this.shape);
    }
    
    draw() {
        this.shape.clear();
        this.shape.lineStyle(2, 0xFF00FF);
        this.shape.beginFill(0x123456);
        this.shape.drawCircle(this.pos.x, this.pos.y, this.radius);
        this.shape.endFill();
    }
    
    update() {
        this.vector.x *= 0.99;
        this.vector.y += Sim.G * this.sim.df;
        this.pos.x += this.vector.x * this.sim.df;
        this.pos.y += this.vector.y * this.sim.df;
        if (this.pos.y + this.radius > Sim.HEIGHT) {
            this.pos.y    = Sim.HEIGHT - this.radius;
            this.vector.y = -(this.vector.y * this.absorbtion);
        }
        if (this.pos.x + this.radius > Sim.WIDTH) {
            this.pos.x    = Sim.WIDTH - this.radius;
            this.vector.x = -(this.vector.x * this.absorbtion);
        }
        if (this.pos.x - this.radius < 0) {
            this.pos.x    = this.radius;
            this.vector.x = -(this.vector.x * this.absorbtion);
        }
        
        //   console.log(Sim.G , this.pos.y, this.sim.df, this.vector.y);
        this.draw();
    }
}
