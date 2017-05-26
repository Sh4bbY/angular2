import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCardModule } from '@angular/material';
import { GameOfLifeComponent } from '../components/game-of-life';
import { ShooterComponent } from '../components/shooter';
import { PhysicsComponent } from '../components/physics';

@NgModule({
    imports     : [
        CommonModule,
        MdCardModule,
        MdButtonModule,
        RouterModule.forChild([
            { path: 'game-of-life', component: GameOfLifeComponent },
            { path: 'shooter', component: ShooterComponent },
            { path: 'physics', component: PhysicsComponent },
        ]),
    ],
    declarations: [
        GameOfLifeComponent,
        ShooterComponent,
        PhysicsComponent,
    ],
})
export class PixiModule {
}
