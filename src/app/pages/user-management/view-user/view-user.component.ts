import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatFormFieldModule} from '@angular/material';
import {UserService } from '../user.service';
import { NotificationService } from '../../../core/directives/notification/notification.service';
 
@Component({templateUrl: './view-user.component.html',
            styleUrls: ['./view-user.component.scss']})
export class ViewUserComponent implements OnInit {
    createUserForm: FormGroup;
    loading = false;
    submitted = false;
 
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,private notificationService:NotificationService,
        public dialogRef: MatDialogRef<ViewUserComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any) { }
        
          onNoClick(): void {
            this.dialogRef.close();
          }
    
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
        this.userService.update(this.createUserForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.notificationService.success('User updated successful', true);
                    
                },
                error => {
                    this.notificationService.error(error);
                    this.loading = false;
                });
    }
}