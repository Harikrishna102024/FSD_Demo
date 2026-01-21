import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, switchMap, timer } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsedataService {

  constructor(private http: HttpClient) { }

  Url: any = environment.baseUrl;

  registerData(data: any): Observable<any> {
    const postData = this.http.post(`${this.Url}/register`, data);
    return postData
  }

  getUserData(): Observable<any> {
    const userdata = this.http.get(`${this.Url}/getUsers`);
    return userdata;
  }


  //adding setimeout fro observable delay simulation
  //  getUserData(): Observable<any> {
  //   return timer(2000).pipe(
  //     switchMap(() => this.http.get(`${this.Url}/getUsers`))
  //   );
  // }


  deleteUser(id: any): Observable<any> {
    const deleteData = this.http.delete(`${this.Url}/deleteUser/${id}`);
    return deleteData;
  }

  updateUserData(data: any): Observable<any> {
    const updateDate = this.http.patch(`${this.Url}/updateUserData`, data);
    console.log("Delete request sent for ID:", data);
    return updateDate;
  }

  checkLoginCredentials(userName: any, password: any): Observable<any> {
    const payload = {
      email: userName,
      password: password
    }
    const userData = this.http.post(`${this.Url}/checkUserData`, payload);
    return userData;
  }
}
