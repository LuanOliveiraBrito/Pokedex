import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class PokeApiService {

  private url : string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100'
  constructor(private http: HttpClient) { }

  get apiListAllPokemons() : Observable<IPokemon> {
    return this.http.get<IPokemon>(this.url).pipe(
      tap(res => res),
      tap (res => res.results.map ( (resPokemons : any) => {
      this.http.get<any>(resPokemons.url).pipe(
        res => res
      ).subscribe(res => resPokemons.status = res)
      }))
    )
  }
}

export interface IPokemon {
    count: number;
    next: string;
    previous?: string;
    results: { name: string; url: string }[];
  }
