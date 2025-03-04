import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  errorLogin: boolean = false;
  

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  login(formData: any): void {
      //console.log(formData.value);

      this.authService.login(formData.value).subscribe({
        next: () => this.router.navigate(['/contacts']),
        error: (err: any) => {
         // console.log(err.error);
           
          if (err.error.statusCode) {
            //console.log('Podałeś błędne hasło lub login');

            this.errorLogin = true;
          }
        }
      })
  }

  createUserView(event: Event) {
    event.preventDefault();
    this.router.navigate(['/create']);
  }

}
