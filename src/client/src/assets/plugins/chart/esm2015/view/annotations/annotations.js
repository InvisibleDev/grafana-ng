import { Component } from '@angular/core';
import { BaseChartComponent } from '../../base/chart-base';
import { AXIS_X, AXIS_Y_LEFT } from '../../chart.m';
import * as i0 from "@angular/core";
import * as i1 from "../../base/chart.store";
import * as i2 from "../../base/mouse.store";
import * as i3 from "common";
import * as i4 from "uilib";
import * as i5 from "@angular/common";
import * as i6 from "./add/add-annot";
function AnnotationDispatcherComponent_add_annotation_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "add-annotation", 3);
    i0.ɵɵlistener("close", function AnnotationDispatcherComponent_add_annotation_2_Template_add_annotation_close_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.showAddAnnot = false; });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("epochStart", ctx_r1.epochStart)("epochEnd", ctx_r1.epochEnd);
} }
export class AnnotationDispatcherComponent extends BaseChartComponent {
    constructor(store, mouse, time) {
        super(store);
        this.store = store;
        this.mouse = mouse;
        this.time = time;
        this.showAddAnnot = false;
        this.showEditAnnot = false;
        this.regionSubs = mouse
            .drag$
            .subscribe(x => this.region = x);
        this.mouseSubs = mouse
            .up$
            .subscribe(x => this.onMouseUp(x));
    }
    ngOnDestroy() {
        var _a, _b;
        super.ngOnDestroy();
        (_a = this.mouseSubs) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.regionSubs) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    }
    onMouseUp(e) {
        var _a;
        if (!((e === null || e === void 0 ? void 0 : e.ctrlKey) && this.region)) {
            return;
        }
        const chart = this.component.control.chart;
        const scaleX = chart.scales[AXIS_X];
        const dr = this.region;
        const rangeStart = dr.start;
        const rangeEnd = (_a = dr.end) !== null && _a !== void 0 ? _a : dr.start;
        let start = Math.min(rangeStart.offsetX, rangeEnd.offsetX);
        let end = Math.max(rangeStart.offsetX, rangeEnd.offsetX);
        start = Math.max(start, scaleX.left);
        end = Math.min(end, scaleX.right);
        const es = scaleX
            .getValueForPixel(start)
            .valueOf();
        const ee = this.epochEnd = scaleX
            .getValueForPixel(end)
            .valueOf();
        console.log(es);
        this.epochStart = this.time.converter.toEpoch(es);
        this.epochEnd = this.time.converter.toEpoch(ee);
        this.offset = this.getPopupLocation(chart, e);
        setTimeout(() => this.showAddAnnot = true);
    }
    getPopupLocation(chart, e, xAdj = 0, yAdj = 0) {
        const scaleX = chart.scales[AXIS_Y_LEFT];
        var rect = chart.canvas.getBoundingClientRect();
        const maxY = scaleX.bottom;
        return {
            left: e.clientX - 200 + xAdj,
            top: maxY + rect.y + 5 + yAdj,
        };
    }
}
AnnotationDispatcherComponent.ɵfac = function AnnotationDispatcherComponent_Factory(t) { return new (t || AnnotationDispatcherComponent)(i0.ɵɵdirectiveInject(i1.ChartStore), i0.ɵɵdirectiveInject(i2.MouseStore), i0.ɵɵdirectiveInject(i3.TimeRangeStore)); };
AnnotationDispatcherComponent.ɵcmp = i0.ɵɵdefineComponent({ type: AnnotationDispatcherComponent, selectors: [["annotation-dispatcher"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 3, vars: 3, consts: [["shadow", "true", 1, "annot-popup", 3, "visible", "offset", "visibleChange"], ["popupAdd", ""], [3, "epochStart", "epochEnd", "close", 4, "ngIf"], [3, "epochStart", "epochEnd", "close"]], template: function AnnotationDispatcherComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "ed-popup", 0, 1);
        i0.ɵɵlistener("visibleChange", function AnnotationDispatcherComponent_Template_ed_popup_visibleChange_0_listener($event) { return ctx.showAddAnnot = $event; });
        i0.ɵɵtemplate(2, AnnotationDispatcherComponent_add_annotation_2_Template, 1, 2, "add-annotation", 2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("visible", ctx.showAddAnnot)("offset", ctx.offset);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.showAddAnnot);
    } }, directives: [i4.PopupComponent, i5.NgIf, i6.AddAnnotationComponent], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AnnotationDispatcherComponent, [{
        type: Component,
        args: [{
                selector: 'annotation-dispatcher',
                templateUrl: './annotations.html'
            }]
    }], function () { return [{ type: i1.ChartStore }, { type: i2.MouseStore }, { type: i3.TimeRangeStore }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ub3RhdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9hcHAvcGx1Z2lucy93aWRnZXRzL2NoYXJ0L3NyYy92aWV3L2Fubm90YXRpb25zL2Fubm90YXRpb25zLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vYXBwL3BsdWdpbnMvd2lkZ2V0cy9jaGFydC9zcmMvdmlldy9hbm5vdGF0aW9ucy9hbm5vdGF0aW9ucy5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHMUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFHM0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7SUNDbkQseUNBSWlCO0lBSGhCLG1OQUFzQixLQUFLLElBQUM7SUFHN0IsaUJBQWlCOzs7SUFGaEIsOENBQXlCLDZCQUFBOztBREczQixNQUFNLE9BQU8sNkJBQThCLFNBQVEsa0JBQWtCO0lBZW5FLFlBQ08sS0FBaUIsRUFDaEIsS0FBaUIsRUFDakIsSUFBb0I7UUFDM0IsS0FBSyxDQUFFLEtBQUssQ0FBRSxDQUFDO1FBSFQsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNoQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2pCLFNBQUksR0FBSixJQUFJLENBQWdCO1FBYjdCLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBZTdCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSzthQUNyQixLQUFLO2FBQ0wsU0FBUyxDQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUUsQ0FBQztRQUVwQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUs7YUFDcEIsR0FBRzthQUNILFNBQVMsQ0FBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElB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NkJBQTZCO1FDWjFDLHNDQU9DO1FBTkEsK0pBQTBCO1FBTTFCLG9HQUlBO1FBRUQsaUJBQVc7O1FBWlYsMENBQTBCLHNCQUFBO1FBTVYsZUFBb0I7UUFBcEIsdUNBQW9COztrRERLeEIsNkJBQTZCO2NBSnpDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxXQUFXLEVBQUUsb0JBQW9CO2FBQ2xDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFubm90YXRpb24sIFRpbWVSYW5nZVN0b3JlIH0gZnJvbSAnY29tbW9uJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEJhc2VDaGFydENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2Jhc2UvY2hhcnQtYmFzZSc7XHJcbmltcG9ydCB7IENoYXJ0U3RvcmUgfSBmcm9tICcuLi8uLi9iYXNlL2NoYXJ0LnN0b3JlJztcclxuaW1wb3J0IHsgRHJhZ1JlZ2lvbiwgTW91c2VTdG9yZSB9IGZyb20gJy4uLy4uL2Jhc2UvbW91c2Uuc3RvcmUnO1xyXG5pbXBvcnQgeyBBWElTX1gsIEFYSVNfWV9MRUZUIH0gZnJvbSAnLi4vLi4vY2hhcnQubSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2Fubm90YXRpb24tZGlzcGF0Y2hlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2Fubm90YXRpb25zLmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbm5vdGF0aW9uRGlzcGF0Y2hlckNvbXBvbmVudCBleHRlbmRzIEJhc2VDaGFydENvbXBvbmVudCAge1xyXG5cdFxyXG5cdG9mZnNldDogYW55O1xyXG5cdHJlZ2lvbjogRHJhZ1JlZ2lvbjtcclxuXHJcblx0c2hvd0FkZEFubm90OiBib29sZWFuID0gZmFsc2U7XHJcblx0c2hvd0VkaXRBbm5vdDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdGFubm90VG9TaG93OiBBbm5vdGF0aW9uO1xyXG5cclxuXHRlcG9jaEVuZDogbnVtYmVyO1xyXG5cdGVwb2NoU3RhcnQ6IG51bWJlcjtcclxuXHJcblx0bW91c2VTdWJzOiBTdWJzY3JpcHRpb247XHJcblx0cmVnaW9uU3ViczogU3Vic2NyaXB0aW9uO1xyXG5cdFxyXG4gIGNvbnN0cnVjdG9yKFxyXG5cdFx0cHVibGljIHN0b3JlOiBDaGFydFN0b3JlLFxyXG5cdFx0cHJpdmF0ZSBtb3VzZTogTW91c2VTdG9yZSxcclxuXHRcdHByaXZhdGUgdGltZTogVGltZVJhbmdlU3RvcmUgKXtcclxuXHRcdFx0c3VwZXIoIHN0b3JlICk7XHJcblxyXG5cdFx0XHR0aGlzLnJlZ2lvblN1YnMgPSBtb3VzZVxyXG5cdFx0XHRcdC5kcmFnJFxyXG5cdFx0XHRcdC5zdWJzY3JpYmUoIHggPT4gdGhpcy5yZWdpb24gPSB4ICk7XHJcblxyXG5cdFx0XHR0aGlzLm1vdXNlU3VicyA9IG1vdXNlXHJcblx0XHRcdFx0LnVwJFxyXG5cdFx0XHRcdC5zdWJzY3JpYmUoIHggPT4gdGhpcy5vbk1vdXNlVXAoIHggKSApXHJcblx0fVxyXG5cclxuXHRuZ09uRGVzdHJveSgpe1xyXG5cdFx0c3VwZXIubmdPbkRlc3Ryb3koKTtcclxuXHRcdHRoaXMubW91c2VTdWJzPy51bnN1YnNjcmliZSgpO1xyXG5cdFx0dGhpcy5yZWdpb25TdWJzPy51bnN1YnNjcmliZSgpO1xyXG5cdH1cclxuXHRcclxuXHRvbk1vdXNlVXAoIGU6IE1vdXNlRXZlbnQgKXtcclxuXHRcdGlmKCAhKCBlPy5jdHJsS2V5ICYmIHRoaXMucmVnaW9uICkpe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgY2hhcnQgPSB0aGlzLmNvbXBvbmVudC5jb250cm9sLmNoYXJ0O1xyXG5cdFx0Y29uc3Qgc2NhbGVYID0gY2hhcnQuc2NhbGVzWyBBWElTX1ggXTtcclxuXHJcblx0XHRjb25zdCBkciA9IHRoaXMucmVnaW9uO1xyXG5cclxuXHRcdGNvbnN0IHJhbmdlU3RhcnQgPSBkci5zdGFydDtcclxuXHRcdGNvbnN0IHJhbmdlRW5kID0gZHIuZW5kID8/IGRyLnN0YXJ0O1xyXG5cclxuXHRcdGxldCBzdGFydCA9IE1hdGgubWluKCByYW5nZVN0YXJ0Lm9mZnNldFgsIHJhbmdlRW5kLm9mZnNldFggKTtcclxuXHRcdGxldCBlbmQgPSBNYXRoLm1heCggcmFuZ2VTdGFydC5vZmZzZXRYLCByYW5nZUVuZC5vZmZzZXRYICk7XHJcblxyXG5cdFx0c3RhcnQgPSBNYXRoLm1heCggc3RhcnQsIHNjYWxlWC5sZWZ0ICk7XHJcblx0XHRlbmQgPSBNYXRoLm1pbiggZW5kLCBzY2FsZVgucmlnaHQgKTtcclxuXHJcblx0XHRjb25zdCBlcyA9IHNjYWxlWFxyXG5cdFx0XHQuZ2V0VmFsdWVGb3JQaXhlbCggc3RhcnQgKVxyXG5cdFx0XHQudmFsdWVPZigpO1xyXG5cclxuXHRcdGNvbnN0IGVlID0gdGhpcy5lcG9jaEVuZCA9IHNjYWxlWFxyXG5cdFx0XHQuZ2V0VmFsdWVGb3JQaXhlbCggZW5kIClcclxuXHRcdFx0LnZhbHVlT2YoKTtcclxuXHJcblx0XHRcdGNvbnNvbGUubG9nKCBlcyApO1xyXG5cclxuXHRcdHRoaXMuZXBvY2hTdGFydCA9IHRoaXMudGltZS5jb252ZXJ0ZXIudG9FcG9jaCggZXMgKTtcclxuXHRcdHRoaXMuZXBvY2hFbmQgPSB0aGlzLnRpbWUuY29udmVydGVyLnRvRXBvY2goIGVlICk7XHJcblxyXG5cdFx0dGhpcy5vZmZzZXQgPSB0aGlzLmdldFBvcHVwTG9jYXRpb24oIGNoYXJ0LCBlICk7XHJcblxyXG5cdFx0c2V0VGltZW91dCggKCkgPT4gdGhpcy5zaG93QWRkQW5ub3QgPSB0cnVlICk7XHJcblx0fVxyXG5cclxuXHRnZXRQb3B1cExvY2F0aW9uKCBjaGFydCwgZSwgeEFkaiA9IDAsIHlBZGogPSAwICl7XHJcblx0XHRjb25zdCBzY2FsZVggPSBjaGFydC5zY2FsZXNbIEFYSVNfWV9MRUZUIF07XHJcblx0XHR2YXIgcmVjdCA9IGNoYXJ0LmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgXHJcbiAgICBjb25zdCBtYXhZID0gc2NhbGVYLmJvdHRvbTtcclxuICAgIFxyXG4gICAgcmV0dXJuIHtcclxuXHRcdFx0bGVmdDogZS5jbGllbnRYIC0gMjAwICsgeEFkaiAsXHJcblx0XHRcdHRvcDogbWF4WSArIHJlY3QueSArIDUgKyB5QWRqLFxyXG5cdFx0fVxyXG4gIH1cclxuICAvLyBvZmZzZXQ6IGFueTtcclxuXHQvLyBAVmlld0NoaWxkKCdwb3B1cEFkZCcsIHsgcmVhZDogRWxlbWVudFJlZiB9KSBwdWJsaWMgcG9wdXBBZGQ6IEVsZW1lbnRSZWY7XHJcbiAgLy8gQFZpZXdDaGlsZCgncG9wdXBFZGl0JywgeyByZWFkOiBFbGVtZW50UmVmIH0pIHB1YmxpYyBwb3B1cEVkaXQ6IEVsZW1lbnRSZWY7XHJcbiAgXHJcblx0Ly8gc2hvd0FkZEFubm90OiBib29sZWFuID0gZmFsc2U7XHJcblx0Ly8gc2hvd0VkaXRBbm5vdDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdC8vIGFubm90VG9TaG93OiBhbnk7XHJcblx0Ly8gZXBvY2hFbmQ6IG51bWJlcjtcclxuXHQvLyBlcG9jaFN0YXJ0OiBudW1iZXI7XHJcbiAgXHJcbiAgLy8gZ2V0IHNob3dWaWV3QW5ub3QoKXtcclxuXHQvLyBcdHJldHVybiB0aGlzLmFubm90VG9TaG93Py5vdmVyUm9vdCB8fCB0aGlzLmFubm90VG9TaG93Py5vdmVyUG9wdXA7XHJcbiAgLy8gfVxyXG5cclxuICAvLyBnZXQgYW5pbWF0aW9uU2V0dGluZ3MoKXtcclxuICAvLyAgIHJldHVybiB7IFxyXG4gIC8vICAgICB0eXBlOiAnZmFkZScsXHJcbiAgLy8gICAgIGR1cmF0aW9uOiAxNTBcclxuICAvLyAgIH07XHJcblx0Ly8gfVxyXG5cclxuXHQvLyBjb25zdHJ1Y3RvciggcHJpdmF0ZSB0aW1lTWFuYWdlcjogVGltZU1hbmFnZXIgKXtcclxuXHQvLyBcdHN1cGVyKCk7XHJcblx0Ly8gfVxyXG5cclxuICAvLyBjcmVhdGUoIGNoYXJ0LCBlICl7XHJcblx0Ly8gXHRjb25zdCBzY2FsZVggPSBjaGFydC5zY2FsZXNbJ3gtYXhpcy0wJ107XHJcblx0Ly8gXHRjb25zdCBkciA9IGNoYXJ0LmRyYWdSZWdpb247XHJcblxyXG5cdC8vIFx0bGV0IHN0YXJ0ID0gTWF0aC5taW4oIGRyLnN0YXJ0Lm9mZnNldFgsIGRyLmVuZC5vZmZzZXRYICk7XHJcblx0Ly8gXHRsZXQgZW5kID0gTWF0aC5tYXgoIGRyLnN0YXJ0Lm9mZnNldFgsIGRyLmVuZC5vZmZzZXRYICk7XHJcblxyXG5cdC8vIFx0c3RhcnQgPSBNYXRoLm1heCggc3RhcnQsIHNjYWxlWC5sZWZ0ICk7XHJcblx0Ly8gXHRlbmQgPSBNYXRoLm1pbiggZW5kLCBzY2FsZVgucmlnaHQgKTtcclxuXHJcblx0Ly8gXHRjb25zdCBlcyA9IHNjYWxlWFxyXG5cdC8vIFx0XHQuZ2V0VmFsdWVGb3JQaXhlbCggc3RhcnQgKVxyXG5cdC8vIFx0XHQudmFsdWVPZigpO1xyXG5cclxuXHQvLyBcdGNvbnN0IGVlID0gdGhpcy5lcG9jaEVuZCA9IHNjYWxlWFxyXG5cdC8vIFx0XHQuZ2V0VmFsdWVGb3JQaXhlbCggZW5kIClcclxuXHQvLyBcdFx0LnZhbHVlT2YoKTtcclxuXHJcblx0Ly8gXHR0aGlzLmVwb2NoU3RhcnQgPSB0aGlzLnRpbWVNYW5hZ2VyLmNvbnZlcnRUekVwb2NoKCBlcyApO1xyXG5cdC8vIFx0dGhpcy5lcG9jaEVuZCA9IHRoaXMudGltZU1hbmFnZXIuY29udmVydFR6RXBvY2goIGVlICk7XHJcblx0XHJcblx0Ly8gXHR0aGlzLm9mZnNldCA9IHRoaXMuZ2V0UG9wdXBMb2NhdGlvbiggY2hhcnQsIGUgKTtcclxuXHRcdFxyXG5cdC8vIFx0c2V0VGltZW91dCggKCkgPT4gdGhpcy5zaG93QWRkQW5ub3QgPSB0cnVlLCAwICk7XHJcbiAgLy8gfVxyXG4gIFxyXG4gIC8vIG9uSG92ZXIoIGNoYXJ0LCBlICl7XHJcblx0Ly8gXHRpZiggdGhpcy5zaG93QWRkQW5ub3QgfHwgdGhpcy5zaG93RWRpdEFubm90ICl7XHJcblx0Ly8gXHRcdHJldHVybjtcclxuXHQvLyBcdH1cclxuXHJcblx0Ly8gXHRjb25zdCBjYW5kaWRhdGVzID0gW11cclxuXHRcclxuXHQvLyBcdGNoYXJ0XHJcblx0Ly8gXHRcdC53aWRnZXRcclxuXHQvLyBcdFx0LmFubm90YXRpb25zXHJcblx0Ly8gXHRcdD8uZm9yRWFjaCggYSA9PiB7XHJcblx0Ly8gXHRcdFx0Y29uc3QgeE9rID0gYS5yZWN0Py54MSA8PSBlLm9mZnNldFggJiYgYS5yZWN0Py54MiA+PSBlLm9mZnNldFg7XHJcblx0Ly8gXHRcdFx0Y29uc3QgeU9rID0gYS5yZWN0Py55MSA8PSBlLm9mZnNldFkgJiYgYS5yZWN0Py55MiA+PSBlLm9mZnNldFk7XHJcblxyXG5cdC8vIFx0XHRcdGlmKCB4T2sgJiYgeU9rICYmIGEuaWQgKXtcclxuXHQvLyBcdFx0XHRcdGNhbmRpZGF0ZXMucHVzaCggYSApO1xyXG5cdC8vIFx0XHRcdH0gZWxzZSBpZiggYS5vdmVyUm9vdCApIHtcclxuXHQvLyBcdFx0XHRcdHNldFRpbWVvdXQoICgpID0+IGEub3ZlclJvb3QgPSBmYWxzZSwgMTAwICk7XHJcblx0Ly8gXHRcdFx0fVxyXG5cdC8vIFx0XHR9KTtcclxuXHJcblx0Ly8gXHRpZiggY2FuZGlkYXRlcy5sZW5ndGggPiAwICl7XHJcblx0Ly8gXHRcdGxldCB3aW5uZXIgPSBjYW5kaWRhdGVzWyAwIF07XHJcblxyXG5cdC8vIFx0XHRjYW5kaWRhdGVzLmZvckVhY2goIHggPT4ge1xyXG5cdC8vIFx0XHRcdGlmKCBNYXRoLmFicyggeC5yZWN0LngyIC0geC5yZWN0LngxICkgPCAgTWF0aC5hYnMoIHdpbm5lci5yZWN0LngyIC0gd2lubmVyLnJlY3QueDEgKSApe1xyXG5cdC8vIFx0XHRcdFx0d2lubmVyID0geDtcclxuXHQvLyBcdFx0XHR9XHJcblx0Ly8gXHRcdH0gKTtcclxuXHJcblx0Ly8gXHRcdGlmKCB3aW5uZXIgIT0gdGhpcy5hbm5vdFRvU2hvdyApe1xyXG5cdC8vIFx0XHRcdHZhciByZWdpb25PZmZzZXQgPSAoIHdpbm5lci5yZWN0LngyIC0gd2lubmVyLnJlY3QueDEgKSAvIDIgLSBcclxuXHQvLyBcdFx0XHRcdCggZS5vZmZzZXRYIC0gd2lubmVyLnJlY3Q/LngxICk7XHJcblxyXG5cdC8vIFx0XHRcdHRoaXMub2Zmc2V0ID0gdGhpcy5nZXRQb3B1cExvY2F0aW9uKCBjaGFydCwgZSwgMTAwICsgcmVnaW9uT2Zmc2V0ICk7XHJcblx0Ly8gXHRcdFx0d2lubmVyLm92ZXJSb290ID0gdHJ1ZTtcclxuXHQvLyBcdFx0XHR3aW5uZXIub3ZlclBvcHVwID0gZmFsc2U7XHJcblx0Ly8gXHRcdFx0dGhpcy5hbm5vdFRvU2hvdyA9IHdpbm5lcjtcclxuXHQvLyBcdFx0fVxyXG5cdC8vIFx0fVxyXG5cclxuXHQvLyBcdGlmKCAhdGhpcy5zaG93Vmlld0Fubm90ICl7XHJcblx0Ly8gXHRcdHRoaXMuYW5ub3RUb1Nob3cgPSB1bmRlZmluZWQ7XHJcblx0Ly8gXHR9XHJcblxyXG5cdC8vIFx0Y2hhcnQuc2hvd0Fubm90VmlldyA9ICggdW5kZWZpbmVkICE9IHRoaXMuYW5ub3RUb1Nob3cgKVxyXG5cclxuXHQvLyBcdGNoYXJ0XHJcblx0Ly8gXHRcdC5jaGFydFxyXG5cdC8vIFx0XHQuY2FudmFzXHJcblx0Ly8gXHRcdC5zdHlsZVxyXG5cdC8vIFx0XHQuY3Vyc29yID0gKCBjaGFydC5zaG93QW5ub3RWaWV3ICkgPyAnYXV0bycgOiAnY3Jvc3NoYWlyJztcclxuICAvLyB9XHJcblxyXG4gIC8vIG9uRWRpdEFubm90YXRpb24oKXtcclxuXHQvLyBcdHRoaXMub2Zmc2V0LmxlZnQgLT0gMTAwO1xyXG5cdC8vIFx0dGhpcy5hbm5vdFRvU2hvdy5vdmVyUm9vdCA9IGZhbHNlO1xyXG5cdC8vIFx0dGhpcy5hbm5vdFRvU2hvdy5vdmVyUG9wdXAgPSBmYWxzZTtcclxuXHQvLyBcdHRoaXMuc2hvd0VkaXRBbm5vdCA9IHRydWU7XHJcbiAgLy8gfVxyXG5cdFxyXG5cdC8vIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleWRvd24uZXNjYXBlJywgWyckZXZlbnQnXSlcclxuICAvLyBvbkVzY1ByZXNzZWQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAvLyAgIHRoaXMuc2hvd0FkZEFubm90ID0gdGhpcy5zaG93RWRpdEFubm90ID0gZmFsc2U7XHJcbiAgLy8gfVxyXG4gICAgXHJcbiAgLy8gZ2V0UG9wdXBMb2NhdGlvbiggY2hhcnQsIGUsIHhBZGogPSAwLCB5QWRqID0gMCApe1xyXG5cdC8vIFx0Y29uc3Qgc2NhbGVZQSA9IGNoYXJ0LnNjYWxlc1sgXCJBXCIgXTtcclxuXHQvLyBcdHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggZS50YXJnZXQuaWQgKVxyXG5cdC8vIFx0dmFyIHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIFxyXG4gIC8vICAgY29uc3QgbWF4WSA9IHNjYWxlWUEuYm90dG9tO1xyXG4gICAgXHJcbiAgLy8gICByZXR1cm4ge1xyXG5cdC8vIFx0XHRsZWZ0OiBlLmNsaWVudFggLSAyMDAgKyB4QWRqICxcclxuXHQvLyBcdFx0dG9wOiBtYXhZICsgcmVjdC55ICsgNSArIHlBZGosXHJcblx0Ly8gXHR9XHJcbiAgLy8gfVxyXG59XHJcblxyXG5cclxuXHRcclxuXHJcblx0XHRcclxuIiwiPGVkLXBvcHVwXHJcblx0Wyh2aXNpYmxlKV09XCJzaG93QWRkQW5ub3RcIiBcclxuXHRjbGFzcz1cImFubm90LXBvcHVwXCIgXHJcblx0W29mZnNldF09XCJvZmZzZXRcIiBcclxuXHRzaGFkb3c9XCJ0cnVlXCJcclxuXHQjcG9wdXBBZGQgID5cclxuXHJcblx0PGFkZC1hbm5vdGF0aW9uICpuZ0lmPVwic2hvd0FkZEFubm90XCJcclxuXHRcdChjbG9zZSk9XCJzaG93QWRkQW5ub3Q9ZmFsc2VcIiBcclxuXHRcdFtlcG9jaFN0YXJ0XT1cImVwb2NoU3RhcnRcIlx0XHJcblx0XHRbZXBvY2hFbmRdPVwiZXBvY2hFbmRcIiA+XHJcblx0PC9hZGQtYW5ub3RhdGlvbj5cclxuXHJcbjwvZWQtcG9wdXA+XHJcblxyXG48IS0tIDxlZC1wb3B1cCBcclxuXHRbKHZpc2libGUpXT1cInNob3dFZGl0QW5ub3RcIlxyXG5cdGNsYXNzPVwiYW5ub3QtcG9wdXBcIlxyXG5cdFtvZmZzZXRdPVwib2Zmc2V0XCIgXHJcblx0I3BvcHVwRWRpdCA+XHJcblxyXG5cdDxhZGQtYW5ub3RhdGlvbiAqbmdJZj1cInNob3dFZGl0QW5ub3RcIlxyXG5cdFx0KGNsb3NlKT1cInNob3dFZGl0QW5ub3Q9ZmFsc2VcIlxyXG5cdFx0W2Fubm90YXRpb25dPVwiYW5ub3RUb1Nob3dcIiA+XHJcblx0PC9hZGQtYW5ub3RhdGlvbj5cclxuXHJcbjwvZWQtcG9wdXA+IC0tPlxyXG5cclxuPCEtLSA8ZWQtcG9wdXAgXHJcblx0W29mZnNldF09XCJvZmZzZXRcIlxyXG5cdFt2aXNpYmxlXT1cInNob3dWaWV3QW5ub3RcIlxyXG5cdGNsYXNzPVwiYW5ub3QtcG9wdXBcIj5cclxuXHJcblx0PHZpZXctYW5ub3RhdGlvbiAqbmdJZj1cInNob3dWaWV3QW5ub3RcIlxyXG5cdFx0KGNsb3NlKT1cInNob3dWaWV3QW5ub3Q9ZmFsc2VcIiBcclxuXHRcdFthbm5vdGF0aW9uXT1cImFubm90VG9TaG93XCJcclxuXHRcdChlZGl0KT1cIm9uRWRpdEFubm90YXRpb24oKVwiID5cclxuXHQ8L3ZpZXctYW5ub3RhdGlvbj5cclxuXHJcbjwvZWQtcG9wdXA+IC0tPlxyXG5cclxuIl19