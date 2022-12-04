import { User } from './../model/user.model';
import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  apiURL = 'http://localhost:5000/api/clients';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':localStorage.getItem('id_token')
    })
  }
//get all clients
  readAll(): Observable<any> {
    return this.http.get(this.apiURL);

  }

//delete a user
delete(id){


  return this.http.delete(this.apiURL + '/' + id, this.httpOptions)

}

//modifier user
update(id, user): Observable<User> {

  return this.http.put<User>(this.apiURL + '/' + id, JSON.stringify(user), this.httpOptions)



}

}
