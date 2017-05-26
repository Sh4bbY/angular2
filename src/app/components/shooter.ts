import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as PIXI from 'pixi.js';
import InteractionEvent = PIXI.interaction.InteractionEvent;
import { Store } from '@ngrx/store';
import { IRootState } from '../reducers/index';
import { Subscription } from 'rxjs/Subscription';


/* tslint:disable */

@Component({
    selector: 'my-shooter',
    template: `
        <md-card>
            <h2>Shooter</h2>
            <br/>
            <div #gameContainer style="overflow: hidden"></div>
        </md-card>
    `,
})

export class ShooterComponent implements AfterViewInit, OnDestroy {
    @ViewChild('gameContainer') gameContainer: ElementRef;
    
    game: Shooter;
    resizeSub: Subscription;
    
    constructor(private store: Store<IRootState>) {
    }
    
    ngAfterViewInit() {
        this.game = new Shooter(this.gameContainer.nativeElement);
        this.resizeSub = this.store.select(s => s.app.windowSize.width).subscribe(width => {
            if (this.game) {
                this.game.resize();
            }
        });
    }
    
    ngOnDestroy() {
        this.resizeSub.unsubscribe();
    }
}

class Shooter {
    static WIDTH        = 800;
    static HEIGHT       = 300;
    static BULLET_SPEED = 5;
    static carrotTex    = PIXI.Texture.fromImage('/assets/img/canvas/shooter/Bullet.png');
    
    container: HTMLElement;
    isPaused = false;
    stage: PIXI.Container;
    bullets: Bullet[];
    bunny: Bunny;
    renderer: any;//PIXI.SystemRenderer;
    receivedTouchEvent = false;
    
    constructor(element: HTMLElement) {
        this.initialize(element);
        
        PIXI.ticker.shared.add(this.gameLoop.bind(this));
        this.renderer.render(this.stage);
    }
    
    initialize(container: HTMLElement) {
        this.container = container;
        this.renderer = PIXI.autoDetectRenderer(Shooter.WIDTH, Shooter.HEIGHT, {
            antialias  : true,
            transparent: true,
            resolution : 1,
        });
    
        container.appendChild(this.renderer.view);
        
        this.stage             = new PIXI.Container();
        this.stage.interactive = true;
        this.stage.hitArea     = new PIXI.Rectangle(0, 0, Shooter.WIDTH, Shooter.HEIGHT);
        this.stage.on('pointerdown', (event: any) => {
            this.bunny.shoot(event);
            if(event.data.pointerType === 'touch') {
                this.receivedTouchEvent = true;
                this.bunny.rotateToPoint(event.data.global.x, event.data.global.y);
            } else{
                this.receivedTouchEvent = false;
            }
        });
        
        this.bunny   = new Bunny(this, 200, 150);
        this.bullets = [];
        
        this.renderer.view.style.border = '1px solid black';
    }
    
    resize(){
        Shooter.WIDTH = this.container.offsetWidth;
        this.renderer.resize(this.container.offsetWidth -2, Shooter.HEIGHT);
        this.stage.hitArea     = new PIXI.Rectangle(0, 0, Shooter.WIDTH, Shooter.HEIGHT);
        this.renderer.render(this.stage);
    }
    
    gameLoop() {
        if (!this.isPaused) {
            if(!this.receivedTouchEvent){
                this.bunny.rotateToPoint(this.renderer.plugins.interaction.mouse.global.x, this.renderer.plugins.interaction.mouse.global.y);
            }
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
    
    shoot(event: InteractionEvent) {
        const position = {
            x: this.sprite.position.x + Math.cos(this.sprite.rotation) * 40,
            y: this.sprite.position.y + Math.sin(this.sprite.rotation) * 40,
        };
        const dist_Y   = position.y - event.data.global.y;
        const dist_X   = position.x - event.data.global.x;
        
        let rotation = Math.atan(dist_Y / dist_X);
        
        if (position.x > event.data.global.x)
            rotation = rotation - Math.PI;
        
        new Bullet(this.game, position, rotation);
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
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.scale.set(0.5, 0.5);
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
