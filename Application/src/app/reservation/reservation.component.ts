import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../services/movie.service';
import { Movie, Seat, User } from '../types';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterLink
  ],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit, AfterViewInit {
  @Input({ required: true }) id!: number;

  @ViewChild('buyBtn') buyBtn!: ElementRef<HTMLButtonElement>;

  movie!: Movie;
  loggedUser: User | undefined;
  standardTickets: number = 0;
  studentTickets: number = 0;
  seatsToReserve: number = 0;
  reservedSeats: number = 0;
  notReservedSeats: number = 0;
  success: boolean = false;

  private moviesService = inject(MovieService);
  private userService = inject(UserService);
  private router = inject(Router);

  ngOnInit(): void {
    this.userService.isLogged.subscribe(() => {
      if (!localStorage.getItem('logged_user')) {
        this.router.navigateByUrl('login');
      }
    });

    this.loggedUser = JSON.parse(localStorage.getItem('logged_user')!);
    if (this.loggedUser && this.loggedUser.reservations) {
      for (const reservation of this.loggedUser.reservations) {
        if (reservation.movieId == this.id) {
          if (reservation.type == 'regular') {
            this.standardTickets = reservation.seats;
          } else {
            this.studentTickets = reservation.seats;
          }
        }
      }
    };

    const movies = this.moviesService.getMovies();
    this.movie = movies.find((movie) => movie.id == this.id)!;
    this.notReservedSeats = this.movie.seats.filter((seat: Seat) => !seat.reserved).length;
    this.reservedSeats = this.movie.seats.filter((seat: Seat) => seat.reserved && seat.userId == this.loggedUser!.id).length;
  }

  ngAfterViewInit(): void {
    this.checkButtonDisableState();
  }

  calcMaxSeats(): void {
    this.seatsToReserve = this.standardTickets + this.studentTickets;
    if (this.seatsToReserve > this.notReservedSeats) {
      this.seatsToReserve = this.notReservedSeats;
    }
    this.checkButtonDisableState();
  }

  reserveSeat(seat: Seat, index: number): void {
    if (seat.reserved && seat.userId == this.loggedUser!.id) {
      this.movie.seats[index].reserved = false;
      this.movie.seats[index].userId = 0;
      this.reservedSeats--;
      this.checkButtonDisableState();
      return;
    }

    if (seat.reserved || this.seatsToReserve == 0 ||
      (this.seatsToReserve == this.reservedSeats) || (this.seatsToReserve > this.notReservedSeats)) {
      return;
    }
    
    this.movie.seats[index].reserved = true;
    this.movie.seats[index].userId = this.loggedUser!.id;
    this.reservedSeats++;
    this.checkButtonDisableState();
  }

  checkButtonDisableState(): void {
    if (this.buyBtn) {
      if (this.seatsToReserve == 0) {
        this.buyBtn.nativeElement.disabled = true;
        return;
      }
      
      if ((this.seatsToReserve == this.reservedSeats)) {
        this.buyBtn.nativeElement.disabled = false;
      } else {
        this.buyBtn.nativeElement.disabled = true;
      }
    }
  }

  finishPurchase(): void {
    this.success = true;

    const allMovies = this.moviesService.getMovies();
    for (const movie of allMovies) {
      if (movie.id == this.id) {
        movie.seats = this.movie.seats;
        this.moviesService.setMovies(allMovies);
        console.log(this.moviesService.getMovies())
        break;
      }
    }

    if (this.loggedUser) {
      let isSameReservation = false;
      for (const reservation of this.loggedUser.reservations) {
        if (this.id == reservation.movieId) {
          isSameReservation = true;
          reservation.seats = this.seatsToReserve;
        }
      }

      if (!isSameReservation) {
        this.loggedUser.reservations.push({
          movieId: this.id,
          seats: this.seatsToReserve,
          type: 'regular'
        });
      }

      localStorage.setItem('logged_user', JSON.stringify(this.loggedUser));
      const users = this.userService.getUsers();
      for (const user of users) {
        if (user.id == this.loggedUser.id) {
          user.reservations = this.loggedUser.reservations;
          this.userService.setUsers(users);
          console.log(this.userService.getUsers());
          break;
        }
      }
    }
  }
}
