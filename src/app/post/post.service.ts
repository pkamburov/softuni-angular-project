import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../types/post';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  posts$$ = new BehaviorSubject<Post[]>([]);
  posts$ = this.posts$$.asObservable();
  posts: Post[] = [];
  userId: string | null = null;
  currentPage = 1;
  limit = 8;
  isLoading = true;

  constructor(private apiService: ApiService) {
    this.fetchExistingPosts();
  }

  private fetchExistingPosts(): void {
    this.apiService.getPosts(this.currentPage, this.limit).subscribe({
      next: (posts: Post[]) => {
        this.posts$$.next(posts);
      },
      error: (err) => {
        console.error('Error fetching posts:', err);
      },
    });
  }

  addPost(newPost: Post) {
    const currentPosts = this.posts;
    this.posts$$.next([...currentPosts]);
  }

  deletePost(postId: string): Observable<any> {
    return this.apiService.deletePost(postId);
  }
}
