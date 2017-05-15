import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as PIXI from 'pixi.js';


/* tslint:disable */

@Component({
    selector: 'my-shooter',
    template: `
        <md-card>
            <h2>Shooter</h2>
            <br/>
            <div #gameContainer></div>
        </md-card>
    `,
})

export class ShooterComponent implements AfterViewInit {
    @ViewChild('gameContainer') gameContainer: ElementRef;
    
    game: Shooter;
    
    ngAfterViewInit() {
        this.game = new Shooter(this.gameContainer.nativeElement);
    }
}

class Shooter {
    static WIDTH        = 800;
    static HEIGHT       = 300;
    static BULLET_SPEED = 5;
    static carrotTex    = PIXI.Texture.fromImage('/assets/img/canvas/shooter/Bullet.png');
    
    isPaused = false;
    stage: PIXI.Container;
    bullets: Bullet[];
    bunny: Bunny;
    renderer: any;//PIXI.SystemRenderer;
    
    constructor(element: HTMLElement) {
        this.initialize(element);
        
        PIXI.ticker.shared.add(this.gameLoop.bind(this));
        this.renderer.render(this.stage);
    }
    
    initialize(element: HTMLElement) {
        this.renderer = PIXI.autoDetectRenderer(Shooter.WIDTH, Shooter.HEIGHT, {
            antialias  : true,
            transparent: true,
            resolution : 1,
        });
        
        element.appendChild(this.renderer.view);
        
        this.stage             = new PIXI.Container();
        this.stage.interactive = true;
        this.stage.hitArea     = new PIXI.Rectangle(0, 0, Shooter.WIDTH, Shooter.HEIGHT);
        this.stage.on('mousedown', () => {
            this.bunny.shoot();
        });
        
        this.bunny   = new Bunny(this, 200, 150);
        this.bullets = [];
        
        this.renderer.view.style.border = '1px solid black';
    }
    
    gameLoop() {
        if (!this.isPaused) {
            this.bunny.rotateToPoint(this.renderer.plugins.interaction.mouse.global.x, this.renderer.plugins.interaction.mouse.global.y);
            this.bullets.forEach(bullet => {
                bullet.animate();
            });
            this.renderer.render(this.stage);
        }
    }
}

class Bunny {
    game: Shooter;
    sprite: PIXI.Sprite;
    
    constructor(game: Shooter, x: number, y: number) {
        const texture          = PIXI.Texture.fromImage('/assets/img/canvas/shooter/Bender.gif');
        this.game              = game;
        this.sprite            = new PIXI.Sprite(texture);
        this.sprite.anchor.x   = 0.5;
        this.sprite.anchor.y   = 0.5;
        this.sprite.position.x = x;
        this.sprite.position.y = y;
        this.game.stage.addChild(this.sprite);
    }
    
    rotateToPoint(x: number, y: number) {
        const dist_X = x - this.sprite.position.x;
        const dist_Y = y - this.sprite.position.y;
        
        this.sprite.rotation = Math.atan2(dist_Y, dist_X);
    }
    
    shoot() {
        const position = {
            x: this.sprite.position.x + Math.cos(this.sprite.rotation) * 50,
            y: this.sprite.position.y + Math.sin(this.sprite.rotation) * 80,
        };
        new Bullet(this.game, position, this.sprite.rotation);
    }
}

class Bullet {
    static count: number = 0;
           sprite: PIXI.Sprite;
           game: Shooter;
           id: number;
    
    constructor(game: Shooter, position: any, rotation: number) {
        this.game              = game;
        this.id                = Bullet.count++;
        this.sprite            = new PIXI.Sprite(Shooter.carrotTex);
        this.sprite.position.x = position.x;
        this.sprite.position.y = position.y;
        this.sprite.rotation   = rotation;
        this.sprite.scale.set(0.7, 0.7);
        this.game.stage.addChild(this.sprite);
        this.game.bullets.push(this);
    }
    
    animate() {
        this.sprite.position.x += Math.cos(this.sprite.rotation) * Shooter.BULLET_SPEED;
        this.sprite.position.y += Math.sin(this.sprite.rotation) * Shooter.BULLET_SPEED;
        const { x, y } = this.sprite.position;
        if (x > Shooter.WIDTH || y > Shooter.HEIGHT || x < 0 || y < 0) {
            this.game.stage.removeChild(this.sprite);
            this.game.bullets = this.game.bullets.filter(bullet => bullet.id !== this.id);
        }
    }
}
