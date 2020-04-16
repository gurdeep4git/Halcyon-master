import "../../sass/main.scss";
import * as Highcharts from "highcharts";
//@ts-ignore
import HC_more from 'highcharts/highcharts-more';
HC_more(Highcharts)

class BubbleChart {

    private chartOptions: any;

    constructor() {
        this.chartOptions = this.getChartOptions();
        this.drawChart();
    }

    private drawChart() {
        Highcharts.chart('chartContainer', this.chartOptions);
    }

    private getChartOptions() {
        return {
            credits: {
                enabled: false
            },
            chart: {
                type: 'bubble',
                plotBorderWidth: 1,
                zoomType: 'xy',
                style: {
                    fontFamily: "Roboto Light",
                    fontSize: "12px"
                },
                height: (9 / 16 * 100) + '%' // 16:9 ratio
            },

            title: {
                //@ts-ignore
                text: null
            },

            subtitle: {
                //@ts-ignore
                text: null
            },

            xAxis: {
                gridLineWidth: 0,
                title: {
                    text: 'Significance'
                },
                labels: {
                    enabled: false,
                    format: '{value} gr'
                },
                tickWidth: 0
            },

            yAxis: {
                startOnTick: false,
                gridLineWidth: 0,
                endOnTick: false,
                title: {
                    text: 'Impact'
                },
                labels: {
                    enabled: false,
                    format: '{value} gr'
                }
            },

            legend: {
                layout: 'horizontal',
                align: 'right',
                verticalAlign: 'top',
                x: 0,
                y: 0,
                floating: false,
                borderWidth: 0,
                margin: 20
            },

            plotOptions: {
                bubble: {
                    minSize: 20,
                    maxSize: "15%",
                },
                series: {
                    dataLabels: {
                        enabled: false,
                        format: '{point.name}'
                    },
                    marker: {
                        fillOpacity: 1,
                        symbol: "circle"
                    }
                }
            },

            series: [{
                name: 'Positive',
                color: 'rgb(59,163,251)',
                data: [
                    { x: 8.24, y: 6.09, z: 1139, color: "rgba(59,163,251,0.5)" },
                    { x: 6.83, y: 4.16, z: 947 },
                    { x: 2.34, y: 0.31, z: 97 },
                    { x: 1.99, y: 0.64, z: 434 },
                    { x: 1.33, y: 0.46, z: 483 }
                ]

            }, {
                name: 'Negative',
                color: '#F68D8D',
                data: [
                    { x: 18, y: -4.89, z: 336 },
                    { x: 7.27, y: -4.15, z: 885 },
                    { x: 6.66, y: -1.05, z: 135 },
                    { x: 5.45, y: -1.51, z: 348 },
                    { x: 4.96, y: -2.44, z: 747 },
                    { x: 3.27, y: -0.35, z: 65 }
                ]
            }],
        }
    }

}
new BubbleChart()