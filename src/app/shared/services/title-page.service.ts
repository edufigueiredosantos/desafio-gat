import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TitlePageService {
    private titlePageSource = new BehaviorSubject<string>('');
    titlePage = this.titlePageSource.asObservable();

    constructor() { }

    changeTitlePage(title: string) {
        this.titlePageSource.next(title);
    }
}