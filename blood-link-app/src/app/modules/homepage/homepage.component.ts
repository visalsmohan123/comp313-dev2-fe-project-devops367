import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { API_BASE_URL } from '../../apiConfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  donors: any[] = [];

    constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  slides = [
    { image: 'assets/homepage_image_3.png', title: 'Title 1', text: 'Message for slide 1.' },
    { image: 'assets/homepage_image_1.png', title: 'Title 2', text: 'Message for slide 2.' },
    { image: 'assets/homepage_image_2.png', title: 'Title 3', text: 'Message for slide 3.' }
  ];
  currentSlideIndex = 0;

  ngOnInit() {
    this.fetchDonors();

    setInterval(() => {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
    }, 7000); // Rotate every 7 seconds
  }

  onDonateClick() {
    if (this.authService.isLoggedIn()) {
      // Redirect to the post-login page
      this.authService.activateRoutesBasedOnRole();
    }
    else{
  // Redirect to the login page
  this.router.navigate(['/login']);
    }
  }

  fetchDonors() {
    this.http.get<any[]>(`${API_BASE_URL}/blooddonors`)
      .subscribe(
        (response) => {
          this.donors = response;
        },
        (error) => {
          console.error('Error fetching donors:', error);
        }
      );
  }
}



