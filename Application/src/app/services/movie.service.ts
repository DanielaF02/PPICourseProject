import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../types';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movies: Movie[] = [];
  private http = inject(HttpClient);

  getMovies(): Movie[] {
    return this.movies;
  }

  setMovies(movies: Movie[]) {
    this.movies = movies;
  }

  getMoviesFromFile(): Observable<Movie[]> {
    return this.http.get<Movie[]>('assets/data/movies.json');
  }
}
