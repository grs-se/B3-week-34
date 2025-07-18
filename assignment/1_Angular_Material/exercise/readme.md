
# Angular Material User Management Challenge

## Goal:
Build a simple Angular app with user management features using Angular Material components including tables and dialogs.

## What You'll Build:
- A user list displayed in a Material table.
- A button to open a dialog for adding new users.
- Snackbar notifications on successful user addition.
- Dialog with input validation for user name and email.

## Step-by-Step Instructions

### 1. Setup Angular Material in your project

Run in terminal:
```bash
ng add @angular/material
```
Select Indigo/Pink theme, enable global typography and animations.

---

### 2. Create User model (`user.ts`)

```ts
export interface User {
  name: string;
  email: string;
}
```

---

### 3. Create `AddUserDialogComponent`

**`add-user-dialog.component.ts`**

```ts
import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../user';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
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
```

**`add-user-dialog.component.html`**

```html
<h2 mat-dialog-title>Add New User</h2>
<form (ngSubmit)="onSubmit()">
  <mat-form-field appearance="fill" style="width: 100%;">
    <mat-label>Name</mat-label>
    <input matInput [formControl]="name" />
    <mat-error *ngIf="name.hasError('required')">Name is required</mat-error>
  </mat-form-field>

  <mat-form-field appearance="fill" style="width: 100%;">
    <mat-label>Email</mat-label>
    <input matInput [formControl]="email" />
    <mat-error *ngIf="email.hasError('required')">Email is required</mat-error>
    <mat-error *ngIf="email.hasError('email')">Invalid email</mat-error>
  </mat-form-field>

  <mat-dialog-actions align="end">
    <button mat-button type="button" (click)="onCancel()">Cancel</button>
    <button mat-flat-button color="primary" type="submit" [disabled]="name.invalid || email.invalid">
      Add User
    </button>
  </mat-dialog-actions>
</form>
```

---

### 4. Update `AppComponent`

**`app.component.ts`**

```ts
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from './user';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    AddUserDialogComponent,
    // Angular Material modules will be imported in main.ts/bootstrap
  ],
})
export class AppComponent {
  // Initial user list
  users: User[] = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
  ];

  // Columns displayed in the table
  displayedColumns = ['name', 'email'];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  // Open dialog to add a new user
  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent);

    dialogRef.afterClosed().subscribe((result: User | undefined) => {
      if (result) {
        this.users.push(result); // Add user to list
        this.snackBar.open('User added successfully!', 'Close', { duration: 2000 }); // Show notification
      }
    });
  }
}
```

**`app.component.html`**

```html
<mat-toolbar color="primary">
  <span>User Management</span>
</mat-toolbar>

<div style="margin: 20px;">
  <button mat-flat-button color="accent" (click)="openAddUserDialog()">Add User</button>

  <mat-table [dataSource]="users" style="width: 100%; margin-top: 20px;">
    <ng-container matColumnDef="name">
      <mat-header-cell *matHeaderCellDef>Name</mat-header-cell>
      <mat-cell *matCellDef="let user">{{ user.name }}</mat-cell>
    </ng-container>

    <ng-container matColumnDef="email">
      <mat-header-cell *matHeaderCellDef>Email</mat-header-cell>
      <mat-cell *matCellDef="let user">{{ user.email }}</mat-cell>
    </ng-container>

    <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
    <mat-row *matRowDef="let row; columns: displayedColumns"></mat-row>
  </mat-table>
</div>
```

---

### 5. Import Angular Material modules in `main.ts` or your bootstrap file:

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [],
  imports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
  ],
});
```

---

## What this teaches:
- How to use Angular Material toolbar, buttons, table, dialog, and snackbar.
- How to create and use a dialog form with validation.
- How to update table data dynamically.
- How to import Angular Material modules when bootstrapping an app.

## To test:
1. Run the app.
2. Click **Add User** button.
3. Fill in the name and email (validation included).
4. Submit and see the new user added to the table with a snackbar notification.
