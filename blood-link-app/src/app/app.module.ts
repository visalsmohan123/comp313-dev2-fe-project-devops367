import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { ContactComponent } from './modules/contact/contact.component';
import { AboutComponent } from './modules/about/about.component';
import { RegisterComponent } from './modules/register/register.component';
import { HomepageComponent } from './modules/homepage/homepage.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { EligibilityComponent } from './modules/eligibility/eligibility.component';
import { FAQSComponent } from './modules/faqs/faqs.component';
import { AdminScreenComponent } from './modules/admin-screen/admin-screen.component';
import { DonorComponent } from './modules/donor/donor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { RecipientComponent } from './modules/recipient/recipient.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactComponent,
    AboutComponent,
    RegisterComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    EligibilityComponent,
    FAQSComponent,
    AdminScreenComponent,
    DonorComponent,
    RecipientComponent
  ],
  imports: [
  
    BrowserModule,
    ReactiveFormsModule, 
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule ,
    MatButtonModule,
    MatSnackBarModule,
    CommonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
