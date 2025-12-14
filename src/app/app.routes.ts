import { Routes } from '@angular/router';
import { MainContainerComponent } from './features/main-container/main-container.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: MainContainerComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
            },
            {
                path: '**',
                redirectTo: '',
            },
        ],
    },
];
