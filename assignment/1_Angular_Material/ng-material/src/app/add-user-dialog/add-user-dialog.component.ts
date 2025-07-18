import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { User } from '../user';
@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatButton,
    MatInput,
    MatLabel,
    MatError,
    MatDialogActions,
    FormsModule,
    MatDialogTitle,
  ],
})
export class AddUserDialogComponent {
  // Form controls with validators for name and email
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(public dialogRef: MatDialogRef<AddUserDialogComponent>) {}

  // Submit dialog only if form is valid
  onSubmit() {
    if (this.name.valid && this.email.valid) {
      const user: User = { name: this.name.value!, email: this.email.value! };
      this.dialogRef.close(user); // Pass user back to caller
    }
  }

  // Close dialog without result
  onCancel() {
    this.dialogRef.close();
  }
}
