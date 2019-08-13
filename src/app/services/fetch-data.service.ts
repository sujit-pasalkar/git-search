import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FetchDataService {
  serachResult: any;
  itemData: any;

  constructor(private http: HttpClient) {}

  fetchSearchResult(searchQuery: String) {
    try {
      if (searchQuery != "") {
        this.http
          .get(`https://api.github.com/search/users?q=${searchQuery}`)
          .subscribe((res: Response) => {
            this.serachResult = res;
            this.itemData = JSON.stringify(this.serachResult.items);

            this.itemData = JSON.parse(this.itemData);
            for (let key of Object.keys(this.itemData)) {
              this.itemData[key].show = false;
              let data = this.itemData[key];
            }
          });
      } else {
        this.serachResult = null;
      }
    } catch (error) {
      // console.log(`error while fetching data:${error}`);
      this.serachResult = null;
    }
  }

  fetchRepo(username: string): Observable<any> {
    return this.http
      .get<any>(`https://api.github.com/users/${username}/repos`)
      .pipe(
        tap(_ => console.log("fetched repos")),
        catchError(this.handleError<any>("getData", []))
      );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
