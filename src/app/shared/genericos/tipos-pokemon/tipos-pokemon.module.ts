import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiposPokemonComponent } from './tipos-pokemon.component';



@NgModule({
  declarations: [
    TiposPokemonComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    TiposPokemonComponent
  ]
})
export class TiposPokemonModule { }
