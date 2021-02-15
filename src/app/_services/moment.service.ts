import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map, tap } from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  constructor(private http:HttpClient) { }
  getAllMoment(){
    return this.http.get('http://localhost:5000/api/get-moments');

  }
  createMoment(info){
    return this.http.post('http://localhost:5000/api/create-moment',info);    
  }
  editMoment(info){
    return this.http.put('http://localhost:5000/api/edit-moment',info);    

  }
  deleteMoment(info){
    return this.http.delete('http://localhost:5000/api/delete-moment/'+info);    
    
  }
  uploadFile(data){
    return this.http.post<any>("http://localhost:5000/api/uploadFile",data,{reportProgress: true,
      observe: 'events'}).pipe(map((event:any)=>{
        switch(event.type){
          case HttpEventType.UploadProgress: const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };
          case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
        }
 
    }));
  }
}
