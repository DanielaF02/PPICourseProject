import { MatIconModule } from '@angular/material/icon';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../login/login.component.css']
})
export class RegisterComponent {
  registerModel = {
    email: '',
    name: '',
    password: ''
  };
  error: string = '';
  passHidden: boolean = true;

  private router = inject(Router);
  private authService = inject(UserService);

  register(f: NgForm) {
    this.error = '';
    if (f.valid) {
      const registeredUsers = this.authService.getUsers();
      const match = registeredUsers.find(user => user.email == this.registerModel.email);
      if (match) {
        this.error = 'Потребител с този имейл вече съществува';
        return;
      }

      const lastUser = registeredUsers[registeredUsers.length - 1];
      const newUser = {...this.registerModel, id: lastUser.id + 1, reservations: []};
      this.authService.register(newUser);
      this.router.navigateByUrl('/login');
    } else {
      this.error = 'Невалидни данни';
    }
  }
}
