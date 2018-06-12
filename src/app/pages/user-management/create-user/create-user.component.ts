import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
 
import {UserService } from '../user.service';
import { NotificationService } from '../../../core/directives/notification/notification.service';
 
@Component({templateUrl: './create-user.component.html',
            styleUrls: ['./create-user.component.scss']})
export class CreateUserComponent implements OnInit {
    createUserForm: FormGroup;
    loading = false;
    submitted = false;
 
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,private notificationService:NotificationService) { }
 
    ngOnInit() {
        this.createUserForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }
 
    // convenience getter for easy access to form fields
    get f() { return this.createUserForm.controls; }
 
    onSubmit() {
        this.submitted = true;
 
        // stop here if form is invalid
        if (this.createUserForm.invalid) {
            return;
        }
 
        this.loading = true;
        this.userService.create(this.createUserForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.notificationService.success('User Created successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.notificationService.error(error);
                    this.loading = false;
                });
    }
}