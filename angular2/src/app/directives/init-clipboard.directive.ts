import { Directive, ElementRef, Renderer } from '@angular/core';
var Clipboard = require('clipboard');

@Directive({
    selector: '[initClipboard]'
})
export class InitClipboardDirective {
    private _clipboard: any;

    constructor(private _element: ElementRef, private _renderer: Renderer) {}

    momentarilyClassy(className) {
        this._renderer.setElementClass(this._element.nativeElement, className, true);

        setTimeout((className) => {
            this._renderer.setElementClass(this._element.nativeElement, className, false);
        }, 2000, className);
    }

    ngOnInit() {
        this._clipboard = new Clipboard(this._element.nativeElement);

        this._clipboard.on('success', (e) => {
            this.momentarilyClassy('copied');
            e.clearSelection();
        });

        this._clipboard.on('error', (e) => {
            this.momentarilyClassy('error');
            e.clearSelection();
        });
    }

    ngOnDestroy() {
        if (this._clipboard && this._clipboard.destroy) {
            this._clipboard.destroy();
        }
    }
}