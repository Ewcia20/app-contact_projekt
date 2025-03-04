import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private readonly http: HttpClient, private readonly router: Router) {}

  login(credentials: {login: string, pass: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) =>{
        if(response && response.access_token) {
          sessionStorage.setItem('access_token', response.access_token);
        }
      })
    )
  }

  logout(): void {
    sessionStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  } 

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('access_token');
    return !!token;
   
  }
}
