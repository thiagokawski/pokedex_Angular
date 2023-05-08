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

  getPokemons(pokeList:any){
    pokeList.forEach((poke: any)=> {
      this._buscaLista.getPokemons(poke.url).subscribe(

        (data: any)=>{
          let pokemon: any = {};
          pokemon.nome = data.name.charAt(0).toUpperCase() + data.name.slice(1);
          pokemon.id = data.id;
          pokemon.image = data.sprites.other.dream_world.front_default;
          pokemon.tipo = [];
          data.types.forEach((type: any) => {
            pokemon.tipo.push(type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1));
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

  nextPag(){
    this.pagina ++;
    this.pokemons = [];
    this.listarPokemons();
  }

  previousPag(){
    this.pagina --;
    this.pokemons = [];
    this.listarPokemons();
  }
}
