import { AXIS_X, AXIS_Y_LEFT, AXIS_Y_RIGHT, ScaleType } from '../chart.m';
import { TooltipBuilder } from './drawers/tooltip';
import { AxisUnitHelper } from '../edit/axes/y-axis/unit-helper';
export class OptionsProvider {
    static getOptions(comp) {
        Chart.defaults.global.defaultFontColor = '#e3e3e3';
        Chart.defaults.global.defaultFontFamily = 'Roboto';
        Chart.defaults.global.defaultFontSize = 11;
        const w = comp.widget;
        return {
            maintainAspectRatio: false,
            animation: false,
            tooltips: TooltipBuilder.build(comp),
            legend: {
                display: false
            },
            spanGaps: true,
            scales: {
                xAxes: [this.getAxisX(w)],
                yAxes: [this.getAxisY(w, true), this.getAxisY(w, false)]
            },
            onHover: (e) => comp.store.mouse.move(e)
        };
    }
    static getAxisX(w) {
        return {
            id: AXIS_X,
            type: 'time',
            gridLines: {
                color: 'rgba( 255,255,255, 0.1)',
            },
            ticks: {
                autoSkip: true,
                autoSkipPadding: 50,
                maxRotation: 0,
                minRotation: 0,
            },
            time: {
                displayFormats: {
                    second: 'HH:mm:ss',
                    minute: 'HH:mm',
                    hour: 'HH:mm',
                    day: 'M/D HH:mm',
                    week: 'M/D',
                    month: 'M/D',
                    year: 'YYYY-M',
                },
            },
            display: w.axes.x.show
        };
    }
    static getAxisY(w, left) {
        const wAxis = left ? w.axes.leftY : w.axes.rightY;
        const id = left ? AXIS_Y_LEFT : AXIS_Y_RIGHT;
        const axis = {
            id: id,
            display: wAxis.show,
            type: (!wAxis.scale || wAxis.scale == ScaleType.Linear) ? "linear" : "logarithmic",
            gridLines: {
                color: 'rgba( 255,255,255, 0.1)',
                zeroLineWidth: 3,
            },
            position: left ? "left" : "right",
            scaleLabel: {
                display: wAxis.label,
                labelString: wAxis.label,
            },
            ticks: {
                min: wAxis.min,
                max: wAxis.max,
                userCallback: (label, index, labels) => {
                    if (labels.length > 8 && !(index % 2)) {
                        return;
                    }
                    return AxisUnitHelper.getFormattedValue(label, wAxis.unit, wAxis.decimals);
                }
            },
            stacked: w.display.stack,
        };
        return axis;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2FwcC9wbHVnaW5zL3dpZGdldHMvY2hhcnQvc3JjL3ZpZXcvb3B0aW9ucy1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQXVCLFNBQVMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMvRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBSWpFLE1BQU0sT0FBTyxlQUFlO0lBRTNCLE1BQU0sQ0FBQyxVQUFVLENBQUUsSUFBb0I7UUFDdEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDO1FBQ25ELEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztRQUNuRCxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBRTNDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFdEIsT0FBTztZQUNOLG1CQUFtQixFQUFFLEtBQUs7WUFDMUIsU0FBUyxFQUFFLEtBQUs7WUFFaEIsUUFBUSxFQUFFLGNBQWMsQ0FBQyxLQUFLLENBQUUsSUFBSSxDQUFFO1lBRXRDLE1BQU0sRUFBRTtnQkFDUCxPQUFPLEVBQUUsS0FBSzthQUNkO1lBRUQsUUFBUSxFQUFFLElBQUk7WUFFZCxNQUFNLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUUsQ0FBQztnQkFDM0IsS0FBSyxFQUFFLENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBRSxDQUFDLEVBQUUsSUFBSSxDQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBRSxDQUFDLEVBQUUsS0FBSyxDQUFFLENBQUM7YUFDN0Q7WUFFRCxPQUFPLEVBQUUsQ0FBRSxDQUFDLEVBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBRSxDQUFDLENBQUU7U0FDNUMsQ0FBQztJQUNILENBQUM7SUFFTyxNQUFNLENBQUMsUUFBUSxDQUFFLENBQWE7UUFDckMsT0FBTztZQUNOLEVBQUUsRUFBRSxNQUFNO1lBQ1YsSUFBSSxFQUFFLE1BQU07WUFDWixTQUFTLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLHlCQUF5QjthQUNoQztZQUNELEtBQUssRUFBRTtnQkFDTixRQUFRLEVBQUUsSUFBSTtnQkFDZCxlQUFlLEVBQUUsRUFBRTtnQkFDbkIsV0FBVyxFQUFFLENBQUM7Z0JBQ2QsV0FBVyxFQUFFLENBQUM7YUFFZDtZQUNELElBQUksRUFBRTtnQkFDTCxjQUFjLEVBQUU7b0JBQ2YsTUFBTSxFQUFFLFVBQVU7b0JBQ2xCLE1BQU0sRUFBRSxPQUFPO29CQUNmLElBQUksRUFBRSxPQUFPO29CQUNiLEdBQUcsRUFBRSxXQUFXO29CQUNoQixJQUFJLEVBQUUsS0FBSztvQkFDWCxLQUFLLEVBQUUsS0FBSztvQkFDWixJQUFJLEVBQUUsUUFBUTtpQkFDYjthQUNGO1lBQ0QsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUk7U0FDdEIsQ0FBQTtJQUNGLENBQUM7SUFFTyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQWEsRUFBRSxJQUFhO1FBQ25ELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2xELE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7UUFFN0MsTUFBTSxJQUFJLEdBQUc7WUFDWixFQUFFLEVBQUUsRUFBRTtZQUNOLE9BQU8sRUFBRSxLQUFLLENBQUMsSUFBSTtZQUNuQixJQUFJLEVBQUUsQ0FBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsYUFBYTtZQUNwRixTQUFTLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLHlCQUF5QjtnQkFDaEMsYUFBYSxFQUFFLENBQUM7YUFDaEI7WUFDRCxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU87WUFDakMsVUFBVSxFQUFDO2dCQUNWLE9BQU8sRUFBRSxLQUFLLENBQUMsS0FBSztnQkFDcEIsV0FBVyxFQUFFLEtBQUssQ0FBQyxLQUFLO2FBQ3hCO1lBQ0QsS0FBSyxFQUFDO2dCQUNMLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRztnQkFDZCxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7Z0JBQ2QsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRTtvQkFDdEMsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUUsS0FBSyxHQUFHLENBQUMsQ0FBRSxFQUFFO3dCQUN4QyxPQUFPO3FCQUNQO29CQUVELE9BQU8sY0FBYyxDQUFDLGlCQUFpQixDQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUUsQ0FBQztnQkFDOUUsQ0FBQzthQUNEO1lBQ0QsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSztTQUN4QixDQUFBO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFydENvbXBvbmVudCB9IGZyb20gJy4uL2NoYXJ0LmMnO1xyXG5pbXBvcnQgeyBBWElTX1gsIEFYSVNfWV9MRUZULCBBWElTX1lfUklHSFQsIENoYXJ0IGFzIENoYXJ0TW9kZWwsIFNjYWxlVHlwZSB9IGZyb20gJy4uL2NoYXJ0Lm0nO1xyXG5pbXBvcnQgeyBUb29sdGlwQnVpbGRlciB9IGZyb20gJy4vZHJhd2Vycy90b29sdGlwJztcclxuaW1wb3J0IHsgQXhpc1VuaXRIZWxwZXIgfSBmcm9tICcuLi9lZGl0L2F4ZXMveS1heGlzL3VuaXQtaGVscGVyJztcclxuXHJcbmRlY2xhcmUgdmFyIENoYXJ0OiBhbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgT3B0aW9uc1Byb3ZpZGVye1xyXG5cclxuXHRzdGF0aWMgZ2V0T3B0aW9ucyggY29tcDogQ2hhcnRDb21wb25lbnQgKXtcclxuXHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5kZWZhdWx0Rm9udENvbG9yID0gJyNlM2UzZTMnO1xyXG5cdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmRlZmF1bHRGb250RmFtaWx5ID0gJ1JvYm90byc7XHJcblx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZGVmYXVsdEZvbnRTaXplID0gMTE7XHJcblxyXG5cdFx0Y29uc3QgdyA9IGNvbXAud2lkZ2V0O1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG1haW50YWluQXNwZWN0UmF0aW86IGZhbHNlLFxyXG5cdFx0XHRhbmltYXRpb246IGZhbHNlLFxyXG5cclxuXHRcdFx0dG9vbHRpcHM6IFRvb2x0aXBCdWlsZGVyLmJ1aWxkKCBjb21wICksXHJcblxyXG5cdFx0XHRsZWdlbmQ6IHtcclxuXHRcdFx0XHRkaXNwbGF5OiBmYWxzZVxyXG5cdFx0XHR9LFxyXG5cdFxyXG5cdFx0XHRzcGFuR2FwczogdHJ1ZSxcclxuXHJcblx0XHRcdHNjYWxlczoge1xyXG5cdFx0XHRcdHhBeGVzOiBbdGhpcy5nZXRBeGlzWCggdyApXSxcclxuXHRcdFx0XHR5QXhlczogWyB0aGlzLmdldEF4aXNZKCB3LCB0cnVlICksIHRoaXMuZ2V0QXhpc1koIHcsIGZhbHNlICldIFxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0b25Ib3ZlcjogKCBlICkgPT4gY29tcC5zdG9yZS5tb3VzZS5tb3ZlKCBlIClcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHN0YXRpYyBnZXRBeGlzWCggdzogQ2hhcnRNb2RlbCApe1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0aWQ6IEFYSVNfWCxcclxuXHRcdFx0dHlwZTogJ3RpbWUnLFxyXG5cdFx0XHRncmlkTGluZXM6IHtcclxuXHRcdFx0XHRjb2xvcjogJ3JnYmEoIDI1NSwyNTUsMjU1LCAwLjEpJyxcclxuXHRcdFx0fSxcclxuXHRcdFx0dGlja3M6IHtcclxuXHRcdFx0XHRhdXRvU2tpcDogdHJ1ZSxcclxuXHRcdFx0XHRhdXRvU2tpcFBhZGRpbmc6IDUwLFxyXG5cdFx0XHRcdG1heFJvdGF0aW9uOiAwLFxyXG5cdFx0XHRcdG1pblJvdGF0aW9uOiAwLFxyXG5cdFx0XHRcdFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR0aW1lOiB7XHJcblx0XHRcdFx0ZGlzcGxheUZvcm1hdHM6IHtcclxuXHRcdFx0XHRcdHNlY29uZDogJ0hIOm1tOnNzJyxcclxuXHRcdFx0XHRcdG1pbnV0ZTogJ0hIOm1tJyxcclxuXHRcdFx0XHRcdGhvdXI6ICdISDptbScsXHJcblx0XHRcdFx0XHRkYXk6ICdNL0QgSEg6bW0nLFxyXG5cdFx0XHRcdFx0d2VlazogJ00vRCcsXHJcblx0XHRcdFx0XHRtb250aDogJ00vRCcsXHJcblx0XHRcdFx0XHR5ZWFyOiAnWVlZWS1NJyxcclxuXHRcdFx0XHQgfSxcclxuXHRcdFx0fSxcclxuXHRcdFx0ZGlzcGxheTogdy5heGVzLnguc2hvd1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBzdGF0aWMgZ2V0QXhpc1kodzogQ2hhcnRNb2RlbCwgbGVmdDogYm9vbGVhbil7XHJcblx0XHRjb25zdCB3QXhpcyA9IGxlZnQgPyB3LmF4ZXMubGVmdFkgOiB3LmF4ZXMucmlnaHRZO1xyXG5cdFx0Y29uc3QgaWQgPSBsZWZ0ID8gQVhJU19ZX0xFRlQgOiBBWElTX1lfUklHSFQ7XHJcblxyXG5cdFx0Y29uc3QgYXhpcyA9IHtcclxuXHRcdFx0aWQ6IGlkLFxyXG5cdFx0XHRkaXNwbGF5OiB3QXhpcy5zaG93LFxyXG5cdFx0XHR0eXBlOiAoICF3QXhpcy5zY2FsZSB8fCB3QXhpcy5zY2FsZSA9PSBTY2FsZVR5cGUuTGluZWFyICkgPyBcImxpbmVhclwiIDogXCJsb2dhcml0aG1pY1wiLFxyXG5cdFx0XHRncmlkTGluZXM6IHtcclxuXHRcdFx0XHRjb2xvcjogJ3JnYmEoIDI1NSwyNTUsMjU1LCAwLjEpJyxcclxuXHRcdFx0XHR6ZXJvTGluZVdpZHRoOiAzLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRwb3NpdGlvbjogbGVmdCA/IFwibGVmdFwiIDogXCJyaWdodFwiLFxyXG5cdFx0XHRzY2FsZUxhYmVsOntcclxuXHRcdFx0XHRkaXNwbGF5OiB3QXhpcy5sYWJlbCxcclxuXHRcdFx0XHRsYWJlbFN0cmluZzogd0F4aXMubGFiZWwsXHJcblx0XHRcdH0sXHJcblx0XHRcdHRpY2tzOntcclxuXHRcdFx0XHRtaW46IHdBeGlzLm1pbixcclxuXHRcdFx0XHRtYXg6IHdBeGlzLm1heCxcclxuXHRcdFx0XHR1c2VyQ2FsbGJhY2s6IChsYWJlbCwgaW5kZXgsIGxhYmVscykgPT4ge1xyXG5cdFx0XHRcdFx0aWYoIGxhYmVscy5sZW5ndGggPiA4ICYmICEoIGluZGV4ICUgMiApICl7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0cmV0dXJuIEF4aXNVbml0SGVscGVyLmdldEZvcm1hdHRlZFZhbHVlKCBsYWJlbCwgd0F4aXMudW5pdCwgd0F4aXMuZGVjaW1hbHMgKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdHN0YWNrZWQ6IHcuZGlzcGxheS5zdGFjayxcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYXhpcztcclxuXHR9XHJcbn1cclxuIl19