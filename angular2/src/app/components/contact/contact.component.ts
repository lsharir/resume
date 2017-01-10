import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    @Input('contactMethod') contactMethod;
    constructor() { }

    ngOnInit() { }
}