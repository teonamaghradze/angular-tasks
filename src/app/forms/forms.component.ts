import { Component } from '@angular/core';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent {
  friends = ['Tariel', 'Avtandil', 'Nuradin-Pridon'];
  heroData = {
    name: '',
    email: '',
    friend: '',
  };

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }
}
