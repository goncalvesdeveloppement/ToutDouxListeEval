import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddBoutonComponent } from './components/elements/add-bouton/add-bouton.component';
import { TaskCardComponent } from './components/elements/task-card/task-card.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { DashboardGroupComponent } from './components/elements/dashboard-group/dashboard-group.component';

@NgModule({
  declarations: [
    AppComponent,
    AddBoutonComponent,
    TaskCardComponent,
    DashboardComponent,
    DashboardGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
