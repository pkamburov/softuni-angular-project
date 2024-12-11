import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile-edit',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css',
})
export class ProfileEditComponent {
  editForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<ProfileEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editForm = this.fb.group({
      username: [this.data.username, [Validators.required, Validators.minLength(6)]],
      displayName: [this.data.displayName || '', Validators.minLength(4)],
      email: [this.data.email, [Validators.required, Validators.email]],
      description: [this.data.description || '', Validators.minLength(4)],
    });
  }

  onEdit() {
    if (this.editForm.valid) {
      const { username, email, displayName, description } = this.editForm.value;
      this.userService
        .updateProfile(username, email, displayName, description)
        .subscribe(
          (response) => {},
          (error) => {}
        );
      this.dialogRef.close();
    }
  }
}
