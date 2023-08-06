import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPokemonComponent } from './card-pokemon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    CardPokemonComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    CardPokemonComponent
  ]
})
export class CardPokemonModule { }
