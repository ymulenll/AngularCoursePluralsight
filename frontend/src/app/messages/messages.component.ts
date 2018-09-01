import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages;
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    var id = this.route.snapshot.params.id
    console.log(id)
    this.apiService.getMessages(id)
      .subscribe(response => this.messages = response);
  }

}
