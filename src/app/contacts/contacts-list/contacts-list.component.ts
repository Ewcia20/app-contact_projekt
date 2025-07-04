import { Component } from '@angular/core';
import { ContactModel } from '../../models/contacts-models';
//import { CONTACTS } from '../../data/contact-data';
import { ContactsService } from '../contacts.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContactAddModComponent } from '../contact-add-mod/contact-add-mod.component';
import { JwtService } from '../../auth/jwt.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';



@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss'
})
export class ContactsListComponent {
  
  
  displayedColumns: string[] = ['lp', 'surname', 'firstname', 'city', 'action'];
  
  dataSource: ContactModel[] = [];
  
  private idUser: any;
  searchForm: any;
  surname: any;

  protected hideBack = true;


    searchOptions: any = [
      {value: 'surname', viewValue: 'Nazwisko'},
      {value: 'firstname', viewValue: 'Imię'},
      {value: 'city', viewValue: 'Miasto'},
    ];

    errorBack: boolean = false;

  
  constructor(
    private contactsService: ContactsService, 
    private dialog: MatDialog,
    private jwtService: JwtService,
    private fb: FormBuilder,
  ) {}
  
  ngOnInit() {
    this.idUser = this.jwtService.id;
    // console.log(this.idUser);
    this.getContactsComponent();
    this.buildReactiveFormSearch();
  }
  
  getContactsComponent(): void {
    
    this.contactsService.getContatsService(this.idUser).subscribe(dataFromSrv => {
      //console.log(dataFromSrv)       
      this.dataSource = dataFromSrv;  
    });
    
  }

 
buildReactiveFormSearch() {

  const searchPattern: string | RegExp = '^[A-ż]{2,50}$'; 

    this.searchForm = this.fb.group({
      searchData: ['',[Validators.required, Validators.pattern(searchPattern)]],
      searchText: ['', [Validators.required, Validators.pattern(searchPattern)]],
    });
    // [Validators.required, Validators.pattern(searchPattern)]
  }

  searchContacts(){

    this.hideBack = false;
    
    const data = this.searchForm.value;
    

    this.searchForm.reset();
    
    this.contactsService.searchContactsService(data, this.idUser).subscribe(dataFromSrv => {
      this.dataSource = dataFromSrv; 
      
      if(this.dataSource.length === 0) {
        this.errorBack = true;
      } else {
        this.errorBack = false;
      } 
    
  });

  }
  clearSearch() {

    this.hideBack = true;
   this.searchForm.reset();
   ['searchText', 'searchData'].forEach(field => {
   const control = this.searchForm.get(field);
   control?.clearValidators();
   control?.updateValueAndValidity();
});

   
   this.errorBack = false;
   this.hideBack.valueOf();
   this.getContactsComponent();
  
  
    }
  
  openAddModComponent(idContact?: number) {

    const dialogConfig = new MatDialogConfig;

    dialogConfig.width = '90%';
    dialogConfig.height = '90%';

    dialogConfig.data = {
      idContact
    }

    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(ContactAddModComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dataClose => {
      if(dataClose.reload === 1) {
        this.getContactsComponent();
      }
    }) 
  }
   
  removeContactComponent(id: number): void {

    const queryDel = confirm('Czy napewno usunąć ten kontakt?');

    console.log(queryDel);

    if(queryDel) {
      this.contactsService.removeContactService(id).subscribe(() => {
        this.getContactsComponent();
      });
    }
  }
  
}
