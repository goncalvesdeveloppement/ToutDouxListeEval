import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.sass']
})
export class LogoutButtonComponent implements OnInit {
  user: User;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.user = this.auth.loggedUser;
  }

}
