import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ElapsedTimePipe } from '../../shared/elapsed-time.pipe';
import { ApiService } from '../../api.service';
import { Post } from '../../types/post';

@Component({
  selector: 'app-post-single',
  imports: [MatButtonModule, MatIconModule, ElapsedTimePipe],
  templateUrl: './post-single.component.html',
  styleUrl: './post-single.component.css',
})
export class PostSingleComponent {
  @Input() post!: Post;
  @Input() userId!: string | null;
  @Output() deletePostEvent = new EventEmitter<string>();
  constructor(
    private apiService: ApiService
  ) {}

  like(postId: string): void {
    if (!this.post || !this.userId) {
      console.log('Post not found or user not logged in');
      return;
    }
    if (!this.post.likes.includes(this.userId)) {
      this.apiService.likePost(postId).subscribe({
        next: () => {
          if (this.userId) {
            this.post.likes.push(this.userId);
            this.post.likedByUser = true;
            console.log('Post liked');
          }
        },
        error: (err) => console.log('Error liking post: ', err),
      });
    }
  }

  removeLike(postId: string): void {
    if (!this.post || !this.userId) {
      console.log('Post not found or user not logged in');
      return;
    }

    if (this.post.likes.includes(this.userId)) {
      this.post.likes = this.post.likes.filter((id) => id !== this.userId);
      this.post.likedByUser = false;
      console.log('Like removed');
    }
  }

  deletePost(): void {
    if(confirm(`Are you sure you want to delete this post?`)) {
      this.deletePostEvent.emit(this.post._id);
    }
  }
}
