let datesList = [];
let confirmedCasesList = [];
let newCasesList = [];

const totalsContainer = document.getElementById('totales-div');
const dailyContainer = document.getElementById('diarios-div');
const diariosForm = document.getElementById('diarios-form');
const totalesForm = document.getElementById('totales-form');

let myChart = document.getElementById('totales-chart').getContext("2d");

var yellowRedGradient =
    myChart.createLinearGradient(0, 0, 0, 600);
    yellowRedGradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
    yellowRedGradient.addColorStop(1, 'rgba(255, 185, 0, 0.9)');

var yellowPurpleGradient =
    myChart.createLinearGradient(0, 0, 0, 690);
    yellowPurpleGradient.addColorStop(0, 'rgba(162, 0, 244, 1)');
    yellowPurpleGradient.addColorStop(1, 'rgba(41, 109, 255, 0.9)');

window.onload = () => {

    loadData();
}

const loadData = () => {

    fetch('https://chile-coronapi1.p.rapidapi.com/v3/historical/nation', {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'chile-coronapi1.p.rapidapi.com',
            'x-rapidapi-key': '94a928ddd1msh94a43eaf68e37cfp11c6aejsn31acec61285f',
            'useQueryString': true,
        },
    })
        .then(res => res.json())
        .then(data => {

            preparedList = Object.keys(data).map((day) => {
                return { day: day, data: data[day] };
            })

            loadChart(preparedList);
        })
}

const loadChart = (allDataArr) => {


    getDates(allDataArr)
        .then(resDaysList => {
            datesList = resDaysList;
        })


    getConfirmedCases(allDataArr)
        .then(resCases => {
            confirmedCasesList = resCases;

        })

    getDailyNewCases(allDataArr)
        .then(resNewCases => {
            newCasesList = resNewCases;
            paintTotalCasesChart();
        })



}

function getDates(allDataArr) {
    return new Promise((resolve, reject) => {

        let daysList = [];

        daysList = allDataArr.forEach((obj) => {
            daysList.push(obj.day);

            if (obj.day == allDataArr[allDataArr.length - 1].day) {

                return resolve(daysList);
            }
        })
    })
}

function getConfirmedCases(allDataArr) {
    return new Promise((resolve, reject) => {

        let daysList = [];

        dataList = allDataArr.forEach((obj) => {
            daysList.push(obj.data.confirmed);

            if (obj.day == allDataArr[allDataArr.length - 1].day) {

                return resolve(daysList);
            }
        })
    })
}

function getDailyNewCases(allDataArr) {
    return new Promise((resolve, reject) => {

        let newCasesList = [];
        let flag = true;
        let dailyCases = 0;
        let previousDayCases = 0;

        daysList = allDataArr.forEach((obj) => {

            if (flag) {
                flag = false;
                previousDayCases = obj.data.confirmed;
                newCasesList.push(obj.data.confirmed);
            } else {

                dailyCases = obj.data.confirmed - previousDayCases;
                newCasesList.push(dailyCases);
                previousDayCases = obj.data.confirmed;

            }

            if (obj.day == allDataArr[allDataArr.length - 1].day) {

                return resolve(newCasesList);
            }


        })
    })
}

const paintTotalCasesChart = () => {

    //Global Options:
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 14;
    Chart.defaults.global.defaultFontColor = '#333';

    let totalesChart = new Chart(myChart, {
        type: 'bar', //bar, horizontalBar, pie, line, doughnut, radar, polarArea, bubble, area, scatter
        data: {

            labels: datesList, //dateslist
            datasets: [{
                label: 'Casos confirmados totales',
                data: confirmedCasesList, //confirmedCasesList

                backgroundColor: yellowRedGradient,
                /*backgroundColor: [
                    'green',
                    'red',
                    'yellow',
                    'rgba(250,200,100, 1)',
                ],*/
                borderWidth: 0,
                borderColor: '#777',
                hoverBorderWidth: '1',
                hoverBorderColor: 'rgba(255, 231, 0, 0.9)',

            }],

        },
        options: {
            title: {
                display: true,
                text: 'Casos de contagio totales en Chile',
                fontSize: 25,
            },
            legend: {
                display: true,
                position: 'top',
                labels: {
                    fontColor: 'black',
                },
            },
            layout: {
                padding: {
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            tooltips: {
                enabled: true,
            },
            animation: {
                duration: 5000,
                easing: 'easeOutQuart',

            }
        },

    });

    diariosForm.onsubmit = (event) => {

        event.preventDefault();
        updateADiarios(totalesChart);
    }


}

const paintDailyCasesChart = () => {

    //Global Options:
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 14;
    Chart.defaults.global.defaultFontColor = '#333';

    let diariosChart = new Chart(myChart, {
        type: 'bar', //bar, horizontalBar, pie, line, doughnut, radar, polarArea, bubble, area, scatter
        data: {

            labels: datesList, //dateslist
            datasets: [{
                label: 'Casos confirmados diarios',
                data: newCasesList,
                backgroundColor: yellowRedGradient,
                /*backgroundColor: [
                    'green',
                    'red',
                    'yellow',
                    'rgba(250,200,100, 1)',
                ],*/
                borderWidth: 0,
                borderColor: '#777',
                hoverBorderWidth: '1',
                hoverBorderColor: 'rgba(255, 231, 0, 0.9)',

            }],

        },
        options: {
            title: {
                display: true,
                text: 'Casos de contagio diarios en Chile',
                fontSize: 25,
            },
            legend: {
                display: true,
                position: 'top',
                labels: {
                    fontColor: 'black',
                },
            },
            layout: {
                padding: {
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            tooltips: {
                enabled: true,
            },
            animation: {
                duration: 3000,
                easing: 'easeOutQuart',

            }
        },

    });

    totalesForm.onsubmit = (event) => {

        event.preventDefault();
        updateATotales(diariosChart);
    }
}

function updateADiarios(chart) {

    chart.options.title.text = 'Casos Diarios Confirmados';

    chart.data.datasets.forEach((dataset) => {
        chart.data.datasets = [{
            label: 'Casos diarios confirmados',
            data: newCasesList, //confirmedCasesList

            backgroundColor: yellowPurpleGradient,
            /*backgroundColor: [
                'green',
                'red',
                'yellow',
                'rgba(250,200,100, 1)',
            ],*/
            borderWidth: 0,
            borderColor: '#777',
            hoverBorderWidth: '1',
            hoverBorderColor: 'rgba(255, 231, 0, 0.9)',

        }];
    });

    chart.update();

    totalesForm.onsubmit = (event) => {

        event.preventDefault();
        updateATotales(chart);
    }
}

function updateATotales(chart) {

    chart.options.title.text = 'Casos Totales Confirmados';

    chart.data.datasets.forEach((dataset) => {
        chart.data.datasets = [{
            label: 'Casos confirmados totales',
            data: confirmedCasesList, //confirmedCasesList

            backgroundColor: yellowRedGradient,
            /*backgroundColor: [
                'green',
                'red',
                'yellow',
                'rgba(250,200,100, 1)',
            ],*/
            borderWidth: 0,
            borderColor: '#777',
            hoverBorderWidth: '1',
            hoverBorderColor: 'rgba(255, 231, 0, 0.9)',

        }];
    });

    /*thisChartData.forEach(x => {
        dataset.data.pop();
    })*/

    chart.update();
}

/*JSC.chart("chartDiv", {
    type: "map",
    series: [{ map: "cl" }]
  })*/