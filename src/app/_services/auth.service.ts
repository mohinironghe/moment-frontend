import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  constructor(
    private http:HttpClient
  ) { }
  register(info){
    return this.http.post('http://localhost:5000/api/register',info);
  }
  login(info){
    return this.http.post('http://localhost:5000/api/login',info);
  }
  getUserData() {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    if (this.user) {
      return this.user.userInfo;
    } else {
      return "no";
    }
  }
}
