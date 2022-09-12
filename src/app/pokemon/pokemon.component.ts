import { ChangeDetectionStrategy, Component , Attribute, Output, OnInit} from '@angular/core';
import { Pagination } from '../paginator/paginator.component';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { PokemonStateService } from './pokemon-state.service';
import { debounceTime } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.html',
  styleUrls: ['./pokemon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PokemonStateService],
})
export class PokemonComponent implements OnInit {

  vm$ = this.pokemonStateService.vm$;
  count: number;
  form = new FormGroup({
    search: new FormControl('', Validators.required),
    weight: new FormControl(0, Validators.required),
    height: new FormControl(0, Validators.required),
    eq: new FormControl('', Validators.required),
    gt: new FormControl('', Validators.required),
    lt: new FormControl('', Validators.required)
  });
   
  ngOnInit(){

  }
  constructor(private readonly pokemonStateService: PokemonStateService, private pokemonService: PokemonService) {
    this.form
    .valueChanges
    .pipe(debounceTime(500))
    .subscribe((dataValue: any ) => {
      this.onQueryChanged(dataValue);
    });
  }


  onPageChanged({ rows, page, first }: Pagination) {
   this.nextCount(first);
    
    this.pokemonStateService.set(({ limit }) => {
      if (rows !== limit) {
        return {
          currentPage: 1,
          limit: rows,
          offset: 0,
          query: '',
        };
      }

      return {
        currentPage: page,
        limit: rows,
        offset: first - rows,
        query: '',
      };
    });
  }

  onQueryChanged(query: string) {

   this.pokemonStateService.set({ query });
  }
  reset_filter(){
    this.form.reset();
  }
  nextCount(value : number) {
    this.pokemonService.nextCount(value);
  }
}
