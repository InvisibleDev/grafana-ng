import { Inject, Injectable } from '@angular/core';
import { PANEL_TOKEN } from 'common';
import { DataPointNullValueOption } from '../chart.m';
import { ColorHelper } from 'uilib';
import * as i0 from "@angular/core";
export class DisplayManager {
    constructor(panel) {
        this.panel = panel;
    }
    get display() {
        return this
            .panel
            .widget
            .display;
    }
    get options() {
        return this
            .panel
            .widget
            .component
            .control
            .chart
            .options;
    }
    setup(ds) {
        //this.setupSecondaryYAxis();					
        this.setupLines(ds);
        this.setupPoints(ds);
        this.setupNullValue(ds);
    }
    setupLines(ds) {
        const showLines = this.getShowLines(ds);
        const lineWidth = this.getLineWidth(ds);
        const fill = this.getFill(ds);
        let opacity = (fill / 10);
        ds.fill = ( /*showLines &&*/fill > 0);
        ds.backgroundColor = this.getLineColor(ds, opacity);
        opacity = (showLines && lineWidth) ? 1 : 0;
        ds.borderColor = this.getLineColor(ds, opacity);
        ds.borderWidth = lineWidth;
        ds.steppedLine = this.getStaircase(ds);
        if (this.getDashes(ds)) {
            const len = this.getDashLength(ds);
            const space = this.getDashSpace(ds);
            ds.borderDash = [len, space];
        }
        else {
            ds.borderDash = undefined;
        }
        ds.order = this.getZIndex(ds);
        ds.legend = this.getLegend(ds);
        // ds.yAxisID = ( 1 == this.getYAxis( ds ) ) ? 'A': 'B';
    }
    setupPoints(ds) {
        const showPoints = this.getShowPoints(ds);
        const opacity = showPoints ? 1 : 0;
        const color = this.getLineColor(ds, opacity);
        ds.pointBorderColor = `${color}`;
        ds.pointBackgroundColor = `${color}`;
        ds.pointRadius = showPoints ? this.getPointRadius(ds) : 0;
    }
    setupNullValue(ds) {
        switch (this.display.nullValue) {
            case DataPointNullValueOption.Connected:
                this.options.spanGaps = true;
                ds.data.forEach(p => p.y = p.isNull ? null : p.y);
                break;
            case DataPointNullValueOption.Null:
                this.options.spanGaps = false;
                ds.data.forEach(p => p.y = p.isNull ? null : p.y);
                break;
            case DataPointNullValueOption.NullAsZero:
                this.options.spanGaps = false;
                ds.data.forEach(p => p.y = p.isNull ? 0 : p.y);
                break;
        }
    }
    setupOverrides() {
        // const needSecondaryYAxis = AxesManager.needSecondaryYAxis( this.chart.widget );
        // const actualSecondaryYAxisUsers = this
        // 	.datasets
        // 	.filter( x => x.yAxisID == 'B' )
        // 	.length
        // const yAxesCount = this.chart.options.scales.yAxes.length;
        // if( 2 == yAxesCount && !needSecondaryYAxis ){
        // 	this.chart.options.scales.yAxes.splice( 1, 1 );
        // } else if( /*1 == yAxesCount && needSecondaryYAxis*/ actualSecondaryYAxisUsers != needSecondaryYAxis ){
        // 	this.chart.destroy();
        // 	this.chart.needRebuild.emit();
        // 	this.chart = undefined;
        // 	return;
        // }
        // this.datasets.forEach(x => this.setup(x));
    }
    getShowLines(ds) {
        const o = this.getOverride(ds);
        return (o && undefined != o.lines) ? o.lines : this.display.showLines;
    }
    getLineWidth(ds) {
        const o = this.getOverride(ds);
        return (o && undefined != o.lineWidth) ? o.lineWidth : this.display.lineWidth;
    }
    getLineColor(ds, opacity) {
        const o = this.getOverride(ds);
        const color = ColorHelper.colors[ds.index % ColorHelper.colors.length];
        const defaultColor = ColorHelper.hexToRgbString(color, opacity);
        const useOverride = (o && undefined != o.color);
        let overrideColor;
        if (useOverride) {
            overrideColor = ColorHelper.hexToRgbString(o.color, opacity);
        }
        return (useOverride) ? overrideColor : defaultColor;
    }
    getFill(ds) {
        const o = this.getOverride(ds);
        return (o && undefined != o.lineFill) ? o.lineFill : this.display.fill;
    }
    getStaircase(ds) {
        const o = this.getOverride(ds);
        return (o && undefined != o.staircase) ? o.staircase : this.display.staircase;
    }
    getDashes(ds) {
        const o = this.getOverride(ds);
        return (o && undefined != o.dashes) ? o.dashes : false;
    }
    getDashLength(ds) {
        const o = this.getOverride(ds);
        return (o && undefined != o.dashLength) ? o.dashLength : 1;
    }
    getDashSpace(ds) {
        const o = this.getOverride(ds);
        return (o && undefined != o.dashSpace) ? o.dashSpace : 1;
    }
    getShowPoints(ds) {
        const o = this.getOverride(ds);
        return (o && undefined != o.points) ? o.points : this.display.showPoints;
    }
    getPointRadius(ds) {
        const o = this.getOverride(ds);
        return (o && undefined != o.pointRadius) ? o.pointRadius : this.display.pointRadius;
    }
    getLegend(ds) {
        const o = this.getOverride(ds);
        return (o && undefined != o.legend) ? o.legend : true;
    }
    getZIndex(ds) {
        const o = this.getOverride(ds);
        return (o && undefined != o.zIndex) ? o.zIndex : 0;
    }
    getYAxis(ds) {
        const o = this.getOverride(ds);
        return (o && undefined != o.yAxis) ? o.yAxis : 1;
    }
    getOverride(ds) {
        return this
            .display
            .overrides
            .find(x => x.alias && new RegExp(x.alias).test(ds.label));
    }
}
DisplayManager.ɵfac = function DisplayManager_Factory(t) { return new (t || DisplayManager)(i0.ɵɵinject(PANEL_TOKEN)); };
DisplayManager.ɵprov = i0.ɵɵdefineInjectable({ token: DisplayManager, factory: DisplayManager.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DisplayManager, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [PANEL_TOKEN]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGxheS1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBwL3BsdWdpbnMvd2lkZ2V0cy9jaGFydC9zcmMvdmlldy9kaXNwbGF5LW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFTLFdBQVcsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM1QyxPQUFPLEVBQUUsd0JBQXdCLEVBQVcsTUFBTSxZQUFZLENBQUM7QUFDL0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLE9BQU8sQ0FBQzs7QUFHcEMsTUFBTSxPQUFPLGNBQWM7SUFtQjFCLFlBQTZDLEtBQVk7UUFBWixVQUFLLEdBQUwsS0FBSyxDQUFPO0lBRXpELENBQUM7SUFuQkQsSUFBWSxPQUFPO1FBQ2xCLE9BQU8sSUFBSTthQUNULEtBQUs7YUFDTCxNQUFNO2FBQ04sT0FBTyxDQUFDO0lBQ1gsQ0FBQztJQUVELElBQVksT0FBTztRQUNsQixPQUFPLElBQUk7YUFDVCxLQUFLO2FBQ0wsTUFBTTthQUNOLFNBQVM7YUFDVCxPQUFPO2FBQ1AsS0FBSzthQUNMLE9BQU8sQ0FBQztJQUNYLENBQUM7SUFNRCxLQUFLLENBQUMsRUFBVztRQUNoQixrQ0FBa0M7UUFFbEMsSUFBSSxDQUFDLFVBQVUsQ0FBRSxFQUFFLENBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxDQUFFLEVBQUUsQ0FBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUUsRUFBRSxDQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVPLFVBQVUsQ0FBRSxFQUFXO1FBQzlCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUUsRUFBRSxDQUFFLENBQUM7UUFDMUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBRSxFQUFFLENBQUUsQ0FBQztRQUMx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QUFJLENBQUMsQ0FBQyxTQUFTLENBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7SUFDakYsQ0FBQztJQUVELFNBQVMsQ0FBRSxFQUFXO1FBQ3JCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUUsRUFBRSxDQUFFLENBQUM7UUFFakMsT0FBTyxDQUFFLENBQUMsSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDMUQsQ0FBQztJQUVELGFBQWEsQ0FBRSxFQUFXO1FBQ3pCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUUsRUFBRSxDQUFFLENBQUM7UUFFakMsT0FBTyxDQUFFLENBQUMsSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELFlBQVksQ0FBRSxFQUFXO1FBQ3hCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUUsRUFBRSxDQUFFLENBQUM7UUFFakMsT0FBTyxDQUFFLENBQUMsSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELGFBQWEsQ0FBRSxFQUFXO1FBQ3pCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUUsRUFBRSxDQUFFLENBQUM7UUFFakMsT0FBTyxDQUFFLENBQUMsSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztJQUM1RSxDQUFDO0lBRUQsY0FBYyxDQUFFLEVBQVc7UUFDMUIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBRSxFQUFFLENBQUUsQ0FBQztRQUVqQyxPQUFPLENBQUUsQ0FBQyxJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO0lBQ3ZGLENBQUM7SUFFRCxTQUFTLENBQUUsRUFBVztRQUNyQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFFLEVBQUUsQ0FBRSxDQUFDO1FBRWpDLE9BQU8sQ0FBRSxDQUFDLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3pELENBQUM7SUFFRCxTQUFTLENBQUUsRUFBVztRQUNyQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFFLEVBQUUsQ0FBRSxDQUFDO1FBRWpDLE9BQU8sQ0FBRSxDQUFDLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxRQUFRLENBQUUsRUFBVztRQUNwQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFFLEVBQUUsQ0FBRSxDQUFDO1FBRWpDLE9BQU8sQ0FBRSxDQUFDLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxXQUFXLENBQUUsRUFBVztRQUN2QixPQUFPLElBQUk7YUFDVCxPQUFPO2FBQ1AsU0FBUzthQUNULElBQUksQ0FBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxNQUFNLENBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBRSxDQUFDLElBQUksQ0FBRSxFQUFFLENBQUMsS0FBSyxDQUFFLENBQUcsQ0FBQTtJQUNsRSxDQUFDOzs0RUEvTVcsY0FBYyxjQW1CSCxXQUFXO3NEQW5CdEIsY0FBYyxXQUFkLGNBQWM7a0RBQWQsY0FBYztjQUQxQixVQUFVOztzQkFvQkssTUFBTTt1QkFBRSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFBhbmVsLCBQQU5FTF9UT0tFTiB9IGZyb20gJ2NvbW1vbic7XHJcbmltcG9ydCB7IERhdGFQb2ludE51bGxWYWx1ZU9wdGlvbiwgRGF0YVNldCB9IGZyb20gJy4uL2NoYXJ0Lm0nO1xyXG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJ3VpbGliJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERpc3BsYXlNYW5hZ2VyIHtcclxuXHJcblx0cHJpdmF0ZSBnZXQgZGlzcGxheSgpIHtcclxuXHRcdHJldHVybiB0aGlzXHJcblx0XHRcdC5wYW5lbFxyXG5cdFx0XHQud2lkZ2V0XHJcblx0XHRcdC5kaXNwbGF5O1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBnZXQgb3B0aW9ucygpe1xyXG5cdFx0cmV0dXJuIHRoaXNcclxuXHRcdFx0LnBhbmVsXHJcblx0XHRcdC53aWRnZXRcclxuXHRcdFx0LmNvbXBvbmVudFxyXG5cdFx0XHQuY29udHJvbFxyXG5cdFx0XHQuY2hhcnRcclxuXHRcdFx0Lm9wdGlvbnM7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvciAoIEBJbmplY3QoIFBBTkVMX1RPS0VOICkgcHJpdmF0ZSBwYW5lbDogUGFuZWwgKSB7XHJcblxyXG5cdH1cclxuXHJcblx0c2V0dXAoZHM6IERhdGFTZXQpIHtcclxuXHRcdC8vdGhpcy5zZXR1cFNlY29uZGFyeVlBeGlzKCk7XHRcdFx0XHRcdFxyXG5cclxuXHRcdHRoaXMuc2V0dXBMaW5lcyggZHMgKTtcclxuXHRcdHRoaXMuc2V0dXBQb2ludHMoIGRzICk7XHJcblx0XHR0aGlzLnNldHVwTnVsbFZhbHVlKCBkcyApO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBzZXR1cExpbmVzKCBkczogRGF0YVNldCApIHtcclxuXHRcdGNvbnN0IHNob3dMaW5lcyA9IHRoaXMuZ2V0U2hvd0xpbmVzKCBkcyApO1xyXG5cdFx0Y29uc3QgbGluZVdpZHRoID0gdGhpcy5nZXRMaW5lV2lkdGgoIGRzICk7XHJcblx0XHRjb25zdCBmaWxsID0gdGhpcy5nZXRGaWxsKCBkcyApO1xyXG5cclxuXHRcdGxldCBvcGFjaXR5ID0gKCBmaWxsIC8gMTApO1xyXG5cdFx0ZHMuZmlsbCA9ICgvKnNob3dMaW5lcyAmJiovIGZpbGwgPiAwKTtcclxuXHRcdGRzLmJhY2tncm91bmRDb2xvciA9IHRoaXMuZ2V0TGluZUNvbG9yKCBkcywgb3BhY2l0eSApO1xyXG5cclxuXHRcdG9wYWNpdHkgPSAoc2hvd0xpbmVzICYmIGxpbmVXaWR0aCkgPyAxIDogMDtcclxuXHRcdGRzLmJvcmRlckNvbG9yID0gdGhpcy5nZXRMaW5lQ29sb3IoIGRzLCBvcGFjaXR5ICk7XHJcblx0XHRkcy5ib3JkZXJXaWR0aCA9IGxpbmVXaWR0aDtcclxuXHJcblx0XHQgZHMuc3RlcHBlZExpbmUgPSB0aGlzLmdldFN0YWlyY2FzZSggZHMgKTtcclxuXHJcblx0XHRpZiggdGhpcy5nZXREYXNoZXMoIGRzICkgKXtcclxuXHRcdFx0Y29uc3QgbGVuID0gdGhpcy5nZXREYXNoTGVuZ3RoKCBkcyApO1xyXG5cdFx0XHRjb25zdCBzcGFjZSA9IHRoaXMuZ2V0RGFzaFNwYWNlKCBkcyApO1xyXG5cdFx0XHRkcy5ib3JkZXJEYXNoID0gWyBsZW4sIHNwYWNlIF1cclxuXHRcdH1cclxuXHRcdGVsc2V7XHJcblx0XHRcdGRzLmJvcmRlckRhc2ggPSB1bmRlZmluZWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0ZHMub3JkZXIgPSB0aGlzLmdldFpJbmRleCggZHMgKTtcclxuXHRcdGRzLmxlZ2VuZCA9IHRoaXMuZ2V0TGVnZW5kKCBkcyApO1xyXG5cclxuXHRcdC8vIGRzLnlBeGlzSUQgPSAoIDEgPT0gdGhpcy5nZXRZQXhpcyggZHMgKSApID8gJ0EnOiAnQic7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHNldHVwUG9pbnRzKCBkczogRGF0YVNldCApIHtcclxuXHRcdGNvbnN0IHNob3dQb2ludHMgPSB0aGlzLmdldFNob3dQb2ludHMoIGRzICk7XHJcblxyXG5cdFx0Y29uc3Qgb3BhY2l0eSA9IHNob3dQb2ludHMgPyAxIDogMFxyXG5cdFx0Y29uc3QgY29sb3IgPSB0aGlzLmdldExpbmVDb2xvciggZHMsIG9wYWNpdHkgKTtcclxuXHJcblx0XHRkcy5wb2ludEJvcmRlckNvbG9yID0gYCR7Y29sb3J9YDtcclxuXHRcdGRzLnBvaW50QmFja2dyb3VuZENvbG9yID0gYCR7Y29sb3J9YDtcclxuXHJcblx0XHRkcy5wb2ludFJhZGl1cyA9IHNob3dQb2ludHMgPyB0aGlzLmdldFBvaW50UmFkaXVzKCBkcyApIDogMDtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgc2V0dXBOdWxsVmFsdWUoIGRzOiBEYXRhU2V0ICkge1xyXG5cdFx0c3dpdGNoICggdGhpcy5kaXNwbGF5Lm51bGxWYWx1ZSkge1xyXG5cdFx0XHRjYXNlIERhdGFQb2ludE51bGxWYWx1ZU9wdGlvbi5Db25uZWN0ZWQ6XHJcblx0XHRcdFx0dGhpcy5vcHRpb25zLnNwYW5HYXBzID0gdHJ1ZTtcclxuXHRcdFx0XHRkcy5kYXRhLmZvckVhY2goIHAgPT4gcC55ID0gcC5pc051bGwgPyBudWxsIDogcC55ICk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIERhdGFQb2ludE51bGxWYWx1ZU9wdGlvbi5OdWxsOlxyXG5cdFx0XHRcdHRoaXMub3B0aW9ucy5zcGFuR2FwcyA9IGZhbHNlO1xyXG5cdFx0XHRcdGRzLmRhdGEuZm9yRWFjaCggcCA9PiBwLnkgPSBwLmlzTnVsbCA/IG51bGwgOiBwLnkgKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgRGF0YVBvaW50TnVsbFZhbHVlT3B0aW9uLk51bGxBc1plcm86XHJcblx0XHRcdFx0dGhpcy5vcHRpb25zLnNwYW5HYXBzID0gZmFsc2U7XHJcblx0XHRcdFx0ZHMuZGF0YS5mb3JFYWNoKCBwID0+IHAueSA9IHAuaXNOdWxsID8gMCA6IHAueSApO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBzZXR1cE92ZXJyaWRlcygpe1xyXG5cdFx0Ly8gY29uc3QgbmVlZFNlY29uZGFyeVlBeGlzID0gQXhlc01hbmFnZXIubmVlZFNlY29uZGFyeVlBeGlzKCB0aGlzLmNoYXJ0LndpZGdldCApO1xyXG5cclxuXHRcdC8vIGNvbnN0IGFjdHVhbFNlY29uZGFyeVlBeGlzVXNlcnMgPSB0aGlzXHJcblx0XHQvLyBcdC5kYXRhc2V0c1xyXG5cdFx0Ly8gXHQuZmlsdGVyKCB4ID0+IHgueUF4aXNJRCA9PSAnQicgKVxyXG5cdFx0Ly8gXHQubGVuZ3RoXHJcbiBcclxuXHRcdC8vIGNvbnN0IHlBeGVzQ291bnQgPSB0aGlzLmNoYXJ0Lm9wdGlvbnMuc2NhbGVzLnlBeGVzLmxlbmd0aDtcclxuXHRcdFxyXG5cdFx0Ly8gaWYoIDIgPT0geUF4ZXNDb3VudCAmJiAhbmVlZFNlY29uZGFyeVlBeGlzICl7XHJcblx0XHQvLyBcdHRoaXMuY2hhcnQub3B0aW9ucy5zY2FsZXMueUF4ZXMuc3BsaWNlKCAxLCAxICk7XHJcblx0XHQvLyB9IGVsc2UgaWYoIC8qMSA9PSB5QXhlc0NvdW50ICYmIG5lZWRTZWNvbmRhcnlZQXhpcyovIGFjdHVhbFNlY29uZGFyeVlBeGlzVXNlcnMgIT0gbmVlZFNlY29uZGFyeVlBeGlzICl7XHJcblx0XHQvLyBcdHRoaXMuY2hhcnQuZGVzdHJveSgpO1xyXG5cdFx0Ly8gXHR0aGlzLmNoYXJ0Lm5lZWRSZWJ1aWxkLmVtaXQoKTtcclxuXHRcdC8vIFx0dGhpcy5jaGFydCA9IHVuZGVmaW5lZDtcclxuXHRcdC8vIFx0cmV0dXJuO1xyXG5cdFx0Ly8gfVxyXG5cclxuXHRcdC8vIHRoaXMuZGF0YXNldHMuZm9yRWFjaCh4ID0+IHRoaXMuc2V0dXAoeCkpO1xyXG5cdH1cclxuXHJcblx0Z2V0U2hvd0xpbmVzKGRzOiBEYXRhU2V0KTogYm9vbGVhbntcclxuXHRcdGNvbnN0IG8gPSB0aGlzLmdldE92ZXJyaWRlKCBkcyApO1xyXG5cclxuXHRcdHJldHVybiAoIG8gJiYgdW5kZWZpbmVkICE9IG8ubGluZXMgKSA/IG8ubGluZXMgOiB0aGlzLmRpc3BsYXkuc2hvd0xpbmVzO1xyXG5cdH1cclxuXHRcclxuXHRnZXRMaW5lV2lkdGgoZHM6IERhdGFTZXQpOiBudW1iZXJ7XHJcblx0XHRjb25zdCBvID0gdGhpcy5nZXRPdmVycmlkZSggZHMgKTtcclxuXHJcblx0XHRyZXR1cm4gKCBvICYmIHVuZGVmaW5lZCAhPSBvLmxpbmVXaWR0aCApID8gby5saW5lV2lkdGggOiB0aGlzLmRpc3BsYXkubGluZVdpZHRoO1xyXG5cdH1cclxuXHJcblx0Z2V0TGluZUNvbG9yKGRzOiBEYXRhU2V0LCBvcGFjaXR5OiBudW1iZXIpIDogc3RyaW5ne1xyXG5cdFx0Y29uc3QgbyA9IHRoaXMuZ2V0T3ZlcnJpZGUoIGRzICk7XHJcblxyXG5cdFx0Y29uc3QgY29sb3IgPSBDb2xvckhlbHBlci5jb2xvcnNbZHMuaW5kZXggJSBDb2xvckhlbHBlci5jb2xvcnMubGVuZ3RoXTtcclxuXHRcdGNvbnN0IGRlZmF1bHRDb2xvciA9IENvbG9ySGVscGVyLmhleFRvUmdiU3RyaW5nKCBjb2xvciwgb3BhY2l0eSApO1xyXG5cclxuXHRcdGNvbnN0IHVzZU92ZXJyaWRlID0gKCBvICYmIHVuZGVmaW5lZCAhPSBvLmNvbG9yIClcclxuXHRcdGxldCBvdmVycmlkZUNvbG9yOiBzdHJpbmc7XHJcblxyXG5cdFx0aWYoIHVzZU92ZXJyaWRlICl7XHJcblx0XHRcdG92ZXJyaWRlQ29sb3IgPSBDb2xvckhlbHBlci5oZXhUb1JnYlN0cmluZyggby5jb2xvciwgb3BhY2l0eSApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAoIHVzZU92ZXJyaWRlICkgPyBvdmVycmlkZUNvbG9yIDogZGVmYXVsdENvbG9yO1xyXG5cdH1cclxuXHJcblx0Z2V0RmlsbCggZHM6IERhdGFTZXQgKTogbnVtYmVye1xyXG5cdFx0Y29uc3QgbyA9IHRoaXMuZ2V0T3ZlcnJpZGUoIGRzICk7XHJcblxyXG5cdFx0cmV0dXJuICggbyAmJiB1bmRlZmluZWQgIT0gby5saW5lRmlsbCApID8gby5saW5lRmlsbCA6IHRoaXMuZGlzcGxheS5maWxsO1xyXG5cdH1cclxuXHJcblx0Z2V0U3RhaXJjYXNlKCBkczogRGF0YVNldCApOiBib29sZWFue1xyXG5cdFx0Y29uc3QgbyA9IHRoaXMuZ2V0T3ZlcnJpZGUoIGRzICk7XHJcblxyXG5cdFx0cmV0dXJuICggbyAmJiB1bmRlZmluZWQgIT0gby5zdGFpcmNhc2UgKSA/IG8uc3RhaXJjYXNlIDogdGhpcy5kaXNwbGF5LnN0YWlyY2FzZTtcclxuXHR9XHJcblxyXG5cdGdldERhc2hlcyggZHM6IERhdGFTZXQgKXtcclxuXHRcdGNvbnN0IG8gPSB0aGlzLmdldE92ZXJyaWRlKCBkcyApO1xyXG5cclxuXHRcdHJldHVybiAoIG8gJiYgdW5kZWZpbmVkICE9IG8uZGFzaGVzICkgPyBvLmRhc2hlcyA6IGZhbHNlO1xyXG5cdH1cclxuXHJcblx0Z2V0RGFzaExlbmd0aCggZHM6IERhdGFTZXQgKTogbnVtYmVye1xyXG5cdFx0Y29uc3QgbyA9IHRoaXMuZ2V0T3ZlcnJpZGUoIGRzICk7XHJcblxyXG5cdFx0cmV0dXJuICggbyAmJiB1bmRlZmluZWQgIT0gby5kYXNoTGVuZ3RoICkgPyBvLmRhc2hMZW5ndGggOiAxO1xyXG5cdH1cclxuXHJcblx0Z2V0RGFzaFNwYWNlKCBkczogRGF0YVNldCApOiBudW1iZXJ7XHJcblx0XHRjb25zdCBvID0gdGhpcy5nZXRPdmVycmlkZSggZHMgKTtcclxuXHJcblx0XHRyZXR1cm4gKCBvICYmIHVuZGVmaW5lZCAhPSBvLmRhc2hTcGFjZSApID8gby5kYXNoU3BhY2UgOiAxO1xyXG5cdH1cclxuXHJcblx0Z2V0U2hvd1BvaW50cyggZHM6IERhdGFTZXQgKSA6IGJvb2xlYW4ge1xyXG5cdFx0Y29uc3QgbyA9IHRoaXMuZ2V0T3ZlcnJpZGUoIGRzICk7XHJcblxyXG5cdFx0cmV0dXJuICggbyAmJiB1bmRlZmluZWQgIT0gby5wb2ludHMgKSA/IG8ucG9pbnRzIDogdGhpcy5kaXNwbGF5LnNob3dQb2ludHM7XHJcblx0fVxyXG5cclxuXHRnZXRQb2ludFJhZGl1cyggZHM6IERhdGFTZXQgKSA6IG51bWJlcntcclxuXHRcdGNvbnN0IG8gPSB0aGlzLmdldE92ZXJyaWRlKCBkcyApO1xyXG5cclxuXHRcdHJldHVybiAoIG8gJiYgdW5kZWZpbmVkICE9IG8ucG9pbnRSYWRpdXMgKSA/IG8ucG9pbnRSYWRpdXMgOiB0aGlzLmRpc3BsYXkucG9pbnRSYWRpdXM7XHJcblx0fVxyXG5cclxuXHRnZXRMZWdlbmQoIGRzOiBEYXRhU2V0ICkgOiBib29sZWFue1xyXG5cdFx0Y29uc3QgbyA9IHRoaXMuZ2V0T3ZlcnJpZGUoIGRzICk7XHJcblxyXG5cdFx0cmV0dXJuICggbyAmJiB1bmRlZmluZWQgIT0gby5sZWdlbmQgKSA/IG8ubGVnZW5kIDogdHJ1ZTtcclxuXHR9XHJcblxyXG5cdGdldFpJbmRleCggZHM6IERhdGFTZXQgKTogbnVtYmVye1xyXG5cdFx0Y29uc3QgbyA9IHRoaXMuZ2V0T3ZlcnJpZGUoIGRzICk7XHJcblxyXG5cdFx0cmV0dXJuICggbyAmJiB1bmRlZmluZWQgIT0gby56SW5kZXggKSA/IG8uekluZGV4IDogMDtcclxuXHR9XHJcblxyXG5cdGdldFlBeGlzKCBkczogRGF0YVNldCApe1xyXG5cdFx0Y29uc3QgbyA9IHRoaXMuZ2V0T3ZlcnJpZGUoIGRzICk7XHJcblxyXG5cdFx0cmV0dXJuICggbyAmJiB1bmRlZmluZWQgIT0gby55QXhpcyApID8gby55QXhpcyA6IDE7XHJcblx0fVxyXG5cclxuXHRnZXRPdmVycmlkZSggZHM6IERhdGFTZXQgKXtcclxuXHRcdHJldHVybiB0aGlzXHJcblx0XHRcdC5kaXNwbGF5XHJcblx0XHRcdC5vdmVycmlkZXNcclxuXHRcdFx0LmZpbmQoIHggPT4geC5hbGlhcyAmJiBuZXcgUmVnRXhwKCB4LmFsaWFzICkudGVzdCggZHMubGFiZWwgKSAgKVxyXG5cdH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=