import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Vulnerability } from '../models/vulnerability.model';

@Injectable({
  providedIn: 'root'
})
export class VulnerabilitiesService {

  private apiPath = 'api/vulnerabilities';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Vulnerability[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToVulnerabilities)
    );
  }

  getById(id: number): Observable<Vulnerability> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToVulnerability)
    );
  }

  getByFilter(value: string, quantityDays: number): Observable<Vulnerability[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(data => this.jsonDataToVulnerabilitiesFilter(data, value, quantityDays))
    );
  }

  // Private Methods
  private jsonDataToVulnerabilitiesFilter(jsonData: any[], value: string, quantityDays: number): Vulnerability[] {
    const vulnerabilities: Vulnerability[] = [];
    jsonData.filter((element) => {
      const today = Date.now();
      const tableDate = Date.parse(element.lastSeenDate);
      const dateDiff = Math.floor((today - tableDate) / (1000 * 60 * 60 * 24));

      if (
        (element['category'].toLowerCase().includes(value) ||
          element['id'].toLowerCase().includes(value) ||
          element['name'].toLowerCase().includes(value) ||
          element['severityAssetRisk'].toLowerCase().includes(value) ||
          element['status'].toLowerCase().includes(value)) &&
        (dateDiff <= quantityDays)
      ) {
        vulnerabilities.push(element);
      }
    });
    return vulnerabilities;
  }

  private jsonDataToVulnerabilities(jsonData: any[]): Vulnerability[] {
    const vulnerabilities: Vulnerability[] = [];
    jsonData.forEach(element => vulnerabilities.push(element as Vulnerability));
    return vulnerabilities;
  }

  private jsonDataToVulnerability(jsonData: any): Vulnerability {
    return jsonData as Vulnerability;
  }

  private handleError(error: any): Observable<any> {
    console.log('Erro na requisição: ', error);
    return throwError(error);
  }
}
