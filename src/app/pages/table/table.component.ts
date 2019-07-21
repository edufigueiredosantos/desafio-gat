import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

import { VulnerabilitiesService } from '../../shared/services/vulnerabilities.service';
import { ColumnsService } from '../../shared/services/columns.service';
import { Vulnerability } from 'src/app/shared/models/vulnerability.model';
import { take } from 'rxjs/operators';
import { DateFilter } from 'src/app/shared/models/date-filter.models';
import { TitlePageService } from 'src/app/shared/services/title-page.service';

@Component({
  selector: 'gat-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ViewChild('popup') popup: ElementRef;
  @ViewChild('contentPopup') contentPopup: ElementRef;

  titleVulnerabilities = 'Vulnerabilidades';

  tableColumns: string[];
  tableContent: Vulnerability[];

  hasTableContent = true;
  distancePopup = 3;

  quantityDays = 99999;
  dateFilter: DateFilter[] = [
    {
      id: 99999,
      name: 'todos'
    }, {
      id: 30,
      name: '30 dias'
    }, {
      id: 60,
      name: '60 dias'
    }, {
      id: 90,
      name: '90 dias'
    }, {
      id: 1080,
      name: '1080 dias'
    }
  ];

  constructor(
    private vulnerabilitiesService: VulnerabilitiesService,
    private columnsService: ColumnsService,
    private render: Renderer2,
    private titleService: TitlePageService
  ) { }

  ngOnInit() {
    this.titleService.changeTitlePage(this.titleVulnerabilities);
    this.getTableColumns();
    this.getTableContent();
  }

  formatText(text: string) {
    if (text && text.length >= 40) {
      return `${text.substr(0, 40).trim()}...`;
    } else {
      return text;
    }
  }

  verifyHasTableContent() {
    this.tableContent.length ? this.hasTableContent = true : this.hasTableContent = false;
  }

  doSearch(value: string = '') {
    this.vulnerabilitiesService.getByFilter(value.toLocaleLowerCase(), this.quantityDays).pipe(take(1)).subscribe((data) => {
      this.tableContent = data.sort((a, b) => a['id'] - b['id']);
      this.verifyHasTableContent();
    });
  }

  getTableColumns(): void {
    this.columnsService.getAll().pipe(take(1)).subscribe((columns: string[]) => {
      this.tableColumns = columns;
    });
  }


  getTableContent(): void {
    this.vulnerabilitiesService.getAll().pipe(take(1)).subscribe((content: Vulnerability[]) => {
      this.tableContent = content;
      this.verifyHasTableContent();
      this.tableContent.sort(function (a, b) {
        return a['id'] - b['id'];
      });
    });
  }

  filterByDate(value) {
    this.quantityDays = this.dateFilter[value.target.selectedIndex].id;
    this.doSearch();
  }

  // MOUSE HOVER
  mouseOver(text, event: MouseEvent) {
    const windowWidth = window.innerWidth - 10;
    const windowHeight = window.innerHeight - 10;
    if (text) {
      const popupWidth = this.popup.nativeElement.offsetWidth;
      const popupHeight = this.popup.nativeElement.offsetHeight;

      this.contentPopup.nativeElement.innerText = text;
      this.render.setStyle(this.popup.nativeElement, 'display', 'block');

      if ((popupWidth + event.pageX) < windowWidth) {
        this.render.setStyle(this.popup.nativeElement, 'left', `${event.pageX + this.distancePopup}px`);
      } else {
        this.render.setStyle(this.popup.nativeElement, 'left', `${event.pageX - popupWidth + this.distancePopup}px`);
      }

      if ((popupHeight + event.pageY) < windowHeight) {
        this.render.setStyle(this.popup.nativeElement, 'top', `${event.pageY + 3}px`);
      } else {
        this.render.setStyle(this.popup.nativeElement, 'top', `${event.pageY - popupHeight + this.distancePopup}px`);
      }
    }
  }

  mouseLeave() {
    this.render.setStyle(this.popup.nativeElement, 'display', 'none');
  }

}
