import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService
    .getUsers()
    .subscribe((data: any) => {
      console.log("-------- ",data)
        this.users = data.results;
      });
  }

}
