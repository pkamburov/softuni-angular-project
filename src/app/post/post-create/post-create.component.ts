import { Component, OnInit } from '@angular/core';
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
export class PostCreateComponent implements OnInit{
  posts: Post[] = [];
  postForm: FormGroup;
  userId: string | null = null;
  currentPage = 1;
  limit = 8;
  isLoading = true;

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

  ngOnInit(): void {
    this.apiService.getPosts(this.currentPage, this.limit).subscribe({
      next: (posts) => {
        this.posts = posts;
      }
    })
  }

  onPostCreate() {
    if (this.postForm.invalid) {
      return;
    } else {
      this.apiService.createPost(this.postForm.value)
      .subscribe(
        {
        next: (createdPost: Post) => {
          if (!createdPost) {
            return;
          }
          this.posts = [createdPost, ...this.posts];
          this.postService.posts = this.posts;
          this.postService.addPost(createdPost);
          this.dialogRef.close();
        },
        error: (err) => {
          console.error('Error in createPost API call: ', err)
        }
      }
    )
    }
  }

}
