import { Injectable } from '@angular/core';
import { AlertState, Moment } from 'common';
import { ColorHelper } from 'uilib';
import { ChartJsExtension, BaseDrawer } from '../../base/chart-base-extension';
import * as i0 from "@angular/core";
import * as i1 from "../../base/chart.store";
export class AnnotationDrawerPlugin extends ChartJsExtension {
    constructor(store) {
        super(store);
    }
    afterDatasetsDraw(chart, _) {
        var _a;
        if (!((_a = chart.data.datasets) === null || _a === void 0 ? void 0 : _a.length)) {
            return;
        }
        this
            .panel
            .annotations
            .forEach(a => new AnnotationDrawer(chart, this.widget, this.dashboard, a).draw());
    }
}
AnnotationDrawerPlugin.ɵfac = function AnnotationDrawerPlugin_Factory(t) { return new (t || AnnotationDrawerPlugin)(i0.ɵɵinject(i1.ChartStore)); };
AnnotationDrawerPlugin.ɵprov = i0.ɵɵdefineInjectable({ token: AnnotationDrawerPlugin, factory: AnnotationDrawerPlugin.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AnnotationDrawerPlugin, [{
        type: Injectable
    }], function () { return [{ type: i1.ChartStore }]; }, null); })();
class AnnotationDrawer extends BaseDrawer {
    constructor(chart, widget, dashboard, annotation) {
        super(chart);
        this.widget = widget;
        this.dashboard = dashboard;
        this.annotation = annotation;
    }
    draw() {
        if (this.annotation.alert && !this.widget.alert) {
            return;
        }
        if (!this.annotation.timeEnd) {
            this.renderLineAnnotation();
        }
        else {
            this.renderRegionAnnotation();
        }
    }
    get color() {
        var _a, _b, _c;
        if (this.annotation.alert) {
            const alert = this.annotation.alert;
            const state = AlertState[alert.currentState];
            switch (state) {
                case AlertState.Alerting:
                    return ColorHelper.ALERTING_COLOR;
                case AlertState.Ok:
                    return ColorHelper.OK_COLOR;
                case AlertState.Pending:
                case AlertState.NoData:
                    return ColorHelper.PENDING_COLOR;
            }
        }
        return (_c = (_b = (_a = this
            .dashboard
            .data) === null || _a === void 0 ? void 0 : _a.annotationRules[this.annotation.ruleIndex]) === null || _b === void 0 ? void 0 : _b.color) !== null && _c !== void 0 ? _c : ColorHelper.DEFAULT_ANNOTATION_COLOR;
        ;
    }
    renderLineAnnotation() {
        var time = Moment.toDate(this.annotation.time);
        let offset = this.scaleX.getPixelForValue(time);
        if (!(offset < this.scaleX.left || offset > this.scaleX.right)) {
            this.renderLine(offset, this.color /*?? AnnotationsDrawerPlugin.COLOR*/);
        }
    }
    renderLine(offset, color) {
        const lw = 0.8;
        const context = this.context;
        const x = this.alignPixel(offset, lw);
        const y1 = this.alignPixel(this.minY, lw);
        const y2 = this.alignPixel(this.maxY, lw);
        context.beginPath();
        context.strokeStyle = context.fillStyle = color;
        context.lineWidth = lw;
        context.setLineDash([3, 2]);
        context.moveTo(x, y1);
        context.lineTo(x, y2);
        context.stroke();
        context.beginPath();
        context.moveTo(x, y2);
        context.lineTo(x + 5, y2 + 5);
        context.lineTo(x - 5, y2 + 5);
        context.lineTo(x, y2);
        context.closePath();
        context.setLineDash([]);
        context.fill();
        this.annotation.rect = {
            x1: offset - 5,
            y1: this.maxY,
            x2: offset + 5,
            y2: this.maxY + 5
        };
    }
    renderRegionAnnotation() {
        var timeStart = Moment.toDate(this.annotation.time);
        var timeEnd = Moment.toDate(this.annotation.timeEnd);
        let os = this.scaleX.getPixelForValue(timeStart);
        let oe = this.scaleX.getPixelForValue(timeEnd);
        if (oe < this.scaleX.left || os > this.scaleX.right) {
            return;
        }
        os = Math.max(os, this.scaleX.left);
        oe = Math.max(this.scaleX.left, Math.min(oe, this.scaleX.right));
        this.renderRegion(os, oe, this.color /*?? AnnotationsDrawerPlugin.COLOR*/);
    }
    renderRegion(os, oe, color) {
        const lw = 0.8;
        const x1 = this.alignPixel(os, lw);
        const x2 = this.alignPixel(oe, lw);
        const y1 = this.alignPixel(this.minY, lw);
        const y2 = this.alignPixel(this.maxY, lw);
        const context = this.context;
        context.strokeStyle = color;
        context.fillStyle = "#00d3ff" + '20';
        context.lineWidth = lw;
        context.setLineDash([3, 2]);
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x1, y2);
        context.stroke();
        context.moveTo(x2, y1);
        context.lineTo(x2, y2);
        context.stroke();
        context.fillRect(x1, y1, x2 - x1, y2 - y1);
        context.fillStyle = color;
        context.fillRect(x1, y2, x2 - x1, 5);
        context.setLineDash([]);
        context.closePath();
        this.annotation.rect = {
            x1: Math.min(os, oe),
            y1: this.maxY,
            x2: Math.max(oe, os),
            y2: this.maxY + 5
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ub3RhdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9hcHAvcGx1Z2lucy93aWRnZXRzL2NoYXJ0L3NyYy92aWV3L2RyYXdlcnMvYW5ub3RhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUF5QixNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDbkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNwQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLE1BQU0saUNBQWlDLENBQUM7OztBQUsvRSxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsZ0JBQWdCO0lBRTNELFlBQWEsS0FBaUI7UUFDN0IsS0FBSyxDQUFFLEtBQUssQ0FBRSxDQUFDO0lBRWhCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7UUFDekIsSUFBSSxRQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSwwQ0FBRSxNQUFNLENBQUEsRUFBRTtZQUNqQyxPQUFPO1NBQ1A7UUFFRCxJQUFJO2FBQ0YsS0FBSzthQUNMLFdBQVc7YUFDWCxPQUFPLENBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLGdCQUFnQixDQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFFLENBQUMsSUFBSSxFQUFFLENBQUUsQ0FBQztJQUN4RixDQUFDOzs0RkFoQlcsc0JBQXNCOzhEQUF0QixzQkFBc0IsV0FBdEIsc0JBQXNCO2tEQUF0QixzQkFBc0I7Y0FEbEMsVUFBVTs7QUFvQlgsTUFBTSxnQkFBaUIsU0FBUSxVQUFVO0lBRXhDLFlBQ0MsS0FBVSxFQUNGLE1BQWEsRUFDYixTQUFvQixFQUNwQixVQUFzQjtRQUM3QixLQUFLLENBQUUs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LENBQUMsSUFBSSxHQUFHLENBQUM7U0FDakIsQ0FBQTtJQUNGLENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWxlcnRTdGF0ZSwgQW5ub3RhdGlvbiwgRGFzaGJvYXJkLCBNb21lbnQgfSBmcm9tICdjb21tb24nO1xyXG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJ3VpbGliJztcclxuaW1wb3J0IHsgQ2hhcnRKc0V4dGVuc2lvbiwgQmFzZURyYXdlciB9IGZyb20gJy4uLy4uL2Jhc2UvY2hhcnQtYmFzZS1leHRlbnNpb24nO1xyXG5pbXBvcnQgeyBDaGFydFN0b3JlIH0gZnJvbSAnLi4vLi4vYmFzZS9jaGFydC5zdG9yZSc7XHJcbmltcG9ydCB7IENoYXJ0IH0gZnJvbSAnLi4vLi4vY2hhcnQubSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBbm5vdGF0aW9uRHJhd2VyUGx1Z2luIGV4dGVuZHMgQ2hhcnRKc0V4dGVuc2lvbiB7XHJcblx0XHJcblx0Y29uc3RydWN0b3IoIHN0b3JlOiBDaGFydFN0b3JlICl7XHJcblx0XHRzdXBlciggc3RvcmUgKTtcclxuXHJcblx0fVxyXG5cclxuXHRhZnRlckRhdGFzZXRzRHJhdyhjaGFydCwgXykge1xyXG5cdFx0aWYoICFjaGFydC5kYXRhLmRhdGFzZXRzPy5sZW5ndGggKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXNcclxuXHRcdFx0LnBhbmVsXHJcblx0XHRcdC5hbm5vdGF0aW9uc1xyXG5cdFx0XHQuZm9yRWFjaCggYSA9PiBuZXcgQW5ub3RhdGlvbkRyYXdlciggY2hhcnQsIHRoaXMud2lkZ2V0LCB0aGlzLmRhc2hib2FyZCwgYSApLmRyYXcoKSApO1xyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgQW5ub3RhdGlvbkRyYXdlciBleHRlbmRzIEJhc2VEcmF3ZXIge1xyXG5cclxuXHRjb25zdHJ1Y3RvciggXHJcblx0XHRjaGFydDogYW55LFxyXG5cdFx0cHJpdmF0ZSB3aWRnZXQ6IENoYXJ0LFxyXG5cdFx0cHJpdmF0ZSBkYXNoYm9hcmQ6IERhc2hib2FyZCxcclxuXHRcdHByaXZhdGUgYW5ub3RhdGlvbjogQW5ub3RhdGlvbiApe1xyXG5cdFx0XHRzdXBlciggY2hhcnQgKVxyXG5cdH1cclxuXHJcblx0ZHJhdygpe1xyXG5cdFx0aWYoIHRoaXMuYW5ub3RhdGlvbi5hbGVydCAmJiAhdGhpcy53aWRnZXQuYWxlcnQgKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKCAhdGhpcy5hbm5vdGF0aW9uLnRpbWVFbmQgKXtcclxuXHRcdFx0dGhpcy5yZW5kZXJMaW5lQW5ub3RhdGlvbigpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5yZW5kZXJSZWdpb25Bbm5vdGF0aW9uKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldCBjb2xvcigpe1xyXG5cdFx0aWYoIHRoaXMuYW5ub3RhdGlvbi5hbGVydCApe1xyXG5cdFx0XHRjb25zdCBhbGVydCA9IHRoaXMuYW5ub3RhdGlvbi5hbGVydDtcclxuXHRcdFx0Y29uc3Qgc3RhdGUgPSBBbGVydFN0YXRlW2FsZXJ0LmN1cnJlbnRTdGF0ZV07XHJcblxyXG5cdFx0XHRzd2l0Y2goIHN0YXRlICl7XHJcblx0XHRcdFx0Y2FzZSBBbGVydFN0YXRlLkFsZXJ0aW5nOlxyXG5cdFx0XHRcdFx0cmV0dXJuIENvbG9ySGVscGVyLkFMRVJUSU5HX0NPTE9SOyBcclxuXHJcblx0XHRcdFx0Y2FzZSBBbGVydFN0YXRlLk9rOlxyXG5cdFx0XHRcdFx0cmV0dXJuIENvbG9ySGVscGVyLk9LX0NPTE9SOyBcclxuXHJcblx0XHRcdFx0Y2FzZSBBbGVydFN0YXRlLlBlbmRpbmc6XHJcblx0XHRcdFx0Y2FzZSBBbGVydFN0YXRlLk5vRGF0YTpcclxuXHRcdFx0XHRcdHJldHVybiBDb2xvckhlbHBlci5QRU5ESU5HX0NPTE9SOyBcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzXHJcblx0XHRcdC5kYXNoYm9hcmRcclxuXHRcdFx0LmRhdGFcclxuXHRcdFx0Py5hbm5vdGF0aW9uUnVsZXNbIHRoaXMuYW5ub3RhdGlvbi5ydWxlSW5kZXggXVxyXG5cdFx0XHQ/LmNvbG9yID8/IENvbG9ySGVscGVyLkRFRkFVTFRfQU5OT1RBVElPTl9DT0xPUjs7XHJcblx0fVxyXG5cclxuXHRyZW5kZXJMaW5lQW5ub3RhdGlvbiggKXtcclxuXHRcdHZhciB0aW1lID0gTW9tZW50LnRvRGF0ZSh0aGlzLmFubm90YXRpb24udGltZSk7XHJcblx0XHRsZXQgb2Zmc2V0ID0gdGhpcy5zY2FsZVguZ2V0UGl4ZWxGb3JWYWx1ZSggdGltZSApO1xyXG5cclxuXHRcdGlmKCEgKCBvZmZzZXQgPCB0aGlzLnNjYWxlWC5sZWZ0IHx8IG9mZnNldCA+IHRoaXMuc2NhbGVYLnJpZ2h0ICkgKXtcclxuXHRcdFx0dGhpcy5yZW5kZXJMaW5lKCBvZmZzZXQsIHRoaXMuY29sb3IgLyo/PyBBbm5vdGF0aW9uc0RyYXdlclBsdWdpbi5DT0xPUiovIClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJlbmRlckxpbmUoIG9mZnNldDogbnVtYmVyLCBjb2xvciApe1xyXG5cdFx0Y29uc3QgbHcgPSAwLjg7XHJcblx0XHRjb25zdCBjb250ZXh0ID0gdGhpcy5jb250ZXh0O1xyXG5cclxuXHRcdGNvbnN0IHggPSB0aGlzLmFsaWduUGl4ZWwoIG9mZnNldCwgbHcgKTtcclxuXHRcdGNvbnN0IHkxID0gdGhpcy5hbGlnblBpeGVsKCB0aGlzLm1pblksIGx3ICk7XHJcblx0XHRjb25zdCB5MiA9IHRoaXMuYWxpZ25QaXhlbCggdGhpcy5tYXhZLCBsdyApO1xyXG5cclxuXHRcdGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcblx0XHRjb250ZXh0LnN0cm9rZVN0eWxlID0gY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcclxuXHRcdGNvbnRleHQubGluZVdpZHRoID0gbHc7XHJcblx0XHRjb250ZXh0LnNldExpbmVEYXNoKFszLCAyXSk7XHJcblx0XHRjb250ZXh0Lm1vdmVUbyggeCwgeTEgKTtcclxuXHRcdGNvbnRleHQubGluZVRvKCB4LCB5MiApO1xyXG5cdFx0Y29udGV4dC5zdHJva2UoKTtcclxuXHJcblx0XHRjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG5cclxuXHRcdGNvbnRleHQubW92ZVRvKCB4LCB5MiApO1xyXG5cdFx0Y29udGV4dC5saW5lVG8oIHggKyA1LCB5MiArIDUgKTtcclxuXHRcdGNvbnRleHQubGluZVRvKCB4IC0gNSwgeTIgKyA1ICk7XHJcblx0XHRjb250ZXh0LmxpbmVUbyggeCwgeTIgKTtcclxuXHRcdFxyXG5cdFx0Y29udGV4dC5jbG9zZVBhdGgoKTtcclxuXHRcdGNvbnRleHQuc2V0TGluZURhc2goW10pO1xyXG5cdFx0Y29udGV4dC5maWxsKCk7XHJcblxyXG5cdFx0dGhpcy5hbm5vdGF0aW9uLnJlY3QgPSB7XHJcblx0XHRcdHgxOiBvZmZzZXQgLSA1LFxyXG5cdFx0XHR5MTogdGhpcy5tYXhZLFxyXG5cdFx0XHR4Mjogb2Zmc2V0ICsgNSxcclxuXHRcdFx0eTI6IHRoaXMubWF4WSArIDVcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJlbmRlclJlZ2lvbkFubm90YXRpb24oKXtcclxuXHRcdHZhciB0aW1lU3RhcnQgPSBNb21lbnQudG9EYXRlKCB0aGlzLmFubm90YXRpb24udGltZSApO1xyXG5cdFx0dmFyIHRpbWVFbmQgPSBNb21lbnQudG9EYXRlKCB0aGlzLmFubm90YXRpb24udGltZUVuZCApO1xyXG5cclxuXHRcdGxldCBvcyA9IHRoaXMuc2NhbGVYLmdldFBpeGVsRm9yVmFsdWUoIHRpbWVTdGFydCApO1xyXG5cdFx0bGV0IG9lID0gdGhpcy5zY2FsZVguZ2V0UGl4ZWxGb3JWYWx1ZSggdGltZUVuZCApO1xyXG5cclxuXHRcdGlmKCBvZSA8IHRoaXMuc2NhbGVYLmxlZnQgfHwgb3MgPiB0aGlzLnNjYWxlWC5yaWdodCApe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0b3MgPSBNYXRoLm1heCggb3MsIHRoaXMuc2NhbGVYLmxlZnQgKTtcclxuXHRcdG9lID0gTWF0aC5tYXgoIHRoaXMuc2NhbGVYLmxlZnQsXHRNYXRoLm1pbiggb2UsIHRoaXMuc2NhbGVYLnJpZ2h0ICkpO1xyXG5cclxuXHRcdHRoaXMucmVuZGVyUmVnaW9uKCBvcywgb2UsIHRoaXMuY29sb3IgLyo/PyBBbm5vdGF0aW9uc0RyYXdlclBsdWdpbi5DT0xPUiovIClcclxuXHR9XHJcblxyXG5cdHJlbmRlclJlZ2lvbiggb3M6IG51bWJlciwgb2U6IG51bWJlciwgY29sb3IgKXtcclxuXHRcdGNvbnN0IGx3ID0gMC44O1xyXG5cdFx0Y29uc3QgeDEgPSB0aGlzLmFsaWduUGl4ZWwoIG9zLCBsdyApO1xyXG5cdFx0Y29uc3QgeDIgPSB0aGlzLmFsaWduUGl4ZWwoIG9lLCBsdyApO1xyXG5cdFx0Y29uc3QgeTEgPSB0aGlzLmFsaWduUGl4ZWwoIHRoaXMubWluWSwgbHcgKTtcclxuXHRcdGNvbnN0IHkyID0gdGhpcy5hbGlnblBpeGVsKCB0aGlzLm1heFksIGx3ICk7XHJcblxyXG5cdFx0Y29uc3QgY29udGV4dCA9IHRoaXMuY29udGV4dDtcclxuXHJcblx0XHRjb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XHJcblx0XHRjb250ZXh0LmZpbGxTdHlsZSA9IFwiIzAwZDNmZlwiICsgJzIwJ1xyXG5cdFx0Y29udGV4dC5saW5lV2lkdGggPSBsdztcclxuXHRcdGNvbnRleHQuc2V0TGluZURhc2goWzMsIDJdKTtcclxuXHJcblx0XHRjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG5cclxuXHRcdGNvbnRleHQubW92ZVRvKCB4MSwgeTEgKTtcclxuXHRcdGNvbnRleHQubGluZVRvKCB4MSwgeTIgKTtcclxuXHRcdGNvbnRleHQuc3Ryb2tlKCk7XHJcblx0XHRcclxuXHRcdGNvbnRleHQubW92ZVRvKCB4MiwgeTEgKTtcclxuXHRcdGNvbnRleHQubGluZVRvKCB4MiwgeTIgKTtcclxuXHRcdGNvbnRleHQuc3Ryb2tlKCk7XHJcblxyXG5cdFx0Y29udGV4dC5maWxsUmVjdCggeDEsIHkxLFx0eDIgLSB4MSwgeTIgLSB5MSApO1x0XHJcblxyXG5cdFx0Y29udGV4dC5maWxsU3R5bGUgPSBjb2xvciA7XHJcblx0XHRjb250ZXh0LmZpbGxSZWN0KCB4MSwgeTIsXHR4MiAtIHgxLCA1ICk7XHRcclxuXHRcdGNvbnRleHQuc2V0TGluZURhc2goW10pO1xyXG5cdFx0Y29udGV4dC5jbG9zZVBhdGgoKTtcclxuXHJcblx0XHR0aGlzLmFubm90YXRpb24ucmVjdCA9IHtcclxuXHRcdFx0eDE6IE1hdGgubWluKCBvcywgb2UgKSxcclxuXHRcdFx0eTE6IHRoaXMubWF4WSxcclxuXHRcdFx0eDI6IE1hdGgubWF4KCBvZSwgb3MgKSxcclxuXHRcdFx0eTI6IHRoaXMubWF4WSArIDVcclxuXHRcdH1cclxuXHR9XHJcbn0iXX0=