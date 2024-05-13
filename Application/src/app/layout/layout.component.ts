import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../types';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  loggedUser: User | undefined;
  
  private authService = inject(UserService);
  private movieService = inject(MovieService);

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('logged_user')!);

    this.authService.isLogged.asObservable().subscribe((isLogged: boolean) => {
      if (isLogged) {
        this.loggedUser = JSON.parse(localStorage.getItem('logged_user')!);
      }
    });
  }

  showHighestRatedMovies() {
    this.movieService.getMoviesFromFile().subscribe((movies) => {
      let highestRating = 0;
      let bestMovie: any;

      for (const movie of movies) {
        if (movie.rate > highestRating) {
          highestRating = movie.rate;
          bestMovie = movie;
        }
      }

      window.alert(`Филмът с най-висок рейтинг е ${bestMovie.title} с рейтинг ${bestMovie.rate}!`);
    });
  }

  logout() {
    localStorage.removeItem('logged_user');
    this.loggedUser = undefined;
    this.authService.isLogged.next(false);
  }
}
