import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loggedUserSubject = new BehaviorSubject<User | null>(null);
  loggedUser$ = this.loggedUserSubject.asObservable();

  constructor(private local: StorageService, private apiService: ApiService) {
    this.initializeLoggedUser();
  }

  get loggedUser(): User {
    return this.loggedUserSubject.value ?? new User(0, "", "", "", ["VISITOR"]);
  }

  setLoggedUser(user: User | null) {
    this.loggedUserSubject.next(user);
  }

  initializeLoggedUser(): void {
    const userData = this.local.getData("loggedUser");

    if (userData) {
      const parsedUser = JSON.parse(userData);
      this.setLoggedUser(new User(parsedUser.id, parsedUser.email, parsedUser.password, parsedUser.name, parsedUser.roles));
    }
  }

  // Vérifie si utilisateur connecté avant accès à une page sensible
  checkLoginStatus(): boolean {
    if (!this.loggedUser) {
      this.initializeLoggedUser();
    }
    return this.loggedUser != null;
  }
}