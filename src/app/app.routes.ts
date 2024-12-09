import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './user/profile/profile.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './user/login/login.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'home', redirectTo: '', pathMatch: 'full' },
    
    { path: 'login', redirectTo: '' },
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

    // { path: '404', component: ErrorComponent },
];
