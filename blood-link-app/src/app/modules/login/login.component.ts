import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // Check if the user is already logged in
    if (this.authService.isLoggedIn()) {
      // Redirect to the post-login page
      this.authService.activateRoutesBasedOnRole();
    }
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        // Store the user information in session storage
        sessionStorage.setItem('user', JSON.stringify(response.userId));
        // Redirect to the post-login page
        this.authService.setUserRoles(response.userType);
        this.authService.setLoggedIn(true);
        this.authService.activateRoutesBasedOnRole();
        this.showSnackBar('Logged In successfully');

      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid username or password.';
        this.showSnackBar('Log In Failed');

      }
    });
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
