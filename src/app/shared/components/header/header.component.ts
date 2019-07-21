import { Component, OnInit } from '@angular/core';
import { TitlePageService } from '../../services/title-page.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'gat-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title: string;

  constructor(private titleService: TitlePageService) { }

  ngOnInit() {
    this.titleService.titlePage.subscribe(title => this.title = title);
  }

}
