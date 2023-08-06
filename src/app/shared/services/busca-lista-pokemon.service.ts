import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class BuscaListaPokemonService {

  constructor(private http: HttpClient) { }

  buscarLista(pagina: number) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${pagina}`);   
  }

  getPokemons(url: string){
    return this.http.get(url);
  }

  getSpecies(id: number){
    let url = 'https://pokeapi.co/api/v2/pokemon-species/'+id+'/';
    return this.http.get(url);
  }

}
