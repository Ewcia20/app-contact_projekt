import { Injectable } from '@angular/core';
import { jwtDecode } from  'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  private get rawToken(): string | null {
    return sessionStorage.getItem('access_token');
  }

  private decodeToken(): any | null  {
    const token = this.rawToken;

    if(token) {

      try {

        return jwtDecode(token);

      } catch(error) {

        return null;
      }
      
    } else {

      return null;
    }
  }

  get id(): number | null {

    const decodeToken = this.decodeToken();

    if(decodeToken && decodeToken.id !== undefined) {
      return decodeToken.id;

    }

    return null;
  }
}
