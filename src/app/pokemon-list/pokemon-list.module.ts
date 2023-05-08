import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list.component';
import { BuscaListaPokemonService } from '../shared/services/busca-lista-pokemon.service';



@NgModule({
  declarations: [
    PokemonListComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PokemonListComponent
  ],
  providers:[
    BuscaListaPokemonService
  ]
})
export class PokemonListModule { }
