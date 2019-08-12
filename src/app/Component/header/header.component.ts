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
  private searchQuery = "";

  constructor(private fetchDataService: FetchDataService) {}

  ngOnInit() {}

  search(term: string): void {
    console.log(`searchQuery:${this.searchQuery}`);

    this.fetchData();
  }

  fetchData() {
    this.fetchDataService.fetchSearchResult(this.searchQuery);
  }
}
