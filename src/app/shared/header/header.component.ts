import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private readonly authService: AuthService) {}

  logout() {

    const confLogout = confirm('Czy chcesz się wylogować?');

    if(confLogout) {

      this.authService.logout();
    }
  }

}
