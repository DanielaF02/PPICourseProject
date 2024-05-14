import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    FormsModule
  ],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  selectedReview: string = '';
  text: string = '';

  onSubmit(form: NgForm) {
    window.alert('Благодарим за вашия отзив!');
    this.selectedReview = '';
    form.reset();
  }
}
