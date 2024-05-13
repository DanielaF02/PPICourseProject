import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { MovieService } from './services/movie.service';
import { Movie } from './types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private authService = inject(UserService);
  private movieService = inject(MovieService);

  constructor(private router: Router) {
    this.authService.getUsersFromFile().subscribe((users) => {
      this.authService.setUsers(users);
    });

    this.movieService.getMoviesFromFile().subscribe((movies: Movie[]) => {
      this.movieService.setMovies(movies)
    });

    this.router.events.subscribe(event => {
      // console.log(event);
      if (event instanceof NavigationStart) {
        if (event.url === '/') {
          this.router.navigateByUrl('home');
        }
      }
    });
  }
}
