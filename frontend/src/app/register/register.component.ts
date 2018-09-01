import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private apiService: AuthService) { }

  registerData = { }

  post() {    
    this.apiService.registerUser(this.registerData);
  }
}
