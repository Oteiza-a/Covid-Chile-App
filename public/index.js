let datesList = [];
let confirmedCasesList = [];
let newCasesList = [];
let totalDeathsList = [];
let dailyDeathsList = [];

let dataRegionesGlobal;

const totalsContainer = document.getElementById('totales-div');
const dailyContainer = document.getElementById('diarios-div');

const diariosForm = document.getElementById('diarios-form');
const totalesForm = document.getElementById('totales-form');

const muertesTotalesForm = document.getElementById('muertes-totales-form');
const muertesDiariasForm = document.getElementById('muertes-diarias-form');

const bigChartContainer = document.getElementById('totales-div');
const mapContainer = document.getElementById('map-container');
const smallChartsContainer = document.getElementById('small-charts');

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
    loadSmallChartsData();
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
        toggleToChart();
        updateADiarios(totalesChart);
    }

    totalesForm.onsubmit = (event) => {

        event.preventDefault();
        toggleToChart();
        updateATotales(totalesChart);
    }

    muertesTotalesForm.onsubmit = (event) => {

        event.preventDefault();
        toggleToChart();
        updateAMuertesTotales(totalesChart);
    }

    muertesDiariasForm.onsubmit = (event) => {

        event.preventDefault();
        toggleToChart();
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

    chart.update();
}

function updateATotales(chart) {

    chart.options.title.text = 'Casos de Contagio Totales Confirmados';

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

    chart.update();
}

function updateAMuertesTotales(chart) {

    chart.options.title.text = 'Fallecidos Totales Confirmados';

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

    chart.update();
}

function updateAMuertesDiarias(chart) {

    chart.options.title.text = 'Fallecidos Por Día Confirmados';

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

const loadSmallChartsData = () => {

    //OBTENIENDO DATOS REGIONALES
    fetch('https://chile-coronapi1.p.rapidapi.com/v3/historical/regions', {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'chile-coronapi1.p.rapidapi.com',
            'x-rapidapi-key': '94a928ddd1msh94a43eaf68e37cfp11c6aejsn31acec61285f',
            'useQueryString': true,
        },
    })
        .then(res => res.json())
        .then(data => {

            preparedData = Object.keys(data).map((regionNumber) => {

                contagiosList = Object.keys(data[regionNumber].regionData).map((x) => {

                    return data[regionNumber].regionData[x].confirmed;
                })

                muertesList = Object.keys(data[regionNumber].regionData).map((x) => {

                    let deaths = data[regionNumber].regionData[x].deaths;

                    if (deaths == undefined) {
                        return 0;
                    } else {
                        return deaths;
                    }
                })

                return { region: data[regionNumber].region, data: { contagios: contagiosList, muertes: muertesList } };
            })

            //REASIGNANDO CONTAGIOS Y MUERTES DE BIOBÍO: SUMANDOLE LAS DE ÑUBLE
            let biobioContagios = [];
            let biobioMuertes = [];

            ctdDiasPasados = preparedData[0].data.contagios.length;

            for (let i = 0; i < ctdDiasPasados; i++) {

                let contagiosDelDia;
                let muertesDelDia;

                contagiosDelDia = preparedData[7].data.contagios[i] + preparedData[15].data.contagios[i];
                biobioContagios.push(contagiosDelDia);

                muertesDelDia = preparedData[7].data.muertes[i] + preparedData[15].data.muertes[i];
                biobioMuertes.push(muertesDelDia);

            }

            preparedData[7].data.contagios = biobioContagios;
            preparedData[7].data.muertes = biobioMuertes;

            dataRegionesGlobal = preparedData;

            //DATOS LISTOS; CARGANDO MAPA Y CHARTS CHICOS
            loadMap();
            paintSmallCharts();
        })
}

