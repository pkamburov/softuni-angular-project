import { Component } from '@angular/core';
import { FirebasePostService } from '../../services/firebase-post.service';

@Component({
  selector: 'app-post-create',
  imports: [],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {
  newPost = { authorId: '', content: '',};

  constructor(private postService: FirebasePostService){}

  onSubmit() {
    const postId = Date.now().toString();
    this.postService.createPost(postId, this.newPost.authorId, this.newPost.content)
      .subscribe(() => {
        alert('Post submitted successfully!');
        this.newPost = { authorId: '', content: '' }
      });
  }
}
