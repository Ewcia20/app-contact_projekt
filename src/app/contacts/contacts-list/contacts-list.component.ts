import { Component, Input } from '@angular/core';
import { ContactModel } from '../../models/contacts-models';
//import { CONTACTS } from '../../data/contact-data';
import { ContactsService } from '../contacts.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContactAddModComponent } from '../contact-add-mod/contact-add-mod.component';
import { JwtService } from '../../auth/jwt.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss',
})
export class ContactsListComponent {
  @Input() searchParams?: { searchText: string; searchData: string };
  results: any[] = [];
  showMessage = false;

  pageSize = 10;
  currentPage = 0;
  count = 0;
  dataSource: ContactModel[] = [];
  
  displayedColumns: string[] = ['lp', 'surname', 'firstname', 'city', 'action'];
  
  
  private idUser: any;
  searchError = false;
  
  constructor(
    private contactsService: ContactsService,
    private dialog: MatDialog,
    private jwtService: JwtService
  ) {}
  
  ngOnInit() {
    this.idUser = this.jwtService.id;
    // this.getCountComponent();
    this.getContactsComponent();
  }
  

  search(params: { searchText: string; searchData: string }) {
  if (!params.searchText && !params.searchData) {
    this.currentPage = 0;
    this.getContactsComponent();
    this.searchError = false;
    return;
  }
 
  this.contactsService
    .searchContactsService(params, this.idUser)
    .subscribe((dataFromSrv) => {
      this.dataSource = dataFromSrv;
      this.searchError = this.dataSource.length === 0;
      this.currentPage = 0;
      this.count = this.dataSource.length;
    });
}
//   search(params: { searchText: string; searchData: string }) {
//   this.contactsService
//     .searchContactsService(params, this.idUser)
//     .subscribe((dataFromSrv) => {
//       this.dataSource = dataFromSrv;
//       this.searchError = this.dataSource.length === 0;
//       this.currentPage = 0;
//       this.count = this.dataSource.length;
//     });
// }
  
 getContactsComponent(): void {
  const offset = this.currentPage * this.pageSize;
  this.contactsService
    .getCountService(this.idUser, offset, this.pageSize)
    .subscribe((response) => {
      this.dataSource = response.contacts;
      this.count = response.count;
    });
  }
  // getCountComponent(): void {
  //   this.contactsService
  //   .getCountService(this.idUser)
  //   .subscribe(CountContacts => {
      
  //     this.count = CountContacts.count;
  //   });
  // }
  
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
      if (dataClose && dataClose.reload === 1) {
        if (dataClose.newContact) {
          this.dataSource.unshift(dataClose.newContact);
          this.currentPage = 0;
        } else {
          this.getContactsComponent();
        }
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
      
        // get paginatedDataSource(): ContactModel[] {
        //   const start = this.currentPage * this.pageSize;
        //   return this.dataSource.slice(start, start + this.pageSize);
        // }
      
        get totalPages(): number {
          return Math.ceil(this.count / this.pageSize);
        }
      
        nextPage() {
          if (this.currentPage < this.totalPages - 1) {
            this.currentPage++;
            this.getContactsComponent();
          }
        }
      
        prevPage() {
          if (this.currentPage > 0) {
            this.currentPage--;
            this.getContactsComponent();
          }
        }
  
}
