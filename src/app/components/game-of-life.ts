import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as PIXI from 'pixi.js';


/* tslint:disable */

@Component({
    selector  : 'my-game-of-life',
    template  : `
        <md-card>
            <h2>Game of Life</h2>
            <button md-raised-button *ngIf="!game?.isPlaying" (click)="game.run()">run</button>
            <button md-raised-button *ngIf="game?.isPlaying" (click)="game.run()">stop</button>
            <button md-raised-button *ngIf="!game?.isPlaying" (click)="game.step()">step</button>
            <button md-raised-button *ngIf="!game?.isPlaying" (click)="game.reset()">reset</button>
            <br/>
            <br/>
            <div #gameContainer></div>
        </md-card>
    `,
})

export class GameOfLifeComponent implements AfterViewInit {
    @ViewChild('gameContainer') gameContainer: ElementRef;
    
    game: GameOfLife;
    
    ngAfterViewInit() {
        this.game = new GameOfLife(this.gameContainer.nativeElement);
    }
}

class GameOfLife {
    static COLS   = 80;
    static ROWS   = 30;
    static WIDTH  = 800;
    static HEIGHT = 300;
    
    stage: PIXI.Container;
    renderer: PIXI.SystemRenderer;
    gameField: Cell[][];
    doStep    = false;
    isPlaying = false;
    birthCells: Cell[];
    killCells: Cell[];
    
    constructor(element: HTMLElement) {
        this.initialize(element);
        this.createGameField(GameOfLife.COLS, GameOfLife.ROWS);
        PIXI.ticker.shared.add(this.gameLoop.bind(this));
        this.renderer.render(this.stage);
    }
    
    step() {
        this.doStep = true;
    }
    
    run() {
        this.isPlaying = !this.isPlaying;
    }
    
    reset(){
        this.gameField.forEach(col => col.forEach(cell => cell.resetState()));
        this.doStep = true;
    }
    
    initialize(element: HTMLElement) {
        this.renderer = PIXI.autoDetectRenderer(GameOfLife.WIDTH, GameOfLife.HEIGHT, {
            antialias  : false,
            transparent: true,
            resolution : 1,
        });
        element.appendChild(this.renderer.view);
        this.stage                      = new PIXI.Container();
        this.stage.interactive          = true;
        this.renderer.view.style.border = '1px dashed black';
    }
    
    createGameField(cols: number, rows: number) {
        this.gameField = [];
        for (let x = 0; x < cols; x++) {
            this.gameField[ x ] = [];
            for (let y = 0; y < rows; y++) {
                this.gameField[ x ][ y ] = new Cell(this, x, y);
            }
        }
    }
    
    gameLoop() {
        if (this.doStep || this.isPlaying) {
            this.birthCells = [];
            this.killCells  = [];
            this.gameField.forEach(col => col.forEach(cell => cell.update()));
            this.birthCells.forEach(cell => cell.birth());
            this.killCells.forEach(cell => cell.die());
            this.renderer.render(this.stage);
            this.doStep = false;
        }
    }
}

enum STATE{
    ALIVE,
    DEAD
}

class Cell {
    game: GameOfLife;
    rect: PIXI.Graphics;
    pos: { x: number, y: number };
    width: number;
    height: number;
    fillColor: number;
    x: number;
    y: number;
    state: STATE;
    
    constructor(game: GameOfLife, x: number, y: number) {
        this.game   = game;
        this.width  = Math.floor(GameOfLife.WIDTH / GameOfLife.COLS);
        this.height = Math.floor(GameOfLife.HEIGHT / GameOfLife.ROWS);
        this.x      = x;
        this.y      = y;
        this.pos    = { x: x * this.width, y: y * this.height };
        this.resetState();
        this.rect = new PIXI.Graphics();
        this.drawRect();
        this.rect.hitArea     = this.rect.getBounds();
        this.rect.interactive = true;
        this.rect.on('click', this.onClick.bind(this));
        this.game.stage.addChild(this.rect);
    }
    
    resetState() {
        this.state  = Math.random() > 0.5 ? STATE.ALIVE : STATE.DEAD;
    }
    
    update() {
        this.rect.clear();
        const neighbors      = this.getNeighbors();
        const aliveNeighbors = neighbors.filter(cell => cell.state === STATE.ALIVE);
        if (this.isAlive() && (aliveNeighbors.length < 2 || aliveNeighbors.length > 3)) {
            this.game.killCells.push(this);
        }
        if (this.isDead() && aliveNeighbors.length === 3) {
            this.game.birthCells.push(this);
        }
        this.drawRect();
    }
    
    onClick() {
        if (this.isDead()) {
            this.birth();
        } else {
            this.die();
        }
        this.drawRect();
        this.game.renderer.render(this.game.stage);
    }
    
    drawRect() {
        switch (this.state) {
            case STATE.ALIVE:
                this.fillColor = 0x0000FF;
                break;
            case STATE.DEAD:
            default:
                this.fillColor = 0xEEEEEE;
            
        }
        this.rect.beginFill(this.fillColor);
        this.rect.lineStyle(1, 0xFFFFFF, 1);
        this.rect.drawRect(this.pos.x, this.pos.y, this.width, this.height);
    }
    
    getNeighbors() {
        const neighbors: Cell[] = [];
        const gameField         = this.game.gameField;
        
        for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
                if (x === 0 && y === 0) {
                    continue;
                }
                
                const tmp = { x: this.x + x, y: this.y + y };
                
                if (tmp.x < 0) tmp.x = gameField.length - 1;
                if (tmp.x >= gameField.length) tmp.x = 0;
                if (tmp.y < 0) tmp.y = gameField[ tmp.x ].length - 1;
                if (tmp.y >= gameField[ tmp.x ].length) tmp.y = 0;
                
                neighbors.push(gameField[ tmp.x ][ tmp.y ]);
            }
        }
        
        return neighbors;
    }
    
    isDead() {
        return this.state === STATE.DEAD;
    }
    
    
    isAlive() {
        return this.state === STATE.ALIVE;
    }
    
    die() {
        this.state = STATE.DEAD;
    }
    
    birth() {
        this.state = STATE.ALIVE;
    }
}
