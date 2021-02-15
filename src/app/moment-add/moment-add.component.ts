import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MomentService } from '../_services/moment.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-moment-add',
  templateUrl: './moment-add.component.html',
  styleUrls: ['./moment-add.component.css']
})
export class MomentAddComponent implements OnInit {

  status: string;
  progress:number = 0;
  data: { title: any; tags: any; file: any; comment: any; };
  imageURL: any;
  message: string;
  imagePath: any;
  imgURL: any;
  filepath: any;
  public form: FormGroup;
  tags = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
     private fb: FormBuilder,
     private router: Router,
     private momentService:MomentService,
     private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: [null, Validators.compose([Validators.required])],
      tag: [null, Validators.compose([Validators.required])],
      file:[null],
      comment:[null]
    });
  }
  get f() { return this.form.controls; }

  preview(files) {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    this.filepath = <File>files[0];

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      this.imgURL = reader.result;
    };
    const fd = new FormData();
    fd.append("file", this.filepath);
    this.momentService.uploadFile(fd).subscribe((res:any) => {
      this.status = res.status;
      this.progress = res.message;
      if (res.message == "sucess") {
        this.imageURL = res.url;
      }
    });
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tags
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
  onSubmit() {
    
    
    this.data = {
      title: this.form.controls.title.value,
      tags: this.tags,
      file: this.imageURL,
      comment: this.form.controls.comment.value
    };
     this.momentService.createMoment(this.data).subscribe((res:any)=>{
       if(res.status == 1){
        this.toastr.success('Success!', res.message,{timeOut:300});
        this.router.navigateByUrl('/moments/moments-list');
       
       }else if(res.status == 0){
        this.toastr.error('Error!', res.message);
       }else{
        this.toastr.error('Error!', 'Internal Server Error');

       }
      
     })
    
    
  }
}