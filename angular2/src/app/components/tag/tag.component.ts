import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
    @Input('active') active;
    @Input('text') text;
    public randomized;

    constructor() { }

    ngOnInit() { }

    ngOnChanges() {
        if (this.active) {
            this.randomize();
        }
    }

    randomize() {
        this.randomized = Math.floor((Date.now() % 4000) / 1000);
    }
}