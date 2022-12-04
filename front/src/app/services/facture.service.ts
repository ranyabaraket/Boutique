import { Facture } from './../model/facture.model';
import { Injectable } from '@angular/core';
import { User } from './../model/user.model';



import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Article } from '../model/article';
@Injectable({
  providedIn: 'root'
})
export class FactureService {
  public user:any=null;
  apiURL = 'http://localhost:5000/api/factures';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':localStorage.getItem('id_token')
    })
  }



//get all articles
readAll(): Observable<any> {
  return this.http.get(this.apiURL,this.httpOptions);

}


//delete an article
delete(id){

  return this.http.delete(this.apiURL + '/' + id, this.httpOptions)

}



//modifier article
update(id, facture): Observable<Facture> {

  return this.http.put<Facture>(this.apiURL + '/' + id, JSON.stringify(facture), this.httpOptions)



}










Add(facture): Observable<Facture> {
  return this.http.post<Facture>(this.apiURL , JSON.stringify(facture), this.httpOptions).pipe(
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



getFactByClient(client): Observable<any> {
  return this.http.get(this.apiURL+'/rechercheClient/'+client,this.httpOptions);

}


}
