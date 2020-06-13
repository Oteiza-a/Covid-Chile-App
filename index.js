let datesList = [];
let confirmedCasesList = [];
let newCasesList = [];
let totalDeathsList = [];
let dailyDeathsList = [];

const totalsContainer = document.getElementById('totales-div');
const dailyContainer = document.getElementById('diarios-div');

const diariosForm = document.getElementById('diarios-form');
const totalesForm = document.getElementById('totales-form');

const muertesTotalesForm = document.getElementById('muertes-totales-form');
const muertesDiariasForm = document.getElementById('muertes-diarias-form');


let myChart = document.getElementById('totales-chart').getContext("2d");
let h = document.getElementById('totales-div').clientHeight;

var yellowRedGradient =
    myChart.createLinearGradient(0, -100, 0, h + h);
yellowRedGradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
yellowRedGradient.addColorStop(1, 'rgba(255, 185, 0, 1)');

var yellowPurpleGradient =
    myChart.createLinearGradient(0, -100, 0, h + h + h + h);
yellowPurpleGradient.addColorStop(0, 'rgba(162, 0, 244, 1)');
yellowPurpleGradient.addColorStop(1, 'rgba(124, 220, 255, 1)');


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

            let formattedDay = '';
            let counter = 0;

            preparedList.forEach(element => {

                formattedDay = element.day[3] + element.day[4] + '/' + element.day[0] + element.day[1] + '/' + element.day.slice(6);

                preparedList[counter].day = formattedDay;
                counter++;
            })

            loadChart(preparedList);
        })
        .catch(err => {
            location.reload();
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
        })

    getDeaths(allDataArr)
        .then(resDeathsList => {
            totalDeathsList = resDeathsList;
        })

    getDailyDeaths(allDataArr)
        .then(resDailyDeaths => {
            dailyDeathsList = resDailyDeaths;

            paintTotalCasesChart();
            showParagraph();
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

function getDeaths(allDataArr) {
    return new Promise((resolve, reject) => {

        let deathsList = [];

        deathsList = allDataArr.forEach((obj) => {
            deathsList.push(obj.data.deaths);

            if (obj.day == allDataArr[allDataArr.length - 1].day) {

                return resolve(deathsList);
            }
        })
    })
}

function getDailyDeaths(allDataArr) {

    return new Promise((resolve, reject) => {

        let dailyDeathsList = [];
        let flag = true;
        let previousDeaths = 0;

        deathsList = allDataArr.forEach((obj) => {

            if (flag) {
                flag = false;
                previousDeaths = obj.data.deaths;
                dailyDeathsList.push(obj.data.deaths);

            } else {
                dailyDeathsList.push(obj.data.deaths - previousDeaths);
                previousDeaths = obj.data.deaths;
            }

            if (obj.day == allDataArr[allDataArr.length - 1].day) {

                return resolve(dailyDeathsList);
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
                text: 'Casos de Contagio Totales Confirmados',
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
    })

    diariosForm.onsubmit = (event) => {

        event.preventDefault();
        updateADiarios(totalesChart);
    }

    totalesForm.onsubmit = (event) => {

        event.preventDefault();
        updateATotales(totalesChart);
    }

    muertesTotalesForm.onsubmit = (event) => {

        event.preventDefault();
        updateAMuertesTotales(totalesChart);
    }

    muertesDiariasForm.onsubmit = (event) => {

        event.preventDefault();
        updateAMuertesDiarias(totalesChart);
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

const showParagraph = () => {
    const parr = document.getElementById('info-parr');

    let lastDate = datesList[datesList.length - 1];
    let lastNewCases = newCasesList[newCasesList.length - 1];
    let lastTotalCases = confirmedCasesList[confirmedCasesList.length - 1];
    let lastNewDeaths = dailyDeathsList[dailyDeathsList.length - 1];
    let lastTotalDeaths = totalDeathsList[totalDeathsList.length - 1];
    parr.innerHTML = `<p>El último reporte de COVID-19 en Chile fue el ${lastDate}: hubieron ${lastNewCases} nuevos contagios y ${lastNewDeaths} fallecidos.<br/>Llevando a un total histórico de ${lastTotalCases} contagios y ${lastTotalDeaths} fallecidos en Chile.</p>`;
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
}

function updateATotales(chart) {

    chart.options.title.text = 'Casos de Contagio Totales Confirmados';

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

    chart.update();
}

function updateAMuertesTotales(chart) {

    chart.options.title.text = 'Fallecidos Totales Confirmados';

    chart.data.datasets.forEach((dataset) => {
        chart.data.datasets = [{
            label: 'Fallecidos totales',
            data: totalDeathsList, //confirmedCasesList

            backgroundColor: 'red',
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
}

function updateAMuertesDiarias(chart) {

    chart.options.title.text = 'Fallecidos Por Día Confirmados';

    chart.data.datasets.forEach((dataset) => {
        chart.data.datasets = [{
            label: 'Fallecidos Por Día',
            data: dailyDeathsList, //confirmedCasesList

            backgroundColor: 'red',
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
}



/*  SIDEBAR  */

function openSlideMenu() {
    document.getElementById('menu').style.width = "300px";
    //document.getElementById('content').style.marginLeft = "250px";
}

function closeSlideMenu() {
    document.getElementById('menu').style.width = "0";
    document.getElementById('content').style.marginLeft = "0";

}

/*  MAPA  */

const chileChart = new JSC.chart("chartDiv", {

    type: "map",
    mapping_base_layers: "CL",
    series: [
        {
            defaultPoint_color: "crimson",
            points: [
                {
                    map: "CL.RM",
                    events_click: function () {
                        alert("Button clicked");
                    }
                },
                { map: "CL.TA" }]
        }
    ],
    toolbar_items: {
        "Click Me": {
            events_click: function () {
                alert("Button clicked");
            }
        }
    },
})