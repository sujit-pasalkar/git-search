import { Component, OnInit } from "@angular/core";
import { FetchDataService } from "../../services/fetch-data.service";
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  sortBy: String = "AZ";

  constructor(private fetchDataService: FetchDataService) {}

  ngOnInit() {}

  search(event: any): void {
    if (event.target.value.trim() != '') {
      this.fetchDataService.fetchSearchResult(event.target.value);
    }
  }

  sort(): void {
    if (this.fetchDataService.itemData) {
      console.log(`sortBy:${this.sortBy}`);

      this.fetchDataService.itemData = this.fetchDataService.itemData.sort(
        (a, b) => {
          let diff = 0;
          switch (this.sortBy) {
            case "AZ":
              diff = a.login < b.login ? -1 : a.login > b.login ? 1 : 0;
              // a.login.localeCompare(b.login);
              break;

            case "ZA":
              diff = a.login > b.login ? -1 : a.login < b.login ? 1 : 0;
              break;

            case "rank0":
              diff = a.score - b.score;
              break;

            case "rankN":
              diff = b.score - a.score;
              break;
          }

          return diff;
        }
      );
    } else return;
  }
}
