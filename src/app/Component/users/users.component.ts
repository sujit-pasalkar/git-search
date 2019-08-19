import { Component, OnInit } from "@angular/core";
import { FetchDataService } from "../../services/fetch-data.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  userRepo;

  constructor(private fetchDataService: FetchDataService) {}

  ngOnInit() {}

  async showDetails(id) {
    for (let key of Object.keys(this.fetchDataService.itemData)) {
      if (this.fetchDataService.itemData[key].id == id) {
        if (!this.fetchDataService.itemData[key].show) {
          try {
            this.userRepo = await this.fetchDataService.fetchRepo(
              this.fetchDataService.itemData[key].login
            );
            this.fetchDataService.itemData[key].show = !this.fetchDataService
              .itemData[key].show;
          } catch (error) {
            console.log(`err while fetchRepo :${error}`);
          }
        } else {
          this.userRepo = null;
          this.fetchDataService.itemData[key].show = false;
        }
      } else {
        this.fetchDataService.itemData[key].show = false;
      }
    }
  }
}
