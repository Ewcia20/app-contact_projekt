import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private baseApiUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  getContatsService(idUser: number): Observable<any> {
    return this.httpClient.get(`${this.baseApiUrl}/contacts/${idUser}`);
  }

  getContactService(idContact: number, idUser: number): Observable<any> {
    return this.httpClient.get(`${this.baseApiUrl}/contacts/${idContact}/${idUser}`);
  }

  removeContactService(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseApiUrl}/contacts/${id}`);
  }
  
  searchContactsService(surname: string, value: any): Observable<any> {
    return this.httpClient.post(`${this.baseApiUrl}/contacts/search`, {surname});
  }
  
  addNewContactService(data: object): Observable<any> {
    return this.httpClient.post(`${this.baseApiUrl}/contacts`,data);
  }

  modContactService(id: number, data: object): Observable<any> {
    return this.httpClient.put(`${this.baseApiUrl}/contacts/${id}`,data);

  }

}
