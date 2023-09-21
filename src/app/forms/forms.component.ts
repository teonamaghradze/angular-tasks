import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

import { Users } from '../users.interface';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent {
  registrationForm: FormGroup;
  //empty array to push registered users
  userData: Users[] = [];

  passwordMatched: boolean = true;

  selectedUser: Users | null = null;
  // userToRemove: any = null;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{8,}$/)],
        ],

        confirmPassword: ['', [Validators.required, this.isPasswordMatched]],
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
    console.log(this.registrationForm.errors, 'sdasdsa');
    console.log(this.registrationForm.get('confirmPassword'));

    if (
      this.registrationForm.errors &&
      this.registrationForm.errors['passwordMismatch']
    ) {
      this.passwordMatched = false;
      return;
    }

    this.passwordMatched = true;

    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      console.log('Form Data:', formData);
      this.userData.push(formData);
      this.registrationForm.reset();
      console.log(this.userData);
    }
  }

  //edit User
  editUser(user: Users) {
    console.log(user);

    //copy of user
    this.selectedUser = { ...user };

    this.registrationForm.patchValue(this.selectedUser);
    console.log('dasdsad', this.selectedUser);
  }

  // // Function to save the edited user
  saveUser() {
    console.log(this.selectedUser, 'save');

    if (this.registrationForm.valid) {
      const editedUserData = this.registrationForm.value;
      const index = this.userData.findIndex(
        (user) => user.email === this.selectedUser?.email
      );
      if (index !== -1) {
        this.userData[index] = editedUserData;
        this.selectedUser = null;
        this.registrationForm.reset();
      }
    }
  }

  // //cancel edit
  cancelEdit() {
    console.log('edit', this.selectedUser);

    this.selectedUser = null;
    this.registrationForm.reset();
  }

  checkPasswords() {
    this.passwordMatched = !(
      this.registrationForm.get('password')?.value !==
      this.registrationForm.get('confirmPassword')?.value
    );
  }
}
