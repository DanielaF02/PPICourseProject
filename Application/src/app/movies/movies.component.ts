import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../types';
import { MovieService } from '../services/movie.service';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    CommonModule,
    MovieCardComponent,
  ],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  bestMovie!: Movie;

  private movieService = inject(MovieService);
  private router = inject(Router);

  ngOnInit(): void {
    this.movies = this.movieService.getMovies()
    this.bestMovie = this.movies[0];
    this.movies = this.movies.filter((movie) => movie.id !== this.bestMovie.id);
  }

  openMovieReservePage() {
    const loggedUser = localStorage.getItem('logged_user');
    if (loggedUser) {
      this.router.navigateByUrl(`reserve/${this.bestMovie.id}`);
    } else {
      this.router.navigateByUrl('login');
    }
  }

  trackByFn(index: number, movie: Movie): number {
    return movie.id;
  }
}
