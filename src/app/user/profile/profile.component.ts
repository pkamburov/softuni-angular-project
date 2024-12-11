import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { UserService } from '../user.service';
import { ApiService } from '../../api.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Post } from '../../types/post';
import { UserForAuth } from '../../types/user';
import { PostSingleComponent } from '../../post/post-single/post-single.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { PostService } from '../../post/post.service';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile',
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    PostSingleComponent,
    CommonModule,
    LoaderComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  posts: Post[] = [];
  userPosts: Post[] = [];
  likedByUser: Post[] = [];

  user: UserForAuth | null = null;
  userId: string | null = null;

  currentPage = 1;
  limit = 50;
  isLoading = true;

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private postService: PostService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
          this.userId = user._id;
          this.loadUserPosts();
          this.loadUserLikedPosts();
        }
      },
    });
    this.isLoading = false;
  }

  loadUserPosts() {
    this.apiService
      .getPosts(this.currentPage, this.limit)
      .subscribe((posts) => {
        const updatedPosts = posts.filter(
          (post) => post.userId._id === this.userId
        );
        if (updatedPosts) {
          this.userPosts = [...this.posts, ...updatedPosts];
        } else {
          this.userPosts = [];
        }
      });
    this.isLoading = false;
  }

  loadUserLikedPosts() {
    if (this.userId) {
      const userId = this.userId;
      this.isLoading = false;

      this.apiService
        .getPosts(this.currentPage, this.limit)
        .subscribe((posts) => {
          const likedPosts = posts.filter((post) =>
            post.likes.includes(userId)
          );
          if (likedPosts) {
            this.likedByUser = likedPosts;
          } else {
            this.likedByUser = [];
          }
        });
    }
  }

  onDeletePost(postId: string): void {
    this.postService.deletePost(postId).subscribe({
      next: () => {
        this.posts = this.posts.filter((post) => post._id !== postId);
        console.log('deleted');
        this.loadUserPosts()
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  openEditDialog(user: UserForAuth) {
    this.dialog.open(ProfileEditComponent, {
      data: this.user,
    });
  }
}
