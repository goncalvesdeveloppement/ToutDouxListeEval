import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit {
  loginError: boolean = false;
  @Input() email: string = "";
  @Input() password: string = "";

  constructor(private apiService: ApiService, private router: Router, private local: StorageService, private route: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit() {
  }

  // Lors de la soumission des identifiants (tentative de connexion)
  onCredentialsSubmit() {
    this.apiService.getLoggedUser(this.email, this.password).subscribe({
      next: (data) => {
        if (!data) { // Si aucun utilisateur correspondant
          this.loginError = true;
          this.authService.setLoggedUser(null);
        }
        else if (data.id == 0) { // Si utilisateur 0, équivaut à un visiteur
          this.loginError = true;
          this.authService.setLoggedUser(null);
        }
        else {
          this.loginError = false;
          this.local.saveData("loggedUser", JSON.stringify(new User(data.id, data.email, data.password, data.name)));
          this.authService.setLoggedUser(data);
          this.router.navigateByUrl("/");
        }
      }
    });
  }
}