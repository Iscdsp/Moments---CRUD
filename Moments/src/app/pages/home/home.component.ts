import { Component, OnInit } from '@angular/core';

import { MomentService } from 'src/app/services/moments.service';
import { Moment } from 'src/app/moment';
import { environment } from 'src/environments/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allMMoments: Moment[] = [];
  moments: Moment[] = [];
  baseApiUrl = environment.baseApiUrl;

  //todosearch

  constructor(private momentService: MomentService) {}

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      const data = items.data;
      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleString('pt-BR');
      });
      this.allMMoments = data;
      this.moments = data;
    });
  }
}
