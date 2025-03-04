import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseApiUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  createUser(data: object): Observable<any> {
    return this.httpClient.post(`${this.baseApiUrl}/users`,data);
  }
}
