import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  {
    path:'',
    component:SignUpComponent
  },
  {
    path:'login',
    component:SignInComponent
  },
  {
    path:'register',
    component:SignUpComponent
  },
  {
    path:'moments',
    loadChildren: () => import('./moment/moment.module').then(m=>m.MomentModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
