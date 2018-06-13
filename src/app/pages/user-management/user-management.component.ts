import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { PopupComponent } from '../../core/components/popup/popup.component';
import { ViewUserComponent } from './view-user/view-user.component';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[];
  constructor(private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar,
    private router: Router, public dialog: MatDialog, private userService: UserService) { }

  ngOnInit() {
    this.userService
      .getAll()
      .subscribe((data: any) => {
        console.log("-------- ", data)
        this.users = data;
      });
  }
  deleteUser(user) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('-------->', currentUser);
    if (currentUser.id !== user.id) {
      var options = { cancelButtonTitle: "No", okButtonTitle: "Yes", title: "Delete User", details: `Are you sure to delete user(${user.email})?` };
      this.openDialog('/users', options, user);
    } else {
      this.snackBar.open("You can't delete to current login user", "OK");
    }

  }
  editUser() {
    let dialogRef = this.dialog.open(ViewUserComponent, {
      width: '100%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
          this.userService
            .getAll()
            .subscribe((data: any) => {
              console.log("-------- ", data)
              this.users = data;
            });
      }

    });
  }

  openDialog(pagename, options, user): void {
    let dialogRef = this.dialog.open(PopupComponent, {
      width: '50%',
      data: options
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.userService.delete(user.id).subscribe((data: any) => {
          this.users = data;
          this.router.navigateByUrl('/' + pagename);
        })

      }

    });
  }

}
