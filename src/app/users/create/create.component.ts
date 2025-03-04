import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  infoCreate: boolean = false;

  constructor(private readonly router: Router, private readonly usersService: UsersService) {}

  loginUserView(event: Event) {
    event.preventDefault();
    this.router.navigate(['/login']);
  }
  createUser(dataForm: any) {
  

      this.usersService.createUser(dataForm.value).subscribe(dataFromSrv => {

        this.infoCreate = true;
        dataForm.reset();
  
  
      });
     
  }

}

