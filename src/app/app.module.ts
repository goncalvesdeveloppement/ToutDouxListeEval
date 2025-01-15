import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddBoutonComponent } from './components/elements/add-bouton/add-bouton.component';
import { TaskCardComponent } from './components/elements/task-card/task-card.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { DashboardGroupComponent } from './components/elements/dashboard-group/dashboard-group.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/views/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutButtonComponent } from './components/elements/logout-button/logout-button.component';
import { LogoutComponent } from './components/views/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    AddBoutonComponent,
    TaskCardComponent,
    DashboardComponent,
    DashboardGroupComponent,
    LoginComponent,
    LogoutButtonComponent,
    LogoutComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
