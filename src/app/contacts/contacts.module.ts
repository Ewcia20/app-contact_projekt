import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';
import { ContactAddModComponent } from './contact-add-mod/contact-add-mod.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ContactsSearchComponent } from './contacts-search/contacts-search.component';







@NgModule({
  declarations: [
    ContactsListComponent,
    ContactDetailsComponent,
    ContactAddModComponent,
    ContactsSearchComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule,
    SharedModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    
    

  
  ],
  exports: [
    ContactsListComponent
  ]
})
export class ContactsModule { }
