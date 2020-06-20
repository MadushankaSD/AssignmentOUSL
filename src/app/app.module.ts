import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponentComponent } from './employee-component/employee-component.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { ContactComponentComponent } from './contact-component/contact-component.component';
import { NavbarComponentComponent } from './navbar-component/navbar-component.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponentComponent,
    ContactComponentComponent,
    NavbarComponentComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'employee',component:EmployeeComponentComponent},
      {path:'connectUs',component:ContactComponentComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
