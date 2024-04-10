import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { API_BASE_URL } from '../../apiConfig';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  onSubmit() {
    this.http.post<any>(`${API_BASE_URL}/contact`, this.formData)
      .subscribe(
        response => {
          console.log('Form submitted successfully:', response);
          this.showSnackBar('Form submitted successfully');
          // Reset the form after successful submission
          this.formData = {
            name: '',
            email: '',
            subject: '',
            message: ''
          };
        },
        error => {
          console.error('Error submitting form:', error);
          this.showSnackBar('Error submitting form');
        }
      );
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
