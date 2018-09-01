import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';

@Injectable()
export class ApiService {
  private baseUrl = environment.apiUrl;
  private messagesUrl = this.baseUrl + 'posts/';
  private usersUrl = this.baseUrl + 'users';
  private userProfileUrl = this.baseUrl + 'profile/';
  private postUrl = this.baseUrl + 'post';

  constructor(private http: HttpClient) { }

  getMessages(userId) {
    return this.http.get(this.messagesUrl + userId);
    //.subscribe(response => console.log(response));
  }

  postMessage(message) {
    return this.http.post(this.postUrl, message, {responseType: 'text'});
    //.subscribe(response => console.log(response));
  }

  getUsers() {
    return this.http.get(this.usersUrl);
  }

  getProfile(id) {
    return this.http.get(this.userProfileUrl + id)
  }
}
