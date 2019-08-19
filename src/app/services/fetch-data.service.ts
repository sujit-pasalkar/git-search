// common service to shared data with all components
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
  url: string = "https://api.github.com";

  constructor(private http: HttpClient) {}

  fetchSearchResult(searchQuery: String) {
    try {
      this.http
        .get(`${this.url}/search/users?q=${searchQuery}`)
        .subscribe((res: Response) => {
          this.serachResult = res;
          this.itemData = JSON.stringify(this.serachResult.items);

          this.itemData = JSON.parse(this.itemData);
          for (let key of Object.keys(this.itemData)) {
            this.itemData[key].show = false;
          }
        });
    } catch (error) {
      this.serachResult = null;
    }
  }

  public fetchRepo(username: String): Promise<any> {
    return new Promise<any>((_resolve, _reject) => {
      this.http
        .get(`${this.url}/users/${username}/repos`, {
          responseType: "json"
        })
        .subscribe(
          (results: any) => {
            _resolve(results);
          },
          errors => {
            _reject(errors);
          }
        );
    });
  }
}
