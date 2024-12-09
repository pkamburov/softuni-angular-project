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
    console.log('This', payload);
    return this.http.post<Post>(`/api/posts`, payload);
  }
}
