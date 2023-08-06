import { Component, Input } from '@angular/core';
import { faTree, faWater, faFire, faBug, faCircle, faMoon, faDragon, faFeather, faIceCream, faSquare, faGhost, faSkull, faHillRockslide, faBolt, faMountain, faMountainSun, faHatWizard, faHandFist, faWandMagicSparkles} from '@fortawesome/free-solid-svg-icons';

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
    'Psychic': faHatWizard
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
  
  ngOnInit() {
    console.log(this.pokemon);
  }
}

