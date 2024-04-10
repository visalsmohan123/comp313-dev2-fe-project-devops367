import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '../../apiConfig';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-screen',
  templateUrl: './admin-screen.component.html',
  styleUrls: ['./admin-screen.component.css']
})
export class AdminScreenComponent implements OnInit {

  donors: any[] = [];
  recipients: any[] = [];
  messages: any[] = []; 


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchDonors();
    this.fetchRecipients();
    this.fetchMessages();
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

  fetchRecipients() {
    this.http.get<any[]>(`${API_BASE_URL}/donation-requests`)
      .subscribe(
        (response) => {
          this.recipients = response;
        },
        (error) => {
          console.error('Error fetching recipients:', error);
        }
      );
  }

  fetchMessages() {
    this.http.get<any[]>(`${API_BASE_URL}/contact`)
      .subscribe(
        (response) => {
          this.messages = response;
        },
        (error) => {
          console.error('Error fetching messages:', error);
        }
      );
  }
}
