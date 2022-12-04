import { Cout } from './../model/cout.model';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CoutService {
  apiURL = 'http://localhost:5000/api/couts';
  constructor(private http: HttpClient) { }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':localStorage.getItem('id_token')
    })
  }

  //get all couts
  readAll(): Observable<any> {
    return this.http.get(this.apiURL,this.httpOptions);

  }








  Add(cout): Observable<Cout> {
    return this.http.post<Cout>(this.apiURL , JSON.stringify(cout), this.httpOptions).pipe(
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



//delete a cout
delete(id){

  return this.http.delete(this.apiURL + '/' + id, this.httpOptions)

}


//modifier cout
update(id, cout): Observable<Cout> {

  return this.http.put<Cout>(this.apiURL + '/' + id, JSON.stringify(cout), this.httpOptions)



}


}
