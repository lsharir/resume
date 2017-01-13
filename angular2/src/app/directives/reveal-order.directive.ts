import { Directive, Input, ElementRef, Renderer } from '@angular/core';

import { RevealService } from '../services';

@Directive({
    selector: '[revealOrder]'
})
export class RevealOrderDirective {
    @Input('revealOrder') revealOrder: Number;

    private _removeListener: Function;
    private _revealFunction: Function;

    constructor(
        private reveal: RevealService,
        private _element: ElementRef,
        private _renderer: Renderer
    ) {}

    ngOnInit() {
        this._renderer.setElementClass(this._element.nativeElement ,'reveal-hidden', true);
        
        this._removeListener = this.reveal.bind((count) => {
            if (count >= this.revealOrder) {
                this._revealFunction();
            }
        });

        this._revealFunction = () => {
            this._renderer.setElementClass(this._element.nativeElement ,'reveal-hidden-active', true);
            this.removeListener();
        }
    }

    ngOnDestroy() {
        this.removeListener();
    }

    removeListener() {
        if (this._removeListener) {
            this._removeListener();
        }
    }
}