import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddBoutonComponent } from './components/elements/add-bouton/add-bouton.component';
import { TaskCardComponent } from './components/elements/task-card/task-card.component';

@NgModule({
  declarations: [
    AppComponent,
    AddBoutonComponent,
    TaskCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
