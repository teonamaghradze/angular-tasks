import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent {
  registrationForm: FormGroup;
  //empty array to push registered users
  userData: any[] = [];

  editingUser: any = null;
  userToRemove: any = null;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{8,}$/)],
        ],
        confirmPassword: ['', Validators.required],
        nickname: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z0-9-]+$/)],
        ],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(/^\+995\d{9}$/)],
        ],
        website: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-zA-Z0-9]+(\.[a-zA-Z]{2,5}){1,2}$/
            ),
          ],
        ],
        agreement: [false, Validators.requiredTrue],
      },
      { validators: this.isPasswordMatched }
    );
  }

  isPasswordMatched(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password &&
      confirmPassword &&
      password.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      console.log('Form Data:', formData);
      this.userData.push(formData);
      this.registrationForm.reset();
      console.log(this.userData);
    }
  }

  //edit User
  editUser(user: any) {
    //copy of user
    this.editingUser = { ...user };
    this.registrationForm.patchValue(this.editingUser);
  }

  // Function to save the edited user
  saveUser() {
    if (this.registrationForm.valid) {
      const editedUserData = this.registrationForm.value;
      const index = this.userData.findIndex(
        (user) => user.email === this.editingUser.email
      );
      if (index !== -1) {
        this.userData[index] = editedUserData;
        this.editingUser = null;
        this.registrationForm.reset();
      }
    }
  }

  //cancel edit
  cancelEdit() {
    this.editingUser = null;
    this.registrationForm.reset();
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
          (user) => user.email === this.userToRemove.email
        );
        if (index !== -1) {
          // Remove the user from the list
          this.userData.splice(index, 1);
        }
        this.userToRemove = null; // Clear the user to be removed
      }
    }
  }

  // Function to cancel the removal action
  cancelRemoveUser() {
    this.userToRemove = null;
  }
}
