import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPokemonComponent } from './card-pokemon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    CardPokemonComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatProgressBarModule
  ],
  exports: [
    CardPokemonComponent
  ]
})
export class CardPokemonModule { }
