import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './types/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) {}

  getPosts(page: number, limit: number): Observable<Post[]> {
    let url = `/api/posts`;
    return this.http.get<Post[]>(`${url}?page=${page}&limit=${limit}`);
  }

  createPost(postText: any) {
    const payload = postText;
    return this.http.post<Post>(`/api/posts`, payload);
  }

  likePost(postId: string): Observable<any> {
    return this.http.put(`/api/likes/${postId}`, {
      withCredentials: true,
    });
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete<Post>(`/api/posts/${postId}`, {
      withCredentials: true, 
    });
  }
}
