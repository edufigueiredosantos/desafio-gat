import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ColumnsService {

  constructor(private http: HttpClient) { }

  private apiPath = 'api/columns';

  getAll(): Observable<string[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handlerError)
    );
  }

  // PRIVATE METHODS
  private handlerError(error: any): Observable<any> {
    console.log('Erro na requisição: ', error);
    return throwError(error);
  }
}
