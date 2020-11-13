import { AXIS_X, AXIS_Y_LEFT, AXIS_Y_RIGHT, ScaleType } from '../chart.m';
import { TooltipBuilder } from './drawers/tooltip';
import { AxisUnitHelper } from './helpers/unit-helper';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2FwcC9wbHVnaW5zL3dpZGdldHMvY2hhcnQvc3JjL3ZpZXcvb3B0aW9ucy1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQVMsU0FBUyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFJdkQsTUFBTSxPQUFPLGVBQWU7SUFFM0IsTUFBTSxDQUFDLFVBQVUsQ0FBRSxJQUFvQjtRQUN0QyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7UUFDbkQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO1FBQ25ELEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFFM0MsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUV0QixPQUFPO1lBQ04sbUJBQW1CLEVBQUUsS0FBSztZQUMxQixTQUFTLEVBQUUsS0FBSztZQUVoQixRQUFRLEVBQUUsY0FBYyxDQUFDLEtBQUssQ0FBRSxJQUFJLENBQUU7WUFFdEMsTUFBTSxFQUFFO2dCQUNQLE9BQU8sRUFBRSxLQUFLO2FBQ2Q7WUFFRCxRQUFRLEVBQUUsSUFBSTtZQUVkLE1BQU0sRUFBRTtnQkFDUCxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBRSxDQUFDO2dCQUMzQixLQUFLLEVBQUUsQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFFLENBQUMsRUFBRSxJQUFJLENBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFFLENBQUMsRUFBRSxLQUFLLENBQUUsQ0FBQzthQUM3RDtZQUVELE9BQU8sRUFBRSxDQUFFLENBQUMsRUFBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFFLENBQUMsQ0FBRTtTQUM1QyxDQUFDO0lBQ0gsQ0FBQztJQUVPLE1BQU0sQ0FBQyxRQUFRLENBQUUsQ0FBUTtRQUNoQyxPQUFPO1lBQ04sRUFBRSxFQUFFLE1BQU07WUFDVixJQUFJLEVBQUUsTUFBTTtZQUNaLFNBQVMsRUFBRTtnQkFDVixLQUFLLEVBQUUseUJBQXlCO2FBQ2hDO1lBQ0QsS0FBSyxFQUFFO2dCQUNOLFFBQVEsRUFBRSxJQUFJO2dCQUNkLGVBQWUsRUFBRSxFQUFFO2dCQUNuQixXQUFXLEVBQUUsQ0FBQztnQkFDZCxXQUFXLEVBQUUsQ0FBQzthQUVkO1lBQ0QsSUFBSSxFQUFFO2dCQUNMLGNBQWMsRUFBRTtvQkFDZixNQUFNLEVBQUUsVUFBVTtvQkFDbEIsTUFBTSxFQUFFLE9BQU87b0JBQ2YsSUFBSSxFQUFFLE9BQU87b0JBQ2IsR0FBRyxFQUFFLFdBQVc7b0JBQ2hCLElBQUksRUFBRSxLQUFLO29CQUNYLEtBQUssRUFBRSxLQUFLO29CQUNaLElBQUksRUFBRSxRQUFRO2lCQUNiO2FBQ0Y7WUFDRCxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSTtTQUN0QixDQUFBO0lBQ0YsQ0FBQztJQUVPLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBUSxFQUFFLElBQWE7UUFDOUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDbEQsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztRQUU3QyxNQUFNLElBQUksR0FBRztZQUNaLEVBQUUsRUFBRSxFQUFFO1lBQ04sT0FBTyxFQUFFLEtBQUssQ0FBQyxJQUFJO1lBQ25CLElBQUksRUFBRSxDQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxhQUFhO1lBQ3BGLFNBQVMsRUFBRTtnQkFDVixLQUFLLEVBQUUseUJBQXlCO2dCQUNoQyxhQUFhLEVBQUUsQ0FBQzthQUNoQjtZQUNELFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTztZQUNqQyxVQUFVLEVBQUM7Z0JBQ1YsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUFLO2dCQUNwQixXQUFXLEVBQUUsS0FBSyxDQUFDLEtBQUs7YUFDeEI7WUFDRCxLQUFLLEVBQUM7Z0JBQ0wsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO2dCQUNkLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRztnQkFDZCxZQUFZLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFO29CQUN0QyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBRSxLQUFLLEdBQUcsQ0FBQyxDQUFFLEVBQUU7d0JBQ3hDLE9BQU87cUJBQ1A7b0JBRUQsT0FBTyxjQUFjLENBQUMsaUJBQWlCLENBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDO2dCQUM5RSxDQUFDO2FBQ0Q7WUFDRCxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLO1NBQ3hCLENBQUE7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi4vY2hhcnQuYyc7XHJcbmltcG9ydCB7IEFYSVNfWCwgQVhJU19ZX0xFRlQsIEFYSVNfWV9SSUdIVCwgQ2hhcnQsIFNjYWxlVHlwZSB9IGZyb20gJy4uL2NoYXJ0Lm0nO1xyXG5pbXBvcnQgeyBUb29sdGlwQnVpbGRlciB9IGZyb20gJy4vZHJhd2Vycy90b29sdGlwJztcclxuaW1wb3J0IHsgQXhpc1VuaXRIZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMvdW5pdC1oZWxwZXInO1xyXG5cclxuZGVjbGFyZSB2YXIgQ2hhcnQ6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBPcHRpb25zUHJvdmlkZXJ7XHJcblxyXG5cdHN0YXRpYyBnZXRPcHRpb25zKCBjb21wOiBDaGFydENvbXBvbmVudCApe1xyXG5cdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmRlZmF1bHRGb250Q29sb3IgPSAnI2UzZTNlMyc7XHJcblx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZGVmYXVsdEZvbnRGYW1pbHkgPSAnUm9ib3RvJztcclxuXHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5kZWZhdWx0Rm9udFNpemUgPSAxMTtcclxuXHJcblx0XHRjb25zdCB3ID0gY29tcC53aWRnZXQ7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0bWFpbnRhaW5Bc3BlY3RSYXRpbzogZmFsc2UsXHJcblx0XHRcdGFuaW1hdGlvbjogZmFsc2UsXHJcblxyXG5cdFx0XHR0b29sdGlwczogVG9vbHRpcEJ1aWxkZXIuYnVpbGQoIGNvbXAgKSxcclxuXHJcblx0XHRcdGxlZ2VuZDoge1xyXG5cdFx0XHRcdGRpc3BsYXk6IGZhbHNlXHJcblx0XHRcdH0sXHJcblx0XHJcblx0XHRcdHNwYW5HYXBzOiB0cnVlLFxyXG5cclxuXHRcdFx0c2NhbGVzOiB7XHJcblx0XHRcdFx0eEF4ZXM6IFt0aGlzLmdldEF4aXNYKCB3ICldLFxyXG5cdFx0XHRcdHlBeGVzOiBbIHRoaXMuZ2V0QXhpc1koIHcsIHRydWUgKSwgdGhpcy5nZXRBeGlzWSggdywgZmFsc2UgKV0gXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRvbkhvdmVyOiAoIGUgKSA9PiBjb21wLnN0b3JlLm1vdXNlLm1vdmUoIGUgKVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgc3RhdGljIGdldEF4aXNYKCB3OiBDaGFydCApe1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0aWQ6IEFYSVNfWCxcclxuXHRcdFx0dHlwZTogJ3RpbWUnLFxyXG5cdFx0XHRncmlkTGluZXM6IHtcclxuXHRcdFx0XHRjb2xvcjogJ3JnYmEoIDI1NSwyNTUsMjU1LCAwLjEpJyxcclxuXHRcdFx0fSxcclxuXHRcdFx0dGlja3M6IHtcclxuXHRcdFx0XHRhdXRvU2tpcDogdHJ1ZSxcclxuXHRcdFx0XHRhdXRvU2tpcFBhZGRpbmc6IDUwLFxyXG5cdFx0XHRcdG1heFJvdGF0aW9uOiAwLFxyXG5cdFx0XHRcdG1pblJvdGF0aW9uOiAwLFxyXG5cdFx0XHRcdFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR0aW1lOiB7XHJcblx0XHRcdFx0ZGlzcGxheUZvcm1hdHM6IHtcclxuXHRcdFx0XHRcdHNlY29uZDogJ0hIOm1tOnNzJyxcclxuXHRcdFx0XHRcdG1pbnV0ZTogJ0hIOm1tJyxcclxuXHRcdFx0XHRcdGhvdXI6ICdISDptbScsXHJcblx0XHRcdFx0XHRkYXk6ICdNL0QgSEg6bW0nLFxyXG5cdFx0XHRcdFx0d2VlazogJ00vRCcsXHJcblx0XHRcdFx0XHRtb250aDogJ00vRCcsXHJcblx0XHRcdFx0XHR5ZWFyOiAnWVlZWS1NJyxcclxuXHRcdFx0XHQgfSxcclxuXHRcdFx0fSxcclxuXHRcdFx0ZGlzcGxheTogdy5heGVzLnguc2hvd1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBzdGF0aWMgZ2V0QXhpc1kodzogQ2hhcnQsIGxlZnQ6IGJvb2xlYW4pe1xyXG5cdFx0Y29uc3Qgd0F4aXMgPSBsZWZ0ID8gdy5heGVzLmxlZnRZIDogdy5heGVzLnJpZ2h0WTtcclxuXHRcdGNvbnN0IGlkID0gbGVmdCA/IEFYSVNfWV9MRUZUIDogQVhJU19ZX1JJR0hUO1xyXG5cclxuXHRcdGNvbnN0IGF4aXMgPSB7XHJcblx0XHRcdGlkOiBpZCxcclxuXHRcdFx0ZGlzcGxheTogd0F4aXMuc2hvdyxcclxuXHRcdFx0dHlwZTogKCAhd0F4aXMuc2NhbGUgfHwgd0F4aXMuc2NhbGUgPT0gU2NhbGVUeXBlLkxpbmVhciApID8gXCJsaW5lYXJcIiA6IFwibG9nYXJpdGhtaWNcIixcclxuXHRcdFx0Z3JpZExpbmVzOiB7XHJcblx0XHRcdFx0Y29sb3I6ICdyZ2JhKCAyNTUsMjU1LDI1NSwgMC4xKScsXHJcblx0XHRcdFx0emVyb0xpbmVXaWR0aDogMyxcclxuXHRcdFx0fSxcclxuXHRcdFx0cG9zaXRpb246IGxlZnQgPyBcImxlZnRcIiA6IFwicmlnaHRcIixcclxuXHRcdFx0c2NhbGVMYWJlbDp7XHJcblx0XHRcdFx0ZGlzcGxheTogd0F4aXMubGFiZWwsXHJcblx0XHRcdFx0bGFiZWxTdHJpbmc6IHdBeGlzLmxhYmVsLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR0aWNrczp7XHJcblx0XHRcdFx0bWluOiB3QXhpcy5taW4sXHJcblx0XHRcdFx0bWF4OiB3QXhpcy5tYXgsXHJcblx0XHRcdFx0dXNlckNhbGxiYWNrOiAobGFiZWwsIGluZGV4LCBsYWJlbHMpID0+IHtcclxuXHRcdFx0XHRcdGlmKCBsYWJlbHMubGVuZ3RoID4gOCAmJiAhKCBpbmRleCAlIDIgKSApe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdHJldHVybiBBeGlzVW5pdEhlbHBlci5nZXRGb3JtYXR0ZWRWYWx1ZSggbGFiZWwsIHdBeGlzLnVuaXQsIHdBeGlzLmRlY2ltYWxzICk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdGFja2VkOiB3LmRpc3BsYXkuc3RhY2ssXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGF4aXM7XHJcblx0fVxyXG59XHJcbiJdfQ==