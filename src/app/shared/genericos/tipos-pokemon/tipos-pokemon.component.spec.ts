import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposPokemonComponent } from './tipos-pokemon.component';

describe('TiposPokemonComponent', () => {
  let component: TiposPokemonComponent;
  let fixture: ComponentFixture<TiposPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposPokemonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
