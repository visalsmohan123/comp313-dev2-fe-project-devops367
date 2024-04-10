import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../apiConfig';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {
  showDonorForm: boolean = false;
  showDonorDetails: boolean = false;
  userForm!: FormGroup;
  userData: any; // Mocked user data
  userId: string= ''; 
  formData: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
    , private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      this.userId = JSON.parse(storedUser);
    } else {
      console.error('User ID not found in session storage.');
      return;
    }
    // Make GET request to fetch user data
    this.http.get<any>(`${API_BASE_URL}/users/${this.userId}`).subscribe(
      userData => {
        // Assign fetched user data to userData property
        this.userData = userData;
  
        // Initialize form with fetched user data
        this.userForm = this.formBuilder.group({
          name: [userData.name],
          gender: [userData.gender],
          dob: [userData.dob],
          phone: [userData.phone],
          city: [userData.city],
          state: [userData.state],
          zip: [userData.zip],
          country: [userData.country],
          bloodType:[userData.bloodType],
          weight: [userData.weight],
          height: [userData.height],
          medicalConditions: [userData.medicalConditions],
          lastDonation: [userData.lastDonation]
          // Add more form controls as needed
        });
      },
      error => {
        console.error('Error fetching user data:', error);
        // Handle error
      }
    );
  }
  

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUserData = this.userForm.value;
      console.log('Updated user data:', updatedUserData);

      // Make PUT request to update user data
      this.http.put<any>(`${API_BASE_URL}/users/${this.userId}`, updatedUserData).subscribe(
        response => {
          console.log('User data updated successfully:', response);
          // Handle success response
          this.showSnackBar('Update Successfull');

        },
        error => {
          console.error('Error updating user data:', error);
          this.showSnackBar('Update Failed');
        }
      );
    } else {
      console.error('Form is invalid. Cannot submit.');
      this.showSnackBar('Form is invalid. Cannot submit.');

    }
  }

  onSubmitDonate(): void {
    if (this.userForm.valid) {
      this.formData = this.userForm.value;
      this.http.post<any>(`${API_BASE_URL}/blooddonors/${this.userId}/blooddonors`, this.formData).subscribe(
        response => {
          console.log('Form data submitted successfully:', response);
          this.showSnackBar('Submitted Successfully');
        },
        error => {
          console.error('Error submitting form data:', error);
          // Handle error
          this.showSnackBar('Submission Failed');
        }
      );
    } else {
      console.error('Form is invalid. Cannot submit.');
      this.showSnackBar('Form is invalid. Cannot submit.');
    }
  }

  toggleDonorForm() {
    this.showDonorForm = !this.showDonorForm;
  }
  toggleDonorDetailsForm() {
    this.showDonorDetails = !this.showDonorDetails;
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
