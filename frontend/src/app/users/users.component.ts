import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private users;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getUsers().subscribe(response => this.users = response)
  }

}
