import { Component, Input } from '@angular/core';
import { ContactModel } from '../../models/contacts-models';
//import { CONTACTS } from '../../data/contact-data';
import { ContactsService } from '../contacts.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContactAddModComponent } from '../contact-add-mod/contact-add-mod.component';
import { JwtService } from '../../auth/jwt.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss',
})
export class ContactsListComponent {

  @Input() searchTest: string = 'Miłego dnia';

  displayedColumns: string[] = ['lp', 'surname', 'firstname', 'city', 'action'];

  dataSource: ContactModel[] = [];

  private idUser: any;

  constructor(
    private contactsService: ContactsService,
    private dialog: MatDialog,
    private jwtService: JwtService
  ) {}

  ngOnInit() {
    this.idUser = this.jwtService.id;
    // console.log(this.idUser);
    this.getContactsComponent();
    console.log(this.searchTest);
  }

  getContactsComponent(): void {
    this.contactsService
      .getContatsService(this.idUser)
      .subscribe((dataFromSrv) => {
        //console.log(dataFromSrv)
        this.dataSource = dataFromSrv;
      });
  }

  openAddModComponent(idContact?: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '90%';
    dialogConfig.height = '90%';

    dialogConfig.data = {
      idContact,
    };

    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(ContactAddModComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((dataClose) => {
      if (dataClose.reload === 1) {
        this.getContactsComponent();
      }
    });
  }

  removeContactComponent(id: number): void {
    const queryDel = confirm('Czy napewno usunąć ten kontakt?');

    console.log(queryDel);

    if (queryDel) {
      this.contactsService.removeContactService(id).subscribe(() => {
        this.getContactsComponent();
      });
    }
  }

  searchContacts(data: any) {
    this.contactsService
      .searchContactsService(data, this.idUser)
      .subscribe((dataFromSrv) => {
        this.dataSource = dataFromSrv;

        // if(this.dataSource.length === 0) {
        //   this.errorBack = true;
        // } else {
        //   this.errorBack = false;
        // }
      });
  }
}
