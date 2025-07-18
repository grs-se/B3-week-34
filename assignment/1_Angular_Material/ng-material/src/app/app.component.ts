import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatTableModule
} from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
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
        this.users = [...this.users, result];
        console.log('User added:', result);
        console.log('Updated user list:', this.users);
        this.snackBar.open('User added successfully!', 'Close', {
          duration: 2000,
        }); // Show notification
      }
    });
  }
}
