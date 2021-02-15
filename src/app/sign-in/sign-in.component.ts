import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  data: any
  error: any;
  public form: FormGroup;
  constructor(
     private fb: FormBuilder,
     private router: Router,
     private authService:AuthService,
     private toastr: ToastrService

    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }
  get f() { return this.form.controls; }


  onSubmit() {
   this.authService.login(this.form.value).subscribe((res:any)=>{
     if(res.status == 1){
      localStorage.setItem('currentUser', JSON.stringify({ userInfo:res.user, token: res.auth }));
      this.toastr.success('Success!', 'Login Successfully',{  timeOut: 3000,
      });     
      this.router.navigateByUrl('/moments/create');
      }else if(res.status == 0){
        this.toastr.error('Error!', res.message ,{  timeOut: 3000,
        });     
      }else{
        this.toastr.error('Error!', res.message, { timeOut: 3000,
         });     
      
      
    }
   
    
  })
}
}