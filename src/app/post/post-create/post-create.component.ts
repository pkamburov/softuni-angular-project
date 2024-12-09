import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../api.service';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-post-create',
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css',
})
export class PostCreateComponent {
  postForm: FormGroup;
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PostCreateComponent>,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      text: ['', [Validators.required, Validators.maxLength(300)]],
    });
  }

  onPost() {
    if (this.postForm.invalid) {
      return;
    } else {
      console.log(this.postForm.value)
      this.apiService.createPost(this.postForm.value)
      .subscribe(() => {
        this.dialogRef.close();
        this.router.navigate(['/home']);
      })
    }
  }
}
