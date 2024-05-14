import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from 'src/app/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    CommonModule,

  ],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  @Input({ required: true }) movie!: Movie;

  private router = inject(Router);

  openMovieReservePage() {
    const loggedUser = localStorage.getItem('logged_user');
    if (loggedUser) {
      this.router.navigateByUrl(`reserve/${this.movie.id}`);
    } else {
      this.router.navigateByUrl('login');
    }
  }
}