const paintSmallCharts = () => {

    let contagiosChart = document.getElementById('small-chart-contagios').getContext("2d");

    let selectedRegion = 'Arica y Parinacota';

    let contagiosParaChart = [];
    let muertesParaChart = [];

    dataRegionesGlobal.forEach(regionData => {

        if (regionData.region == selectedRegion) {

            contagiosParaChart = regionData.data.contagios;
            muertesParaChart = regionData.data.muertes;
        }
    });

    let smallCasesChart = new Chart(contagiosChart, {

        type: 'bar', //bar, horizontalBar, pie, line, doughnut, radar, polarArea, bubble, area, scatter
        data: {

            labels: datesList, //dateslist
            datasets: [{
                label: 'Casos confirmados en la región',
                data: contagiosParaChart, //confirmedCasesList
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
                text: 'Contagios totales en Arica y Parinacota',
                fontSize: 19,
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

    let muertesChart = document.getElementById('small-chart-muertes').getContext("2d");

    let smallDeathsChart = new Chart(muertesChart, {

        type: 'bar', //bar, horizontalBar, pie, line, doughnut, radar, polarArea, bubble, area, scatter
        data: {

            labels: datesList, //dateslist
            datasets: [{
                label: 'Fallecidos confirmados en la región',
                data: muertesParaChart, //confirmedCasesList
                backgroundColor: 'red',
                borderWidth: 0,
                borderColor: '#777',
                hoverBorderWidth: '1',
                hoverBorderColor: 'rgba(255, 231, 0, 0.9)',

            }],

        },
        options: {
            title: {
                display: true,
                text: 'Fallecidos Totales en Arica y Parinacota',
                fontSize: 19,
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

    loadMap(smallCasesChart, smallDeathsChart);
}

function loadMap(casesChart, deathsChart) {

    let lastContagios = [];

    let ordenDeRegiones = [
        'Arica y Parinacota',
        'Tarapacá',
        'Antofagasta',
        'Atacama',
        'Coquimbo',
        'Araucanía',
        'Valparaíso',
        "O’Higgins",
        'Maule',
        'Biobío',
        'Los Lagos',
        'Aysén',
        'Magallanes',
        'Metropolitana',
        'Los Ríos',
    ]

    ordenDeRegiones.forEach((nombreRegion) => {

        dataRegionesGlobal.forEach((regionInfo) => {

            regionActual = regionInfo.region;

            if (nombreRegion == regionActual) {

                lastContagios.push(regionInfo.data.contagios[regionInfo.data.contagios.length - 1])
            }
        })
    })

    var windowWidth;
    var windowHeight;

    google.charts.load('visualization', '1', {
        'packages': ['geochart'],
        'mapsApiKey': 'YOUR_KEY',
    });

    google.charts.setOnLoadCallback(drawRegionsMap);

    function drawRegionsMap() {

        windowWidth = $(window).width();
        windowHeight = $(window).height();

        windowWidth = windowWidth / 1.7;
        windowHeight = windowHeight / 3;
        var data = new google.visualization.DataTable();

        data.addColumn('string', 'Region');
        data.addColumn('number', 'Contagios Totales');

        data.addRows([
            [{ f: 'Arica y Parinacota', v: 'CL-AP' }, lastContagios[0]],
            [{ f: 'Tarapacá', v: 'CL-TA' }, lastContagios[1]],
            [{ f: 'Antofagasta', v: 'CL-AN' }, lastContagios[2]],
            [{ f: 'Atacama', v: 'CL-AT' }, lastContagios[3]],
            [{ f: 'Coquimbo', v: 'CL-CO' }, lastContagios[4]],
            [{ f: 'Araucanía', v: 'CL-AR' }, lastContagios[5]],
            [{ f: 'Valparaíso', v: 'CL-VS' }, lastContagios[6]],
            [{ f: "O'Higgins", v: 'CL-LI' }, lastContagios[7]],
            [{ f: 'Maule', v: 'CL-ML' }, lastContagios[8]],
            [{ f: 'Biobío', v: 'CL-BI' }, lastContagios[9]],
            [{ f: 'Los Lagos', v: 'CL-LL' }, lastContagios[10]],
            [{ f: 'Aysén', v: 'CL-AI' }, lastContagios[11]],
            [{ f: 'Magallanes', v: 'CL-MA' }, lastContagios[12]],
            [{ f: 'Metropolitana', v: 'CL-RM' }, lastContagios[13]],
            [{ f: 'Los Ríos', v: 'CL-LR' }, lastContagios[14]],
        ]);

        var options = {

            width: windowWidth,

            region: 'CL',
            resolution: 'provinces',

            colorAxis: { colors: ['#f0c975', '#f57200', '#f57200', '#f57200', '#f57200', '#f57200', '#f57200', '#f57200', '#f57200', '#f57200', '#de1717', '#de1717', '#de1717'] },
            backgroundColor: '#c3dafe',
            datalessRegionColor: '#c9c9c9',
            defaultColor: '#f5f5f5',

            'tooltip.textStyle': {
                color: '#000',
                fontName: 'Lato',
                fontSize: 30,
                bold: false,
                italic: false,
            }
        };

        var mapContainer = document.getElementById('regions-div');
        var chart = new google.visualization.GeoChart(mapContainer);

        function myClickHandler() {
            var selection = chart.getSelection();
            var message = '';

            for (var i = 0; i < selection.length; i++) {

                var item = selection[i];

                //siempre entra aquí
                if (item.row != null) {
                    message += 'row: ' + data.hg[item.row].c[0].f;

                    updateSmallCharts(casesChart, deathsChart, data.hg[item.row].c[0].f)

                } else if (item.column != null) {
                    message += '{column:' + item.column + '}';
                }
            }
            if (message == '') {
                message = 'nothing';
            }
        }

        google.visualization.events.addListener(chart, 'select', myClickHandler);
        chart.draw(data, options);
    }

    $(window).resize(function () {
        drawRegionsMap();
    });

}

const updateSmallCharts = (chartContagios, chartMuertes, regionName) => {

    //ALISTANDO DATA

    dataRegionesGlobal.forEach(regionData => {

        if (regionData.region == regionName) {

            contagiosParaChart = regionData.data.contagios;
            muertesParaChart = regionData.data.muertes;
        }
    });

    //CHART DE CONTAGIOS DE LA REGIÓN

    chartContagios.options.title.text = 'Contagios Totales en ' + regionName;

    chartContagios.data.datasets = [{
        label: 'Contagios en la región',
        data: contagiosParaChart,
        backgroundColor: yellowRedGradient,
        borderWidth: 0,
        borderColor: '#777',
        hoverBorderWidth: '1',
        hoverBorderColor: 'rgba(255, 231, 0, 0.9)',

    }];

    //CHART DE MUERTES DE LA REGIÓN

    chartMuertes.options.title.text = 'Fallecidos Totales en ' + regionName;

    chartMuertes.data.datasets = [{
        label: 'Fallecidos en la región',
        data: muertesParaChart,
        backgroundColor: 'red',
        borderWidth: 0,
        borderColor: '#777',
        hoverBorderWidth: '1',
        hoverBorderColor: 'rgba(255, 231, 0, 0.9)',

    }];


    chartContagios.update();
    chartMuertes.update();
}

/*  TOGGLE MAP  */

const mapForm = document.getElementById('mapa-form');

mapForm.onsubmit = (e) => {
    e.preventDefault();

    bigChartContainer.setAttribute("style", "display: none;")

    mapContainer.removeAttribute("style");
    smallChartsContainer.removeAttribute("style");
}

const toggleToChart = () => {

    bigChartContainer.removeAttribute("style")

    mapContainer.setAttribute("style", "display: none;");
    smallChartsContainer.setAttribute("style", "display: none;");
}

