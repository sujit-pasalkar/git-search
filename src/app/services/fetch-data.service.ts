import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FetchDataService {
  serachResult: any;
  itemData:any;

  constructor(private http: HttpClient) {}

  fetchSearchResult(searchQuery: String) {
    try {
      console.log(`in fetch: ${searchQuery}`);
      if(searchQuery != '')
      {
        this.http
        .get(`https://api.github.com/search/users?q=${searchQuery}`)
        .subscribe((res : Response) => {
          this.serachResult = res;
          // console.log(`got res:${JSON.stringify(this.serachResult.items)}`);
          this.itemData = JSON.stringify(this.serachResult.items);
          // console.log(typeof(data));

          this.itemData = JSON.parse(this.itemData);
          // console.log(typeof(this.itemData));
          // console.log(`itemData:${this.itemData.keys()}`); 
          for (let key of Object.keys(this.itemData)) {
            this.itemData[key].show = false;
            let data = this.itemData[key];
            // ... do something with mealName
            // console.log(data );
          }
          // this.itemData. 

        });
      }
      else{
        this.serachResult = null;
      }
    } catch (error) {
      console.log(`error while fetching data:${error}`)
    }
  }

  fetchRepo(username:string) : Observable<any>{
     return this.http.get<any>(`https://api.github.com/users/${username}/repos`)
     .pipe(
      tap(_ => console.log('fetched heroes')),
      catchError(this.handleError<any>('getData', []))
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
