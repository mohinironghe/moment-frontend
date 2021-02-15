import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentIndexComponent, DialogContent } from '../moment-index/moment-index.component';
import { MomentAddComponent } from '../moment-add/moment-add.component';
import { MomentRoutingModule } from './moment-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MainMaterialModule } from '../main-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from '../home/home.component';



@NgModule({
  declarations: [MomentIndexComponent, MomentAddComponent,DialogContent,HomeComponent],
  imports: [
    CommonModule,
    MomentRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatInputModule,
    MainMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ToastrModule
  ],
  entryComponents:[DialogContent]
})
export class MomentModule { }
