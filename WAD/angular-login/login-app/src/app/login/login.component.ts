import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: any = {};

  onSubmit() {
    console.log(this.user);
    // Here you can add logic to authenticate the user
  }
}
