import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PostListComponent } from '../post/post-list/post-list.component';
import { UserService } from '../user/user.service';
import { HeaderComponent } from '../core/header/header.component';
import { FooterComponent } from '../core/footer/footer.component';
import { PostService } from '../post/post.service';
import { ApiService } from '../api.service';
import { Post } from '../types/post';
import { PostSingleComponent } from '../post/post-single/post-single.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-main',
  imports: [MatTabsModule, PostListComponent, HeaderComponent, FooterComponent, PostSingleComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  popularPosts: Post[] = [];
  userId: string | null = null;
  currentPage = 1;
  limit = 8;

  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (user) => {
        if (user) {
          this.userId = user._id;
        }
      }
  })
    this.loadPopularPosts(1);
  }

  loadPopularPosts(minLikes: number) {
    this.apiService
      .getPosts(this.currentPage, this.limit)
      .subscribe((posts) => {
        const sortedPosts = posts.sort((a, b) => b.likes.length - a.likes.length)
        this.popularPosts = sortedPosts;
      });
  }
  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }
}
