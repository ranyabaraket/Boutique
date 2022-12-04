import { Employee } from './../model/employee.model';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiURL = 'http://localhost:5000/api/employees';
  constructor(private http: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':localStorage.getItem('id_token')
  })
}
//get all employees
readAll(): Observable<any> {
  return this.http.get(this.apiURL,this.httpOptions);

}


Add(emp): Observable<Employee> {
  return this.http.post<Employee>(this.apiURL , JSON.stringify(emp), this.httpOptions).pipe(
    retry(1),
    catchError(this.handleError)
  )


}


// Error handling
handleError(error) {
  // console.log("error : ",error)
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error;
  } else {
    // Get server-side error
    errorMessage = error.error;
  }

  return throwError(errorMessage);
}

//delete a user
delete(id){


  return this.http.delete(this.apiURL + '/' + id, this.httpOptions)

}



//modifier user
update(id, emp): Observable<Employee> {

  return this.http.put<Employee>(this.apiURL + '/' + id, JSON.stringify(emp), this.httpOptions)



}

}
