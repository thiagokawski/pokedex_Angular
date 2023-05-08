import { Component } from '@angular/core';
import { BuscaListaPokemonService } from '../shared/services/busca-lista-pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {
  pagina: number = 0;
  pokemons: Array<any> = [];

  constructor(private _buscaLista: BuscaListaPokemonService) { }

  ngOnInit() {
    this.listarPokemons();
  }

  listarPokemons(){
    let pokeList: any;
    this._buscaLista.buscarLista(this.pagina * 20).subscribe(
      (data: any) =>{
        pokeList = data.results;
        this.getPokemons(pokeList);
      }
    )
  }

  getPokemons(pokeList:any){
    pokeList.forEach((poke: any)=> {
      this._buscaLista.getPokemons(poke.url).subscribe(

        (data: any)=>{
          let pokemon: any = {};
          pokemon.nome = data.name;
          pokemon.id = data.id;
          pokemon.image = data.sprites.other.dream_world.front_default;
          pokemon.tipo = [];
          data.types.forEach((type: any) => {
            pokemon.tipo.push(type.type.name);
          });
          //console.log(data)
          this.pokemons.push(pokemon);
        },

        error => {
          console.log(error);
        }
      )
    });
  }

  ordenarPokemons(a: any, b: any) {
    return a.id - b.id;
  }
}
