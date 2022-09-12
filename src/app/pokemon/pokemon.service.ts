import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { toApiResponse } from '../utils/to-api-response.util';

import { PaginatedPokemon } from './pokemon.model';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  constructor(private readonly httpClient: HttpClient) {
    this.count  = new BehaviorSubject(this.counter);
  }
  counter = 20;
  count: BehaviorSubject<number>;
  
  baseUrl = 'http://localhost:8080/api/';
  getPokemon(
    limit: number = 20,
    offset: number = 0,
    prev: PaginatedPokemon
  ): Observable<{ status: 'loading' | 'success'; data: PaginatedPokemon }> {
    const params = {
      limit: limit.toString(),
      offset: offset.toString(),
    };

    return this.httpClient
      .get<PaginatedPokemon>(this.baseUrl + 'all/', { params })
      .pipe(delay(1500), toApiResponse(prev));
  }
  nextCount(value : number) {
    this.count.next(value);
  }
}
