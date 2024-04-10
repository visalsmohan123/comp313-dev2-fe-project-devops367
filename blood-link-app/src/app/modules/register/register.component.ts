import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_BASE_URL } from '../../apiConfig';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      userType: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      // Assuming JSON content type, adjust headers as necessary
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      
      this.http.post(`${API_BASE_URL}/users`, this.registerForm.value, { headers: headers }).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          // Navigate to another route upon success
          this.router.navigate(['/login']); // Adjust route as necessary
          this.showSnackBar('Registration successfull');
        },
        error: (error) => {
          console.error('Error during registration:', error);
          this.showSnackBar('Registration Failed');

        }
      });
    } else {
      console.error('Form is not valid:', this.registerForm.value);
    }
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
