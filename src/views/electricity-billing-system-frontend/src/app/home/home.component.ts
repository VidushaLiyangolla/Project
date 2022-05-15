import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentRoute: any = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
      route => {
        console.log((route as NavigationEnd).url);
        this.currentRoute = (route as NavigationEnd).url;
      }
    )
  }

}
