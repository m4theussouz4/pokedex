import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainContainerComponent } from './main-container/main-container.component';

const routes: Routes = [
  {
    path: '',
    component: MainContainerComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: '**',
        redirectTo: '/home',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
