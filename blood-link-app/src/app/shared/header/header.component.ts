import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent  implements OnInit{
  isNavbarOpen = false;
  isLoggedIn: boolean = false;
  userLink: string = '/user';
  constructor(private authService: AuthService, private router: Router) { }

  toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen;
  }

  ngOnInit(): void {
      // Subscribe to changes in authentication status
      this.authService.isLoggedIn$.subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
        if (isLoggedIn) {
          // User is logged in, get user role
          const userRoles = this.authService.getUserRoles();
          // Set user link based on user roles
          this.setUserLink(userRoles);
        }
      });
  //     if (this.isLoggedIn) {
  //       // User is logged in, subscribe to userRole$ observable
  //       this.authService.userRole$.subscribe((role: string) => {
  //         // Navigate to user screen based on role
  //         if (role === 'Admin') {
  //           this.router.navigateByUrl('/admin');
  //         } else if (role === 'BloodDonor') {
  //           this.router.navigateByUrl('/donor');
  //         } else if (role === 'BloodRecipient') {
  //           this.router.navigateByUrl('/recipient');
  //         }
  //       });
  // }
}
setUserLink(userRoles: string[]): void {
  // Logic to set user link based on user roles
  if (userRoles.includes('Admin')) {
    this.userLink = '/admin';
  } else if (userRoles.includes('BloodDonor')) {
    this.userLink = '/donor';
  } else if (userRoles.includes('BloodRecipient')) {
    this.userLink = '/recipient';
  }
}
  // Method to handle logout
  logout(): void {
    // Call logout method from AuthService
    this.authService.logout();
    this.isLoggedIn = false;

    // Redirect to the login page after logout
    this.router.navigate(['/login']);
  }
}
