import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { UserService } from '../user.service';
import { ApiService } from '../../api.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Post } from '../../types/post';
import { User, UserForAuth } from '../../types/user';
import { PostSingleComponent } from '../../post/post-single/post-single.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { PostService } from '../../post/post.service';

@Component({
  selector: 'app-profile',
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    PostSingleComponent,
    CommonModule,
    LoaderComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  // @ViewChild('postContainer') postContainer!: ElementRef;
  posts: Post[] = [];
  user: UserForAuth | null = null;
  userId: string | null = null;
  currentPage = 1;
  limit = 50;
  isLoading = true;

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private postService: PostService,
  ) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
          this.userId = user._id;
          this.loadUserPosts();
        }
      },
    });
    this.isLoading = false;
  }

  loadUserPosts() {
    this.apiService
      .getPosts(this.currentPage, this.limit)
      .subscribe((posts) => {
        const updatedPosts = posts.filter((post) => post.userId._id === this.userId);
        if (updatedPosts) {
          this.posts = [...this.posts, ...updatedPosts];
        } else {
          this.posts = posts;
        }
      });
      this.isLoading = false;
  }

  get userPosts() {
    return this.posts.length;
  }

  loadUserLikedPosts() {

  }

  onDeletePost(postId: string): void {
    this.postService.deletePost(postId).subscribe({
      next: () => {
        this.posts = this.posts.filter(post => post._id !== postId);
        console.log('deleted');
      },
      error: err => {
        console.log('Error', err);
      }
    })
  }
}
