import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { NotificationService } from '../../core/directives/notification/notification.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;
  loginForm: FormGroup;
  returnUrl: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService) { 
   
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: '',
      password: '',
    });
    // reset login status
    this.authenticationService.logout();
 
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user';
  }
  getErrorEmailMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
   getErrorPasswordMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :'';
  }
  login(){
    if(this.email.valid && this.password.valid){
      this.authenticationService.login(this.email.value, this.password.value)
      .pipe(first())
      .subscribe(
          data => {
              this.router.navigate([this.returnUrl]);
          },
          error => {
              this.notificationService.error(error);
          });

    }
  }

}
