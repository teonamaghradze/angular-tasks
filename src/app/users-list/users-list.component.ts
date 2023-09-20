import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  @Output() selectedUser: any = new EventEmitter<{
    agreement: boolean;
    password: string;
    confirmPassword: string;
    email: string;
    nickname: string;
    phoneNumber: string;
    website: string;
  }>();

  editingUser: boolean = false;

  userToRemove: any = null;

  @Input() userData: any;

  //edit User
  editUser(user: any) {
    this.editingUser = true;
    this.selectedUser.emit(user);
  }

  //removeuser
  removeUser(user: any) {
    this.userToRemove = user;
  }

  // Function to confirm and remove the user
  confirmRemoveUser() {
    if (this.userToRemove) {
      const email = this.userToRemove.email;
      const confirmMessage = `This action will remove a user with this email: ${email}\nAre you sure?`;

      if (confirm(confirmMessage)) {
        const index = this.userData.findIndex(
          (user: any) => user.email === this.userToRemove.email
        );
        console.log('index', index);
        console.log(this.userToRemove);

        if (index !== -1) {
          console.log(this.userData, 1);

          // Remove the user from the list
          this.userData.splice(index, 1);
          console.log(this.userData, 2);
        }
        this.userToRemove = null;
      }
    }
  }

  // Function to cancel the removal action
  cancelRemoveUser() {
    this.userToRemove = null;
  }
}
