import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginModel = {
    email: '',
    password: ''
  };
  error: string = '';
  passHidden: boolean = true;

  private router = inject(Router);
  private authService = inject(UserService);

  login(f: NgForm) {
    this.error = '';

    if (f.valid) {
      const registeredUsers = this.authService.getUsers();
      const foundUser = registeredUsers.find(user => user.email == this.loginModel.email && user.password == this.loginModel.password);
      if (foundUser) {
        localStorage.setItem('logged_user', JSON.stringify(foundUser));
        this.authService.isLogged.next(true);
        this.router.navigateByUrl('/movies');
      } else {
        this.error = 'Не съществува потребител с тези данни';
      }
    } else {
      this.error = 'Невалидни имейл или парола';
    }
  }
}
