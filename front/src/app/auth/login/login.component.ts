import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {}

  submit() {
    debugger;
    this.auth.login(this.loginForm.value).subscribe(
      success => {
        console.log(success);
        debugger;
      },
      error => {
        console.log(error);
        debugger;
      }
    );
  }

}
