import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  constructor(private apiService: ApiService) { }

  postMessage = '';
  ngOnInit() {    
  }

  post() {
    this.apiService.postMessage({msg: this.postMessage}).subscribe();
  }
}
