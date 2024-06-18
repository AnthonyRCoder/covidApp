import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {

  private apiUrl = 'https://disease.sh/v3/covid-19/historical/all?lastdays=all';

  constructor(private http: HttpClient) { }

  getCovidDataForVisualization(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get<any>(url);
  }

  getCovid19Data(): Observable<any> {
    return this.http.get<any>('https://disease.sh/v3/covid-19/all');
  }

  getCovid19Data2(): Observable<any> {
    return this.http.get<any>('https://disease.sh/v3/covid-19/countries');
  }
}
