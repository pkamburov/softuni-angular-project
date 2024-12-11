import { Injectable, OnDestroy } from '@angular/core';
import { UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserForAuth | null>(null);
  user$: Observable<UserForAuth | null> = this.user$$.asObservable();

  USER_KEY = '[user]';

  user: UserForAuth | null = null;
  userSubscription: Subscription | null = null;

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient, private router: Router) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  setUser(user: UserForAuth): void {
    this.user$$.next(user);
  }

  clearUser(): void {
    this.user$$.next(null);
  }

  login(email: string, password: string) {
    return this.http.post<UserForAuth>('/api/login', { email, password }).pipe(
      tap((user) => {
        this.setUser(user);
        this.getProfile().subscribe({
          next: (profile) => {
            this.user$$.next(profile);
          },
        });
        this.router.navigate(['/']);
      })
    );
  }

  register(
    username: string,
    email: string,
    password: string,
    rePassword: string
  ) {
    return this.http
      .post<UserForAuth>('/api/register', {
        username,
        email,
        password,
        rePassword,
      })
      .pipe(
        tap((user) => {
          this.user$$.next(user);
        })
      );
  }

  logout() {
    this.clearUser();
    return this.http.post('/api/logout', {}).pipe(
      tap((user) => {
        this.user$$.next(null);
      })
    );
  }

  getProfile() {
    return this.http
      .get<UserForAuth>('/api/users/profile')
      .pipe(tap((user) => this.user$$.next(user)));
  }

  getUserProfile() {
    return this.user$$.asObservable();
  }

  getUserId(): string | null {
    const user = this.user;
    return user?._id || null;
  }

  updateProfile(
    username: string,
    email: string,
    displayName?: string,
    description?: string
  ) {
    return this.http
      .put<UserForAuth>(`/api/users/profile`, {
        username,
        email,
        displayName,
        description,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
