import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('src/app/layout/layout.component').then((c) => c.LayoutComponent),
    children: [
      {
        path: 'login',
        loadComponent: () => import('src/app/login/login.component').then((c) => c.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('src/app/register/register.component').then((c) => c.RegisterComponent)
      },
      {
        path: 'home',
        loadComponent: () => import('src/app/movies/movies.component').then((c) => c.MoviesComponent)
      },
      {
        path: 'reserve/:id',
        loadComponent: () => import('src/app/reservation/reservation.component').then((c) => c.ReservationComponent)
      },
      {
        path: 'review',
        loadComponent: () => import('src/app/review/review.component').then((c) => c.ReviewComponent)
      },
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
