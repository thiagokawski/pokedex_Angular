import { Component, Input } from '@angular/core';
import { faTree, faWater, faFire, faBug, faCircle, faMoon, faDragon, faFeather, faIceCream, faSquare, faGhost, faSkull, faHillRockslide, faBolt, faMountain, faMountainSun, faHatWizard, faHandFist, faWandMagicSparkles, faVenus, faMars, faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { BuscaListaPokemonService } from '../shared/services/busca-lista-pokemon.service';

@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.css']
})
export class CardPokemonComponent {
  
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
    'Psychic': faHatWizard,
    'female': faVenus,
    'male': faMars,
    'preview': faChevronLeft,
    'next': faChevronRight,
  }

  nameStats: { [key: string]: string } = {
    'hp': "HP",
    'attack': "Ataque",
    'defense': "Defesa",
    'special-attack': "Ataque Especial",
    'special-defense': "Defesa Especial",
    'speed': "Velocidade",
  }

  @Input() pokemon: any;

  infoAdicionais = {
    gender_rate: -1,
    capture_rate: 0
  }

  idPokemonAtual = 0;
  obtendoPokemonAtual: boolean = false;

  constructor(private _buscaLista: BuscaListaPokemonService) { }
  
  ngOnInit() {
    this.infoAdicionais = {
      gender_rate: -1,
      capture_rate: 0
    };

    this.idPokemonAtual = this.pokemon.id

    this.getSpecies(this.idPokemonAtual);
  }

  getSpecies(id: number){
    this._buscaLista.getSpecies(id).subscribe(
        (data: any) =>{
          this.infoAdicionais.gender_rate = data.gender_rate;
          this.infoAdicionais.capture_rate = data.capture_rate;
        },
        error => {
          console.log(error);
        }
    )
  }

  //mudar pokemon
  nextPokemon(){
    this.idPokemonAtual++;
    this.getPokemon(this.idPokemonAtual)
    this.getSpecies(this.idPokemonAtual)
  }
  previousPokemon(){
    this.idPokemonAtual--;
    this.getPokemon(this.idPokemonAtual)
    this.getSpecies(this.idPokemonAtual)
  }

  getPokemon(id: number){
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`
    
    this.obtendoPokemonAtual = true;

    this._buscaLista.getPokemons(url).subscribe(
      (data: any)=>{
        this.preencherDadosPokemon(data)
      },
      error => {
        console.log(error);
      }
    )
  }

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

    this.pokemon = pokemon;
    this.obtendoPokemonAtual = false;
  }

}