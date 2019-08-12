import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FetchDataService {
  serachResult: any;

  constructor(private http: HttpClient) {}

  fetchSearchResult(searchQuery: String) {
    console.log(`in fetch: ${searchQuery}`);
    return this.http
      .get(`https://api.github.com/search/users?q=${searchQuery}`)
      .subscribe(res => {
        this.serachResult = JSON.stringify(res);
      });
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
