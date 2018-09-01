import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  private baseUrl = environment.apiUrl + 'auth/';
  private registerUrl = this.baseUrl + 'register';
  private loginUrl = this.baseUrl + 'login';

  private TOKEN_KEY = 'token'

  constructor(private http: HttpClient) { }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY)
  }

  registerUser(registerData) {
    this.http.post<any>(this.registerUrl, registerData)
      .subscribe(response => this.saveToken(response.token));
  }

  loginUser(loginData) {
    this.http.post<any>(this.loginUrl, loginData)
      .subscribe(response => this.saveToken(response.token));
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token)
  }
}
