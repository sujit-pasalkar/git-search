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
    this.fetchData();
  }

  fetchData() {
    this.fetchDataService.fetchSearchResult(this.searchQuery);
  }

  sort(){
    if(this.fetchDataService.itemData){
      this.fetchDataService.itemData.sort((a, b) => a.login < b.login ? -1 : a.login > b.login ? 1 : 0);
    }
  }
}
