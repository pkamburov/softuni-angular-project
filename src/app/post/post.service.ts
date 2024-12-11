import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Post } from '../types/post';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  posts$$ = new BehaviorSubject<Post[]>([]);
  posts$: Observable<Post[] | null> = this.posts$$.asObservable();

  // posts: Post[] | null = null;
  // postsSubscription: Subscription | null = null;

  posts: Post[] = [];
  postsSignal = signal<Post[]>([]);
  userId: string | null = null;
  currentPage = 1;
  limit = 8;
  isLoading = true;

  constructor(private apiService: ApiService) {
    // this.postsSubscription = this.posts$.subscribe((posts) => {
    //   this.posts = posts;
    // })
  }

  // loadPosts(): void {
  //   this.apiService
  //     .getPosts(this.currentPage, this.limit)
  //     .subscribe((posts) => {
  //       if (this.userId) {
  //         const updatedPosts = posts.map((post) => {
  //           post.likedByUser = post.likes.includes(this.userId!);
  //           return post;
  //         });
  //         this.posts = [...posts, ...updatedPosts]
  //         // this.postsSignal.update((currentPosts) => [...updatedPosts, ...currentPosts])
  //       } else {
  //         console.log('else');
  //         // this.postsSignal.update((currentPosts) => [...this.posts, ...posts])
  //         this.posts = [...this.posts, ...posts];
  //         console.log(this.posts)
  //       }
  //       this.isLoading = false;
  //     });
  // }

  addPost(newPost: Post): Observable<any> {
    return this.apiService.createPost(newPost);
  }

  setPosts(newPosts: Post[]): void {
    this.posts$$.next(newPosts);
  }

  deletePost(postId: string): Observable<any> {
    return this.apiService.deletePost(postId);
  }
}
