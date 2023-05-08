import { TestBed } from '@angular/core/testing';

import { BuscaListaPokemonService } from './busca-lista-pokemon.service';

describe('BuscaListaPokemonService', () => {
  let service: BuscaListaPokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscaListaPokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
