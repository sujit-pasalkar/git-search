import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../../services/fetch-data.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private fetchDataService: FetchDataService) { }

  ngOnInit() {
  }

}
