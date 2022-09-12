import { Component, OnInit, ViewChild  } from '@angular/core';
import { PokemonStateService } from '../pokemon/pokemon-state.service';
import { PokemonComponent } from '../pokemon/pokemon.component';
import { PokemonService } from '../pokemon/pokemon.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild(PokemonComponent)
  private pokemonComponent: PokemonComponent;
  counter : number;
  constructor(private readonly pokemonStateService: PokemonStateService, 
    private pokemonService: PokemonService,
) {
    
   }
  vm$ = this.pokemonStateService.vm$;

  
  ngOnInit(): void {
   
      this.pokemonService.count.subscribe(c => {
        this.counter = c;
      });
    

  }

}
