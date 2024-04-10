import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './modules/homepage/homepage.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { AboutComponent } from './modules/about/about.component';
import { ContactComponent } from './modules/contact/contact.component';
import { WhyDonateComponent } from './modules/whydonate/whydonate.component';
import { EligibilityComponent } from './modules/eligibility/eligibility.component';
import { FAQSComponent } from './modules/faqs/faqs.component';
import { DonorComponent } from './modules/donor/donor.component';
import { RecipientComponent } from './modules/recipient/recipient.component';
import { AdminScreenComponent } from './modules/admin-screen/admin-screen.component';

const routes: Routes = [
  {path : '' , component : HomepageComponent},
  {path : 'contact-us' , component : ContactComponent},
  {path : 'about' , component : AboutComponent},
  {path : 'register' , component : RegisterComponent},
  {path : 'login' , component : LoginComponent},
  {path: 'why-donate', component: WhyDonateComponent},
  {path : 'eligibility' , component : EligibilityComponent},
  {path : 'donor', component: DonorComponent},
  {path : 'recipient' , component: RecipientComponent},
  {path : 'faqs' , component : FAQSComponent},
  {path : 'admin' , component : AdminScreenComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
