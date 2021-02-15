import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MomentIndexComponent } from '../moment-index/moment-index.component';
import { MomentAddComponent } from '../moment-add/moment-add.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [

  {
    path:'',
    component:HomeComponent,
    children:[
      {
        path:'create',
        component:MomentAddComponent
      },
      {
        path:'moment-list',
        component:MomentIndexComponent
      }
    ]
  },
  
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MomentRoutingModule { }
