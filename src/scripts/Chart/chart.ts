import "../../sass/main.scss";
import * as Highcharts from "highcharts";

class MyChart {

    person: { name: string, age: number };

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
                type: 'scatter',
                zoomType: 'xy',
                style: {
                    fontFamily: "Roboto Light",
                    fontSize: "12px"
                }
            },
            title: {
                //@ts-ignore
                text: undefined
            },
            subtitle: {
                //@ts-ignore
                text: undefined
            },
            xAxis: {
                max: 0.2,
                title: {
                    enabled: true,
                    text: 'Significance'
                },
                startOnTick: false,
                endOnTick: true,
                showLastLabel: true,
                minorTicks: true,
                gridLineWidth: 0,
                minorGridLineWidth: 0,
            },
            yAxis: {
                max: 50,
                title: {
                    text: 'Impact'
                },
                lineWidth: 1,
                gridLineWidth: 0,
                minorGridLineWidth: 0,
                tickWidth: 1,
            },
            legend: {
                layout: 'horizontal',
                align: 'left',
                verticalAlign: 'top',
                x: 0,
                y: 0,
                floating: false,
                borderWidth: 0,
                margin: 20
            },
            plotOptions: {
                series: {
                    events: {
                        legendItemClick: function () {
                            var series = this.chart.series;
                            console.log(series);
                        }
                    }
                },
                scatter: {
                    marker: {
                        radius: 5,
                        symbol: "circle",
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    // tooltip: {
                    //     headerFormat: '',
                    //     pointFormat: '<div><p>{point.x}</p><br/><p>{point.y}</p></div>'
                    // }
                }
            },
            tooltip: {
                useHTML: true,
                formatter: function () {
                    const html = `
                        <div>
                            <strong>Hi there i am good</strong>
                        </div>
                    `;
                    return html;

                },
            },
            series: [{
                name: 'Positive',
                color: 'green',
                marker: {
                    radius: 5,
                    symbol: "circle"
                },
                data: [
                    [0.08, 20], [0.16, 35]
                ]

            }, {
                name: 'Negative',
                color: 'red',
                marker: {
                    radius: 5,
                    symbol: "circle"
                },
                data: [
                    [0.1, 16], [0.04, 45]
                ]
            }]
        }
    }
}
new MyChart();