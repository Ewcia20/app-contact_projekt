import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactsListComponent } from '../contacts-list/contacts-list.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactsService } from '../contacts.service';
import { T } from '@angular/cdk/keycodes';
import { JwtService } from '../../auth/jwt.service';

@Component({
  selector: 'app-contact-add-mod',
  templateUrl: './contact-add-mod.component.html',
  styleUrl: './contact-add-mod.component.scss'
})
export class ContactAddModComponent {

  addModForm: any;

  dataOld: any;

  dataNew: any;

  comData: boolean = true;

  contactId: number = 0;

  private idUser: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataModal: any,
    public dialogRef: MatDialogRef<ContactsListComponent>,
    private fb: FormBuilder,
    private contactService: ContactsService,
    private jwtService: JwtService,
  ) {
    //console.log(dataModal.idContact);
  }

  ngOnInit() {
    this.idUser = this.jwtService.id;
    this.buildReactiveForm();
    if(this.dataModal.idContact) {
      this.contactId = this.dataModal.idContact;
      this.getContact();

    }
  }

  buildReactiveForm() {

    const stringPattern: string | RegExp = '^[A-ż][A-ż\\s]{2,29}$'; 
    const phoneNumberPattern: string | RegExp = '^(\\+?[0-9]{1,3}[ ]?)?(\\([0-9]{1,4}\\)[ ]?)?[0-9]{3}[ ]?[0-9]{3}[ ]?[0-9]{0,4}$'; 

    this.addModForm = this.fb.group({
      surname: ['', [Validators.required, Validators.pattern(stringPattern)]],
      firstname: ['', [Validators.required, Validators.pattern(stringPattern)]],
      phoneNumber: ['', Validators.pattern(phoneNumberPattern)],
      email: ['', Validators.email],
      city: ['', [Validators.required, Validators.pattern(stringPattern)]],
    });

  }

  addNewContact(): void {


     const data = this.addModForm.value;
     data.id_user = this.idUser;
     
    this.contactService.addNewContactService(data).subscribe(dataFromSrv => {
      this.dialogRef.close({reload: 1});

    });
   
  }

  getContact(): void {
    this.contactService.getContactService(this.contactId,this.idUser).subscribe(dataFromSrv => {
      //console.log(dataFromSrv);

      this.addModForm.patchValue({
      surname: dataFromSrv.surname,
      firstname: dataFromSrv.firstname,
      phoneNumber: dataFromSrv.phoneNumber,
      email: dataFromSrv.email,
      city: dataFromSrv.city
      });

      this.dataOld = this.addModForm.value;

    });
  }
  

  modContact() {
    this.contactService.modContactService(this.contactId, this.addModForm.value).subscribe(dataFromSrv => {
      this.dialogRef.close({reload: 1});

    });
  }
  
  closeModal() {
    this.dialogRef.close({reload: 0});
  }

  comprateData() {
    this.dataNew = this.addModForm.value;
    if(JSON.stringify(this.dataOld) != JSON.stringify(this.dataNew)) {
      this.comData = false;
    } else {
      this.comData = true;
    }
    // console.log(this.dataNew);
    // console.log(this.dataOld);

  }

}
