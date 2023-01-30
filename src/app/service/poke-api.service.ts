import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, Observable, tap } from 'rxjs';
import { IPokemon } from '../shared/Interfaces/IPokemons';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100';
  constructor(private http: HttpClient) {}

  get apiListAllPokemons(): Observable<IPokemon> {
    return this.http.get<IPokemon>(this.url).pipe(
      tap((res) => res.results.map((resPokemons: any) => {
        this.apiGetPokemons(resPokemons.url).subscribe(res => resPokemons.status = res)
      }))
    );
  }

  apiGetPokemons(url: string) : Observable<any> {
    return this.http.get<any>(url).pipe((res) => res);
  }
}

