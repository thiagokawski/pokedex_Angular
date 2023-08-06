import { Component, Input } from '@angular/core';
import { faTree, faWater, faFire, faBug, faCircle, faMoon, faDragon, faFeather, faIceCream, faSquare, faGhost, faSkull, faHillRockslide, faBolt, faMountain, faMountainSun, faHatWizard, faHandFist, faWandMagicSparkles, faVenus, faMars} from '@fortawesome/free-solid-svg-icons';
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
    'male': faMars
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

  constructor(private _buscaLista: BuscaListaPokemonService) { }
  
  ngOnInit() {
    this.infoAdicionais = {
      gender_rate: -1,
      capture_rate: 0
    };

    this.getSpecies(this.pokemon.id);
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

  configProgressBar(valor: number){
    
  }
}