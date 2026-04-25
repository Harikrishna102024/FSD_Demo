import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { from, Observable, switchMap, timer } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsedataService {

  constructor(private http: HttpClient) { }

  Url: any = environment.baseUrl;

  registerData(data: any): Observable<any> {
    const postData = this.http.post(`${this.Url}/auth/register`, data);
    return postData
  }

  getUserData(page: any, limit: any): Observable<any> {
    const userdata = this.http.get(`${this.Url}/users/getUsers?page=${page}&limit=${limit}`);
    return userdata;
  }


  deleteUser(id: any): Observable<any> {
    const deleteData = this.http.delete(`${this.Url}/users/deleteUser/${id}`);
    return deleteData;
  }

  updateUserData(data: any): Observable<any> {
    const updateDate = this.http.patch(`${this.Url}/users/updateUserData`, data);
    return updateDate;
  }

  checkLoginCredentials(userName: any, password: any): Observable<any> {
    const payload = {
      email: userName,
      password: password
    }
    const userData = this.http.post(`${this.Url}/auth/login`, payload);
    return userData;
  }

  getUserLogsHistory(): Observable<any> {
    const userData = this.http.get(`${this.Url}/users/userlogs`);
    return userData;
  }


  logOutUser(): Observable<any> {
    const result = this.http.post(`${this.Url}/auth/removeCookie`, {}, {withCredentials: true});
    return result
  }


  updateUserTheme(data: any): Observable<any> {
    const updateDate = this.http.patch(`${this.Url}/auth/updateUserTheme/${data.id}`, data);
    return updateDate;
  }
}
