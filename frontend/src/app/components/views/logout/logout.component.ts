import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass']
})
export class LogoutComponent implements OnInit {
  constructor(private local: StorageService, private router: Router, private authService: AuthService) { }

  // Déconnecte l'utilisateur puis le redirige automatiquement vers l'accueil visiteur
  ngOnInit(): void {
    this.authService.setLoggedUser(null);
    this.local.saveData("loggedUser", "");
    this.router.navigateByUrl("/");
  }
}