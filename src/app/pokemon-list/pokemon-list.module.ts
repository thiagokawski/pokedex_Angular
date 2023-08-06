import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list.component';
import { BuscaListaPokemonService } from '../shared/services/busca-lista-pokemon.service';
import { CardPokemonModule } from '../card-pokemon/card-pokemon.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    PokemonListComponent
  ],
  imports: [
    CommonModule,
    CardPokemonModule,
    FontAwesomeModule
  ],
  exports:[
    PokemonListComponent
  ],
  providers:[
    BuscaListaPokemonService
  ]
})
export class PokemonListModule { }
