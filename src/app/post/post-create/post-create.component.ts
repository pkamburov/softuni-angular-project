import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../api.service';
import { PostService } from '../post.service';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Post } from '../../types/post';

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
  posts: Post[] = [];
  postForm: FormGroup;
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PostCreateComponent>,
    private postService: PostService,
  ) {
    this.postForm = this.fb.group({
      text: ['', [Validators.required, Validators.maxLength(300)]],
    });
  }

  onPost() {
    if (this.postForm.invalid) {
      return;
    } else {
      this.apiService.createPost(this.postForm.value)
      .subscribe(
        {
        next: () => {
          console.log('Created Post: ', this.postForm.value);
          // this.postService.addPost(this.postForm.value);
          this.posts.push(this.postForm.value)
          this.dialogRef.close();
        }
      }
    )
    }
  }
}
