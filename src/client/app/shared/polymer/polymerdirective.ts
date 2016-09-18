import { Directive, ElementRef, Renderer,EventEmitter,Output } from '@angular/core';

/**
 * All classes in this file are a concept test to enable two way data binding between a Polymer WebComponent and Angular2.
 *
 * If the component does behave as a form element you can use ngDefaultControl
 * <paper-input ngDefaultControl [(ngModel)]="it.is.some.property.deep"></paper-input>
 *
 * And even if it isn't and all you want to do is to bind model to a specific value, you can use ngModel and
 * write an DefaultValueAccessor
 *
 * There is a recommended alternative to use Vaadin Angular2 Polymer(which is included in this app): https://github.com/vaadin/angular2-polymer
 */

/**
 * This class provides some utilities to integrate angular2 with polymer
 */
export class PolymerUtility {
    static toDashCase(str:string) {
        return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }

    static bindPolymerEvents(el:ElementRef, renderer: Renderer , outputs:[string,EventEmitter<any>][]) {
        for(let prop of outputs) {
            el.nativeElement.addEventListener(
                PolymerUtility.toDashCase(prop[0]) + '-changed', (event:any) => {
                el.nativeElement.___previousVals = el.nativeElement.___previousVals || {};
                if(el.nativeElement.___previousVals[prop[0]] !== event.currentTarget[prop[0]]) {
                    el.nativeElement.___previousVals[prop[0]]  = event.currentTarget[prop[0]];
                    prop[1].emit(event.currentTarget[prop[0]]);
                }
            });
        }
    }
}

/**
 * Provides access to paper-input notified properties(value, invalid,focused)
 */
@Directive({
    selector:'paper-input'
})
export class PaperInputDirective  {
    @Output() valueChange = new EventEmitter<any>();
    @Output() invalidChange = new EventEmitter<any>();
    @Output() focusedChange = new EventEmitter<any>();

    constructor(el:ElementRef, renderer: Renderer) {
        PolymerUtility.bindPolymerEvents(el,renderer, [
                ["value",this.valueChange],
                ["invalid", this.invalidChange],
                ["focused",this.focusedChange]]);
    }

}

/**
 * Provides access to paper-checkbox and paper-radio-button(they implement the same behavior) notified properties(active, checked, disabled, invalid,focused)
 */
@Directive({
    selector:'paper-checkbox,paper-radio-button'
})
export class PaperCheckboxDirective  {
    @Output() activeChange = new EventEmitter<any>(true);
    @Output() checkedChange = new EventEmitter<any>(true);
    @Output() disabledChange = new EventEmitter<any>(true);
    @Output() invalidChange = new EventEmitter<any>(true);
    @Output() focusedChange = new EventEmitter<any>(true);

    constructor(el:ElementRef, renderer: Renderer) {
        PolymerUtility.bindPolymerEvents(el,renderer, [
            ["active",this.activeChange],
            ["checked", this.checkedChange],
            ["disabled",this.disabledChange],
            ["invalid", this.invalidChange],
            ["focused",this.focusedChange]]);
    }

}

/**
 * Provides access to paper-radio-group notified properties(selected, selectedValues)
 */
@Directive({
    selector:'paper-radio-group'
})
export class PaperRadioGroupDirective  {
    @Output() selectedChange = new EventEmitter<any>();
    @Output() selectedValuesChange = new EventEmitter<any>();

    constructor(el:ElementRef, renderer: Renderer) {
        PolymerUtility.bindPolymerEvents(el,renderer, [
            ["selected",this.selectedChange],
            ["selectedValues", this.selectedValuesChange]]);
    }

}