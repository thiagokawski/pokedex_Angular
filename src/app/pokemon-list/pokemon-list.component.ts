import { Component } from '@angular/core';
import { BuscaListaPokemonService } from '../shared/services/busca-lista-pokemon.service';
import { faTree, faWater, faFire, faBug, faCircle, faMoon, faDragon, faFeather, faIceCream, faSquare, faGhost, faSkull, faHillRockslide, faBolt, faMountain, faMountainSun, faHatWizard, faHandFist, faWandMagicSparkles} from '@fortawesome/free-solid-svg-icons';

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
  pokemonDestaque: any = null;

  constructor(private _buscaLista: BuscaListaPokemonService) { }

  icons: { [key: string]: any } = {
    'Grass': faTree,
    'Fire' : faFire,
    'Water': faWater,
    'Bug': faBug,
    'Ghost': faGhost,
    'Poison': faSkull,
    'Fairy': faWandMagicSparkles,
    'Steel': faSquare,
    'Ice': faIceCream,
    'Electric': faBolt,
    'Fighting': faHandFist,
    'Ground': faMountainSun,
    'Rock': faHillRockslide,
    'Flying': faFeather,
    'Dragon': faDragon,
    'Dark': faMoon,
    'Normal': faCircle,
    'Psychic': faHatWizard
  }

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
    pokemon.height = pk.height;
    pokemon.weight = pk.weight;
    pokemon.stats = pk.stats;
    pokemon.image = pk.sprites.other.dream_world.front_default;
    pokemon.tipo = [];
    pk.types.forEach((type: any) => {
      pokemon.tipo.push(type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1));
    });
    this.pokemons.push(pokemon);
  }

  
  //Utilitarios
  viewCard(pokemon: any){
    this.pokemonDestaque = pokemon;
  }

  closeCard(){
    this.pokemonDestaque = null;
  }

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
