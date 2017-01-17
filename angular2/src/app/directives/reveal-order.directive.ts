import { Directive, Input, ElementRef, Renderer } from '@angular/core';

import { RevealService } from '../services';

@Directive({
    selector: '[revealOrder]'
})
export class RevealOrderDirective {
    @Input('revealOrder') revealOrder: Number;

    private _removeListener: Function;
    private _hideFunction: Function;
    private _revealFunction: Function;
    private _revealState: Boolean;

    constructor(
        private reveal: RevealService,
        private _element: ElementRef,
        private _renderer: Renderer
    ) {}

    ngOnInit() {
        this._renderer.setElementClass(this._element.nativeElement ,'reveal-hidden', true);
        
        this._removeListener = this.reveal.bind((count) => {
            this._revealFunction(count >= this.revealOrder);
        });

        this._revealFunction = (suggestedRevealState) => {
            if (suggestedRevealState !== this._revealState) {
                this._renderer.setElementClass(this._element.nativeElement ,'reveal-hidden-active', suggestedRevealState);
                this._revealState = suggestedRevealState;
            }
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