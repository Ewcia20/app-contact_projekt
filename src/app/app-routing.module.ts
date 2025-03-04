import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsListComponent } from './contacts/contacts-list/contacts-list.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { LoginComponent } from './users/login/login.component';
import { authGuard } from './auth/auth.guard';
import { CreateComponent } from './users/create/create.component';

const routes: Routes = [
  {path: '', pathMatch: 'full',redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'contacts', component: ContactsListComponent, canActivate:[authGuard]},
  {path: 'create', component: CreateComponent},
  {path: 'contact-details/:id', component: ContactDetailsComponent,canActivate:[authGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
