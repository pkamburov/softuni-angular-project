import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './user/profile/profile.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'home', redirectTo: '', pathMatch: 'full' },
    
    // { path: 'profile', component: ProfileComponent },
    { path: 'profile',
        children: [
            { path: ':userId', component: ProfileComponent}
        ]
    },
    { path: 'search', component: SearchComponent },

    {
        path: 'posts', children: [
            { path: '', component: MainComponent },
            // { path: ':postId', component: CurrentPostComponent },
        ]
    },

    // { path: 'new-post', component: NewPostComponent, canActivate: [AuthGuard] },

    // { path: '404', component: ErrorComponent },
];
