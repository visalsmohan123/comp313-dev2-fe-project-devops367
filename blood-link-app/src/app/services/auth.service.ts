import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable,BehaviorSubject  } from 'rxjs';
import { API_BASE_URL } from '..//apiConfig';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private userRoleSubject = new BehaviorSubject<string>(""); // Subject for emitting user's role
  userRole$ = this.userRoleSubject.asObservable();
  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    // Adjust the payload as per your backend authentication endpoint requirements
    const payload = {
      email: username, // Here we map 'username' to the 'name' expected by the backend
      password: password
    };

    return this.http.post(`${API_BASE_URL}/users/login`, payload);
  }
  setLoggedIn(value: boolean): void {
    this.isLoggedInSubject.next(value);
  }

  getLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
  isLoggedIn(): boolean {
    // Check if the user is logged in by verifying if the user data exists in session storage
    const user = sessionStorage.getItem('user');
    return user !== null;
  }
  logout(): void {
    // Clear the user session
    sessionStorage.removeItem('user');
    // Navigate to the login page after logout
    this.router.navigateByUrl('/home');
  }
  setUserRoles(roles: string[]): void {
    sessionStorage.setItem('userRoles', JSON.stringify(roles));
    this.userRoleSubject.next(roles[0]); 
  }

  getUserRoles(): string[] {
    const rolesJson = sessionStorage.getItem('userRoles');
    return rolesJson ? JSON.parse(rolesJson) : [];
  }

  activateRoutesBasedOnRole(): void {
    const roles = this.getUserRoles();
    if (roles.includes('Admin')) {
      this.router.navigateByUrl('/admin');
    } else if (roles.includes('BloodDonor')) {
      this.router.navigateByUrl('/donor');
    } else if (roles.includes('BloodRecipient')) {
      this.router.navigateByUrl('/recipient');
    } else {
      // Handle case where user has no role or unknown role
      this.router.navigateByUrl('/');
    }
  }
}
