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
    try {
      console.log(`in fetch: ${searchQuery}`);
      if(searchQuery != '')
      {
        this.http
        .get(`https://api.github.com/search/users?q=${searchQuery}`)
        .subscribe(res => {
          this.serachResult = res;
          console.log(`got res:${JSON.stringify(this.serachResult)}`);
        });
      }
      else{
        this.serachResult = null;
      }
    } catch (error) {
      console.log(`error while fetching data:${error}`)
    }
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
