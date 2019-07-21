import { Component, OnInit } from '@angular/core';
import { TitlePageService } from 'src/app/shared/services/title-page.service';

@Component({
  selector: 'gat-considerations',
  templateUrl: './considerations.component.html',
  styleUrls: ['./considerations.component.scss']
})
export class ConsiderationsComponent implements OnInit {

  titleConsiderations = 'Considerações';

  constructor(private titleService: TitlePageService) { }

  ngOnInit() {
    this.titleService.changeTitlePage(this.titleConsiderations);
  }

}
