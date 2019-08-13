import { Component, OnInit } from "@angular/core";
import { FetchDataService } from "../../services/fetch-data.service";
@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  userData;
  userRepo;

  constructor(private fetchDataService: FetchDataService) {
    this.userData = this.fetchDataService.serachResult;
    console.log(`userData: ${this.userData}`);
  }

  ngOnInit() {
    // console.log(`userData: ${this.userData}`);
  }

  // get(){
  //   console.log(`== ${typeof this.fetchDataService.serachResult}`)
  // }

  async showDetails(id) {
    console.log(`show:${id}`);

    for (let key of Object.keys(this.fetchDataService.itemData)) {
      if (this.fetchDataService.itemData[key].id == id) {
        console.log("same");
        if (!this.fetchDataService.itemData[key].show) {
          try {
            // this.userRepo = await
             this.fetchDataService.fetchRepo(
              this.fetchDataService.itemData[key].login
            ).subscribe(res=>{
               this.userRepo = res;
               this.fetchDataService.itemData[key].show = !this.fetchDataService.itemData[key].show;

              console.log(`resss fetch`);
            })
            // console.log(`repos:${this.userRepo}`);
          } catch (error) {
            console.log(`err while fetchRepo :${error}`);
          }
        } else {
          this.userRepo = null;
          this.fetchDataService.itemData[key].show = false;
        }
        // this.fetchDataService.itemData[key].show = !this.fetchDataService
        //   .itemData[key].show;
      } else {
        this.fetchDataService.itemData[key].show = false;
      }
    }
  }
}
