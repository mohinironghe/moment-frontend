import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  Inject,
  Optional


} from '@angular/core';
import { MomentService } from '../_services/moment.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { ToastrService } from 'ngx-toastr';

export interface MomentElement {
  _id:string,
  images:string,
  title:string,
  comment:string,
  tags:string[]
}


@Component({
  selector: 'app-moment-index',
  templateUrl: './moment-index.component.html',
  styleUrls: ['./moment-index.component.css']
})

export class MomentIndexComponent implements OnInit,OnDestroy {
  data: any;
  dataSource: MatTableDataSource<MomentElement>;
  displayedColumns: string[] = ['image', 'title', 'comment', 'tags','Action'];
  mobileQuery: MediaQueryList;
  isLoading:boolean = true;
  dark = false;
  minisidebar = false;
  
  showHide = false;
  url = '';
  sidebarOpened = true;
  status = false;

  public showSearch = false;

  private _mobileQueryListener: () => void;
 
  clickEvent() {
    this.status = !this.status;
  }


  constructor(
    public router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
   private momentService:MomentService,
   public dialog: MatDialog, 
   private toastr: ToastrService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
   
  }
  ngOnInit(){
    
    this.momentService.getAllMoment().subscribe((res:any)=>{
      console.log(res);
      if(res.status == 1){
        this.isLoading =false;
        this.data = res.data
        this.dataSource = new MatTableDataSource(this.data);
      }
      
    })
  }
  getAllMoment(){
    this.momentService.getAllMoment().subscribe((res:any)=>{
      if(res.status == 1){
        this.isLoading =false;
        this.data = res.data
        this.dataSource = new MatTableDataSource(this.data);
      }
      
    })
  }
  editMoment(value){
    this.isLoading =true;
    this.momentService.editMoment(value).subscribe((res:any)=>{
      if(res.status == 1){
        this.isLoading =false;
        this.toastr.success('Success!', res.message,{timeOut:300});
        this.getAllMoment();
      }else if(res.status == 0){
        this.isLoading =false;
        this.toastr.error('Error!', res.message,{timeOut:300});
      }else{
        this.isLoading =false;
        this.toastr.error('Error!', 'Internal Server Error',{timeOut:300});

      }

    })
  }
  deleteMoment(id){
    this.isLoading =true;
    this.momentService.deleteMoment(id).subscribe((res:any)=>{
      if(res.status == 1){
        this.isLoading =false;
        this.toastr.success('Success!', res.message,{timeOut:300});
        this.getAllMoment();
      }else if(res.status == 0){
        this.isLoading =false;
        this.toastr.error('Error!', res.message,{timeOut:300});
      }else{
        this.isLoading =false;
        this.toastr.error('Error!', 'Internal Server Error',{timeOut:300});

      }
    })
  }
  openDialog(action: string, element: any) {
    element.action = action;

    const dialogRef = this.dialog.open(DialogContent, {
        data: element
    });
    dialogRef.afterClosed().subscribe(result => {
       if (result.event === 'Update') {
          this.editMoment(result.data);

        } else if (result.event === 'Delete') {
          
           this.deleteMoment(result.data._id)
        } else {
        }
    });

}

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }



}


/* popup controller */

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cs-popup',
  templateUrl: './popup.html',
})
// tslint:disable-next-line: component-class-suffix
export class DialogContent {
  datas: { title: any; tags: any; images: any; comment: any; };
  imageURL: any;
  imgURL: any;
  imagePath: any;
  filepath: File;
  message: string;
  fb: any;
  form: FormGroup;

  action: string;
  local_data: any;
  obj: MomentElement
  location: any;
  private unsubscribe = new Subject<void>()
  tags = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
      public dialogRef: MatDialogRef<DialogContent>,
      // @Optional() is used to prevent error if no data is passed
      @Optional() @Inject(MAT_DIALOG_DATA) public data: MomentElement, private momentService: MomentService) {
      //  console.log(data);
      this.local_data = { ...data };
      this.action = this.local_data.action;
    this.tags = this.local_data.tags;
          // 'LocationId':new FormControl(null),
          this.form =  new FormGroup({
            'title': new FormControl(this.local_data.title, Validators.compose([Validators.required])),
            'tag': new FormControl(''),
            'file':new FormControl(this.local_data.images),
            'comment':new FormControl(this.local_data.comment)
    });
      

  }
  ngOnInit() {
  }
  ngOnDestroy() {
      this.unsubscribe.next()
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
      // console.log(res)
      if (res.message == "sucess") {
        this.imageURL = res.url;
        // console.log(this.imageURL)
        // this.form.controls['file'].setValue(this.imageURL);

      }
    });
  }
  doAction() {
    if(this.action == 'Update'){
      
      console.log(this.form.value)
      
    this.datas = {
      title: this.form.controls.title.value,
      // tags: JSON.stringify(t),
      tags:this.tags,
      images: this.imageURL,
      comment: this.form.controls.comment.value
    };
      this.dialogRef.close({ event: this.action, data:{data:this.datas,_id:this.local_data._id} });
    }else{
      delete this.local_data.action;
      this.obj = this.local_data

      this.dialogRef.close({ event: this.action, data: this.obj });
    }
    
  }

  closeDialog() {
      this.dialogRef.close({ event: 'Cancel' });
  }

}