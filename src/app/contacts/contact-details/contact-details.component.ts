import { Component } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute } from '@angular/router';
import { JwtService } from '../../auth/jwt.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent {

  dataSource: any;

  private idUser: any;
  
  constructor
  (private contactsService: ContactsService, 
    private route: ActivatedRoute, 
    private jwtService: JwtService) {}
  
  ngOnInit() {
    this.idUser = this.jwtService.id;
    this.getContactComponent();
  }
  
  getContactComponent(): void {

    const contactId: number = this.route.snapshot.params['id'];
    
    this.contactsService.getContactService(contactId, this.idUser).subscribe(dataFromSrv => {
      //console.log(dataFromSrv)
      this.dataSource = dataFromSrv;
      
    });
    
  }
}

