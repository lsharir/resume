import './subject.component.scss';

import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'subject',
    templateUrl: './subject.component.html',
    styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
    @Input('subject') subject;
    constructor() { }

    ngOnInit() { }
}