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
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
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
      firstname: [null, Validators.compose([Validators.required])],
      lastname: [null, Validators.compose([Validators.required])],
      mobile:[null],
      email:[null, Validators.compose([Validators.required])],
      city:[null],
      password:[null, Validators.compose([Validators.required])]
    });
  }
  get f() { return this.form.controls; }


  onSubmit() {
     this.authService.register(this.form.value).subscribe((res:any)=>{
       if(res.status == 1){
        this.toastr.success('Success!', res.message ,{  timeOut: 3000,
        });     
        this.router.navigateByUrl('/login')

       }else if(res.status == 0){
        this.toastr.error('Error!', res.message ,{ timeOut: 3000,
        });     
       }else{
        this.toastr.error('Error!', 'Internal Server Error',{ timeOut: 3000,
        });   
       }
  

     })
    // if(this.data == 'user not exist'){
    //   console.log('error')
    // }else{
    //   this.router.navigateByUrl('/dashboard')
    // }
    
  }
}