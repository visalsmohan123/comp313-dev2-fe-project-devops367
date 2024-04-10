import { Component } from '@angular/core';

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.css']
})
export class RecipientComponent {
  showRecepientForm: boolean = false;

  toggleDonorForm() {
    this.showRecepientForm = !this.showRecepientForm;
  }
}
