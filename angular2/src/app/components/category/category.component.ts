import { Component, OnInit, Input } from '@angular/core';
import { CATEGORY_ANIMATION } from '../../config/animations'

@Component({
    selector: 'category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    animations: [ CATEGORY_ANIMATION.trigger ]
})
export class CategoryComponent implements OnInit {
    @Input('category') category;
    @Input('subjects') subjects;
    constructor() { }

    ngOnInit() { }
}