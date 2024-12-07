import { Injectable } from "@angular/core";
import { Database, ref, set, get, update, remove } from '@angular/fire/database';
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Observable, from } from "rxjs";

@Injectable({ providedIn: 'root'})

export class FirebasePostService {
    constructor(private db: Database) {}

    createPost(postId: string, authorId: string, content: string): Observable<void> {
        return from(set(ref(this.db, 'posts/' + postId), { content }));
    }

    getPosts(): Observable<any> {
        return from(get(ref(this.db, 'posts')));
    }

    updatePost(postId: string, content: string): Observable<void> {
        return from(update(ref(this.db, 'posts/' + postId), { content }));
    }

    deletePost(postId: string): Observable<void> {
        return from(remove(ref(this.db, 'posts/' + postId)));
    }

    // async getPosts() {
    //     const postsCollection = collection(firestore, 'posts');
    //     const postsQuery = query(postsCollection, orderBy('createdAt', 'desc'));
    
    //     try {
    //       const postsCollection = collection(firestore, 'posts');
    //       const postsQuery = query(postsCollection, orderBy('createdAt', 'desc'));
    //       const snapshot = await getDocs(postsQuery);
    //       return snapshot.docs.map((doc) => ({
    //         id: doc.id,
    //         ...doc.data(),
    //       }));
    //     } catch (error) {
    //       console.error('Error fetching posts:', error);
    //       throw error;
    //     }
    //   }
}