import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  public login(requestLogin: { email: string; password: string }) {
    return this.http.post('http://localhost:3001/user/auth', requestLogin);
  }
}
