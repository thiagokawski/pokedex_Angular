import { Component } from '@angular/core';
import { BuscaListaPokemonService } from '../shared/services/busca-lista-pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {
  next: boolean = true;
  previous: boolean = false;
  pagina: number = 0;
  pokemons: Array<any> = [];

  constructor(private _buscaLista: BuscaListaPokemonService) { }

  ngOnInit() {
    this.listarPokemons();
  }

  //faz a busca de pokemons por página
  listarPokemons(){
    let pokeList: any;
    this._buscaLista.buscarLista(this.pagina * 20).subscribe(
      (data: any) =>{
        pokeList = data.results;
        if(data.previous){
          this.previous = true;
        }else{
          this.previous = false;
        }
        if(data.next){
          this.next = true;
        }else{
          this.next = false;
        }
        this.getPokemons(pokeList);
      }
    )
  }

  //busca pelo usuario; todos, nome, ou ID
  buscaParcial(pokemonName: any) {
    let url: string;
    if (pokemonName != null && pokemonName != ""){
      if(!isNaN(pokemonName)){
        url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;
      }else{
        url = `https://pokeapi.co/api/v2/pokemon?limit=1000000`;
      }
    }else{
      url = `https://pokeapi.co/api/v2/pokemon?limit=20`;
    }

    this._buscaLista.getPokemons(url).subscribe(
      (data: any)=>{
        if(data.results){
          let listPokemon = data.results.filter( (poke: any) => poke.name.includes(pokemonName))
          this.getPokemons(listPokemon)
        }else{
          this.pokemons = []
          this.preencherDadosPokemon(data)
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  //pega cada pokemon buscado em uma lista
  getPokemons(pokeList:any){
    this.pokemons = [];
    pokeList.forEach((poke: any)=> {
      this._buscaLista.getPokemons(poke.url).subscribe(

        (data: any)=>{
          this.preencherDadosPokemon(data)
        },
        error => {
          console.log(error);
        }
      )
    });
  }

  //preenche os cards da lista pokemon
  preencherDadosPokemon(pk: any){
    let pokemon: any = {};
    pokemon.nome = pk.name.charAt(0).toUpperCase() + pk.name.slice(1);
    pokemon.id = pk.id;
    pokemon.image = pk.sprites.other.dream_world.front_default;
    pokemon.tipo = [];
    pk.types.forEach((type: any) => {
      pokemon.tipo.push(type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1));
    });
    this.pokemons.push(pokemon);
  }

  //
  //Utilitarios
  ordenarPokemons(a: any, b: any) {
    return a.id - b.id;
  }

  nextPag(){
    this.pagina ++;
    this.listarPokemons();
  }

  previousPag(){
    this.pagina --;
    this.listarPokemons();
  }
}
