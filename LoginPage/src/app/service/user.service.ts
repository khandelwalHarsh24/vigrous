import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl='http://localhost:3000/api/v1'
  constructor(private http: HttpClient) { }


  registerUser(username:string,email:string,password:string): Observable<any>{
    const registerData = { username,email,password };
    return this.http.post<any>(`${this.apiUrl}/register`,registerData);
  }


  forgetPassword(email:string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/forgotpassword`,{email});
  }

  resetPassword(password:string,token:string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/reset-password/${token}`,{password});
  }

  loginUser(email:string,password:string): Observable<any>{
    const loginData = { email,password };
    console.log(loginData);
    return this.http.post<any>(`${this.apiUrl}/login`,loginData);
  }
}
