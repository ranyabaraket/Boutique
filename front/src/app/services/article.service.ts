import { Injectable } from '@angular/core';
import { User } from './../model/user.model';



import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Article } from '../model/article';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public user:any=null;
  apiURL = 'http://localhost:5000/api/articles';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':localStorage.getItem('id_token')
    })
  }



//get all articles
readAll(): Observable<any> {
  return this.http.get(this.apiURL);

}


//delete an article
delete(id){

  return this.http.delete(this.apiURL + '/' + id, this.httpOptions)

}



find(numArticle): Observable<Article> {

  return this.http.get<Article>(this.apiURL + '/' + numArticle,this.httpOptions)
}






//modifier article
update(id, article): Observable<Article> {

  return this.http.put<Article>(this.apiURL + '/' + id, JSON.stringify(article), this.httpOptions)



}



Add(article): Observable<Article> {
  return this.http.post<Article>(this.apiURL , JSON.stringify(article), this.httpOptions).pipe(
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


}
