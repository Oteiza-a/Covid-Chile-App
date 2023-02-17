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

const historical = {
    "03/07/2020":{
       "confirmed":"7",
       "confirmedper100k":0.04,
       "day":"03/07/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"0",
       "recoveredper100k":0.0
    },
    "03/09/2020":{
       "confirmed":"12",
       "confirmedper100k":0.06,
       "day":"03/09/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"0",
       "recoveredper100k":0.0
    },
    "03/10/2020":{
       "confirmed":"17",
       "confirmedper100k":0.09,
       "day":"03/10/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"0",
       "recoveredper100k":0.0
    },
    "03/11/2020":{
       "confirmed":"23",
       "confirmedper100k":0.12,
       "day":"03/11/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"0",
       "recoveredper100k":0.0
    },
    "03/12/2020":{
       "confirmed":"33",
       "confirmedper100k":0.18,
       "day":"03/12/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"0",
       "recoveredper100k":0.0
    },
    "03/13/2020":{
       "confirmed":"43",
       "confirmedper100k":0.23,
       "day":"03/13/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"0",
       "recoveredper100k":0.0
    },
    "03/14/2020":{
       "confirmed":"61",
       "confirmedper100k":0.33,
       "day":"03/14/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"0",
       "recoveredper100k":0.0
    },
    "03/15/2020":{
       "confirmed":"75",
       "confirmedper100k":0.4,
       "day":"03/15/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"0",
       "recoveredper100k":0.0
    },
    "03/16/2020":{
       "confirmed":"156",
       "confirmedper100k":0.83,
       "day":"03/16/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"0",
       "recoveredper100k":0.0
    },
    "03/17/2020":{
       "confirmed":"201",
       "confirmedper100k":1.07,
       "day":"03/17/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"1",
       "recoveredper100k":0.01
    },
    "03/18/2020":{
       "confirmed":"238",
       "confirmedper100k":1.27,
       "day":"03/18/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"3",
       "recoveredper100k":0.02
    },
    "03/19/2020":{
       "confirmed":"342",
       "confirmedper100k":1.82,
       "day":"03/19/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"4",
       "recoveredper100k":0.02
    },
    "03/20/2020":{
       "confirmed":"434",
       "confirmedper100k":2.31,
       "day":"03/20/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"5",
       "recoveredper100k":0.03
    },
    "03/21/2020":{
       "confirmed":"537",
       "confirmedper100k":2.86,
       "day":"03/21/2020",
       "deaths":"1",
       "deathsper100k":0.01,
       "recovered":"6",
       "recoveredper100k":0.03
    },
    "03/22/2020":{
       "confirmed":"632",
       "confirmedper100k":3.37,
       "day":"03/22/2020",
       "deaths":"1",
       "deathsper100k":0.01,
       "recovered":"8",
       "recoveredper100k":0.04
    },
    "03/23/2020":{
       "confirmed":"746",
       "confirmedper100k":3.98,
       "day":"03/23/2020",
       "deaths":"2",
       "deathsper100k":0.01,
       "recovered":"11",
       "recoveredper100k":0.06
    },
    "03/24/2020":{
       "confirmed":"922",
       "confirmedper100k":4.92,
       "day":"03/24/2020",
       "deaths":"2",
       "deathsper100k":0.01,
       "recovered":"17",
       "recoveredper100k":0.09
    },
    "03/25/2020":{
       "confirmed":"1142",
       "confirmedper100k":6.09,
       "day":"03/25/2020",
       "deaths":"3",
       "deathsper100k":0.02,
       "recovered":"22",
       "recoveredper100k":0.12
    },
    "03/26/2020":{
       "confirmed":"1306",
       "confirmedper100k":6.96,
       "day":"03/26/2020",
       "deaths":"4",
       "deathsper100k":0.02,
       "recovered":"33",
       "recoveredper100k":0.18
    },
    "03/27/2020":{
       "confirmed":"1610",
       "confirmedper100k":8.59,
       "day":"03/27/2020",
       "deaths":"5",
       "deathsper100k":0.03,
       "recovered":"43",
       "recoveredper100k":0.23
    },
    "03/28/2020":{
       "confirmed":"1909",
       "confirmedper100k":10.18,
       "day":"03/28/2020",
       "deaths":"6",
       "deathsper100k":0.03,
       "recovered":"61",
       "recoveredper100k":0.33
    },
    "03/29/2020":{
       "confirmed":"2139",
       "confirmedper100k":11.41,
       "day":"03/29/2020",
       "deaths":"7",
       "deathsper100k":0.04,
       "recovered":"75",
       "recoveredper100k":0.4
    },
    "03/30/2020":{
       "confirmed":"2449",
       "confirmedper100k":13.06,
       "day":"03/30/2020",
       "deaths":"8",
       "deathsper100k":0.04,
       "recovered":"156",
       "recoveredper100k":0.83
    },
    "03/31/2020":{
       "confirmed":"2738",
       "confirmedper100k":14.6,
       "day":"03/31/2020",
       "deaths":"12",
       "deathsper100k":0.06,
       "recovered":"201",
       "recoveredper100k":1.07
    },
    "04/01/2020":{
       "confirmed":"3031",
       "confirmedper100k":16.16,
       "day":"04/01/2020",
       "deaths":"16",
       "deathsper100k":0.09,
       "recovered":"234",
       "recoveredper100k":1.25
    },
    "04/02/2020":{
       "confirmed":"3404",
       "confirmedper100k":18.15,
       "day":"04/02/2020",
       "deaths":"18",
       "deathsper100k":0.1,
       "recovered":"335",
       "recoveredper100k":1.79
    },
    "04/03/2020":{
       "confirmed":"3737",
       "confirmedper100k":19.93,
       "day":"04/03/2020",
       "deaths":"22",
       "deathsper100k":0.12,
       "recovered":"427",
       "recoveredper100k":2.28
    },
    "04/04/2020":{
       "confirmed":"4161",
       "confirmedper100k":22.19,
       "day":"04/04/2020",
       "deaths":"27",
       "deathsper100k":0.14,
       "recovered":"528",
       "recoveredper100k":2.82
    },
    "04/05/2020":{
       "confirmed":"4471",
       "confirmedper100k":23.84,
       "day":"04/05/2020",
       "deaths":"34",
       "deathsper100k":0.18,
       "recovered":"617",
       "recoveredper100k":3.29
    },
    "04/06/2020":{
       "confirmed":"4815",
       "confirmedper100k":25.68,
       "day":"04/06/2020",
       "deaths":"37",
       "deathsper100k":0.2,
       "recovered":"728",
       "recoveredper100k":3.88
    },
    "04/07/2020":{
       "confirmed":"5116",
       "confirmedper100k":27.28,
       "day":"04/07/2020",
       "deaths":"43",
       "deathsper100k":0.23,
       "recovered":"898",
       "recoveredper100k":4.79
    },
    "04/08/2020":{
       "confirmed":"5546",
       "confirmedper100k":29.58,
       "day":"04/08/2020",
       "deaths":"48",
       "deathsper100k":0.26,
       "recovered":"1115",
       "recoveredper100k":5.95
    },
    "04/09/2020":{
       "confirmed":"5972",
       "confirmedper100k":31.85,
       "day":"04/09/2020",
       "deaths":"57",
       "deathsper100k":0.3,
       "recovered":"1274",
       "recoveredper100k":6.79
    },
    "04/10/2020":{
       "confirmed":"6501",
       "confirmedper100k":34.67,
       "day":"04/10/2020",
       "deaths":"65",
       "deathsper100k":0.35,
       "recovered":"1571",
       "recoveredper100k":8.38
    },
    "04/11/2020":{
       "confirmed":"6927",
       "confirmedper100k":36.94,
       "day":"04/11/2020",
       "deaths":"73",
       "deathsper100k":0.39,
       "recovered":"1864",
       "recoveredper100k":9.94
    },
    "04/12/2020":{
       "confirmed":"7213",
       "confirmedper100k":38.47,
       "day":"04/12/2020",
       "deaths":"80",
       "deathsper100k":0.43,
       "recovered":"2059",
       "recoveredper100k":10.98
    },
    "04/13/2020":{
       "confirmed":"7525",
       "confirmedper100k":40.13,
       "day":"04/13/2020",
       "deaths":"82",
       "deathsper100k":0.44,
       "recovered":"2367",
       "recoveredper100k":12.62
    }
}

const regional = {
    "03/07/2020":{
       "confirmed":"7",
       "confirmedper100k":0.04,
       "day":"03/07/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"0",
       "recoveredper100k":0.0
    },
    "03/09/2020":{
       "confirmed":"12",
       "confirmedper100k":0.06,
       "day":"03/09/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"0",
       "recoveredper100k":0.0
    },
    "03/10/2020":{
       "confirmed":"17",
       "confirmedper100k":0.09,
       "day":"03/10/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"0",
       "recoveredper100k":0.0
    },
    "03/11/2020":{
       "confirmed":"23",
       "confirmedper100k":0.12,
       "day":"03/11/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"0",
       "recoveredper100k":0.0
    },
    "03/12/2020":{
       "confirmed":"33",
       "confirmedper100k":0.18,
       "day":"03/12/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"0",
       "recoveredper100k":0.0
    },
    "03/13/2020":{
       "confirmed":"43",
       "confirmedper100k":0.23,
       "day":"03/13/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"0",
       "recoveredper100k":0.0
    },
    "03/14/2020":{
       "confirmed":"61",
       "confirmedper100k":0.33,
       "day":"03/14/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"0",
       "recoveredper100k":0.0
    },
    "03/15/2020":{
       "confirmed":"75",
       "confirmedper100k":0.4,
       "day":"03/15/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"0",
       "recoveredper100k":0.0
    },
    "03/16/2020":{
       "confirmed":"156",
       "confirmedper100k":0.83,
       "day":"03/16/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"0",
       "recoveredper100k":0.0
    },
    "03/17/2020":{
       "confirmed":"201",
       "confirmedper100k":1.07,
       "day":"03/17/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"1",
       "recoveredper100k":0.01
    },
    "03/18/2020":{
       "confirmed":"238",
       "confirmedper100k":1.27,
       "day":"03/18/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"3",
       "recoveredper100k":0.02
    },
    "03/19/2020":{
       "confirmed":"342",
       "confirmedper100k":1.82,
       "day":"03/19/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"4",
       "recoveredper100k":0.02
    },
    "03/20/2020":{
       "confirmed":"434",
       "confirmedper100k":2.31,
       "day":"03/20/2020",
       "deaths":"0",
       "deathsper100k":0.0,
       "recovered":"5",
       "recoveredper100k":0.03
    },
    "03/21/2020":{
       "confirmed":"537",
       "confirmedper100k":2.86,
       "day":"03/21/2020",
       "deaths":"1",
       "deathsper100k":0.01,
       "recovered":"6",
       "recoveredper100k":0.03
    },
    "03/22/2020":{
       "confirmed":"632",
       "confirmedper100k":3.37,
       "day":"03/22/2020",
       "deaths":"1",
       "deathsper100k":0.01,
       "recovered":"8",
       "recoveredper100k":0.04
    },
    "03/23/2020":{
       "confirmed":"746",
       "confirmedper100k":3.98,
       "day":"03/23/2020",
       "deaths":"2",
       "deathsper100k":0.01,
       "recovered":"11",
       "recoveredper100k":0.06
    },
    "03/24/2020":{
       "confirmed":"922",
       "confirmedper100k":4.92,
       "day":"03/24/2020",
       "deaths":"2",
       "deathsper100k":0.01,
       "recovered":"17",
       "recoveredper100k":0.09
    },
    "03/25/2020":{
       "confirmed":"1142",
       "confirmedper100k":6.09,
       "day":"03/25/2020",
       "deaths":"3",
       "deathsper100k":0.02,
       "recovered":"22",
       "recoveredper100k":0.12
    },
    "03/26/2020":{
       "confirmed":"1306",
       "confirmedper100k":6.96,
       "day":"03/26/2020",
       "deaths":"4",
       "deathsper100k":0.02,
       "recovered":"33",
       "recoveredper100k":0.18
    },
    "03/27/2020":{
       "confirmed":"1610",
       "confirmedper100k":8.59,
       "day":"03/27/2020",
       "deaths":"5",
       "deathsper100k":0.03,
       "recovered":"43",
       "recoveredper100k":0.23
    },
    "03/28/2020":{
       "confirmed":"1909",
       "confirmedper100k":10.18,
       "day":"03/28/2020",
       "deaths":"6",
       "deathsper100k":0.03,
       "recovered":"61",
       "recoveredper100k":0.33
    },
    "03/29/2020":{
       "confirmed":"2139",
       "confirmedper100k":11.41,
       "day":"03/29/2020",
       "deaths":"7",
       "deathsper100k":0.04,
       "recovered":"75",
       "recoveredper100k":0.4
    },
    "03/30/2020":{
       "confirmed":"2449",
       "confirmedper100k":13.06,
       "day":"03/30/2020",
       "deaths":"8",
       "deathsper100k":0.04,
       "recovered":"156",
       "recoveredper100k":0.83
    },
    "03/31/2020":{
       "confirmed":"2738",
       "confirmedper100k":14.6,
       "day":"03/31/2020",
       "deaths":"12",
       "deathsper100k":0.06,
       "recovered":"201",
       "recoveredper100k":1.07
    },
    "04/01/2020":{
       "confirmed":"3031",
       "confirmedper100k":16.16,
       "day":"04/01/2020",
       "deaths":"16",
       "deathsper100k":0.09,
       "recovered":"234",
       "recoveredper100k":1.25
    },
    "04/02/2020":{
       "confirmed":"3404",
       "confirmedper100k":18.15,
       "day":"04/02/2020",
       "deaths":"18",
       "deathsper100k":0.1,
       "recovered":"335",
       "recoveredper100k":1.79
    },
    "04/03/2020":{
       "confirmed":"3737",
       "confirmedper100k":19.93,
       "day":"04/03/2020",
       "deaths":"22",
       "deathsper100k":0.12,
       "recovered":"427",
       "recoveredper100k":2.28
    },
    "04/04/2020":{
       "confirmed":"4161",
       "confirmedper100k":22.19,
       "day":"04/04/2020",
       "deaths":"27",
       "deathsper100k":0.14,
       "recovered":"528",
       "recoveredper100k":2.82
    },
    "04/05/2020":{
       "confirmed":"4471",
       "confirmedper100k":23.84,
       "day":"04/05/2020",
       "deaths":"34",
       "deathsper100k":0.18,
       "recovered":"617",
       "recoveredper100k":3.29
    },
    "04/06/2020":{
       "confirmed":"4815",
       "confirmedper100k":25.68,
       "day":"04/06/2020",
       "deaths":"37",
       "deathsper100k":0.2,
       "recovered":"728",
       "recoveredper100k":3.88
    },
    "04/07/2020":{
       "confirmed":"5116",
       "confirmedper100k":27.28,
       "day":"04/07/2020",
       "deaths":"43",
       "deathsper100k":0.23,
       "recovered":"898",
       "recoveredper100k":4.79
    },
    "04/08/2020":{
       "confirmed":"5546",
       "confirmedper100k":29.58,
       "day":"04/08/2020",
       "deaths":"48",
       "deathsper100k":0.26,
       "recovered":"1115",
       "recoveredper100k":5.95
    },
    "04/09/2020":{
       "confirmed":"5972",
       "confirmedper100k":31.85,
       "day":"04/09/2020",
       "deaths":"57",
       "deathsper100k":0.3,
       "recovered":"1274",
       "recoveredper100k":6.79
    },
    "04/10/2020":{
       "confirmed":"6501",
       "confirmedper100k":34.67,
       "day":"04/10/2020",
       "deaths":"65",
       "deathsper100k":0.35,
       "recovered":"1571",
       "recoveredper100k":8.38
    },
    "04/11/2020":{
       "confirmed":"6927",
       "confirmedper100k":36.94,
       "day":"04/11/2020",
       "deaths":"73",
       "deathsper100k":0.39,
       "recovered":"1864",
       "recoveredper100k":9.94
    },
    "04/12/2020":{
       "confirmed":"7213",
       "confirmedper100k":38.47,
       "day":"04/12/2020",
       "deaths":"80",
       "deathsper100k":0.43,
       "recovered":"2059",
       "recoveredper100k":10.98
    },
    "04/13/2020":{
       "confirmed":"7525",
       "confirmedper100k":40.13,
       "day":"04/13/2020",
       "deaths":"82",
       "deathsper100k":0.44,
       "recovered":"2367",
       "recoveredper100k":12.62
    }
}



window.onload = () => {

    loadData();
    loadSmallChartsData();
}

const loadData = () => {
    const data = historical;
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

    // fetch('https://chile-coronapi1.p.rapidapi.com/v3/historical/nation', {
    //     method: 'GET',
    //     headers: {
    //         'x-rapidapi-host': 'chile-coronapi1.p.rapidapi.com',
    //         'x-rapidapi-key': '94a928ddd1msh94a43eaf68e37cfp11c6aejsn31acec61285f',
    //         'useQueryString': true,
    //     },
    // })
    //     .then(res => res.json())
    //     .then(data => {

    //     })
    //     .catch(err => {
    //         location.reload();
    //     })

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
    Chart.defaults.global.defaultFontFamily = 'Helvetica';
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

            responsive: true,
            maintainAspectRatio: false,

            title: {
                display: true,
                text: 'Contagios Totales',
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
                }],

                xAxes: [{
                    ticks: {
                        fontSize: 11,
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
    Chart.defaults.global.defaultFontFamily = 'Helvetica';
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
    const reportTitle = document.getElementById('report-title');
    const ttlCases = document.getElementById('casos-totales-circle');
    const dailyCases = document.getElementById('casos-diario-circle');
    const ttlDeaths = document.getElementById('fallecidos-totales-circle');
    const dailyDeaths = document.getElementById('fallecidos-diario-circle');

    let lastDate = datesList[datesList.length - 1];
    let lastNewCases = newCasesList[newCasesList.length - 1];
    let lastTotalCases = confirmedCasesList[confirmedCasesList.length - 1];
    let lastNewDeaths = dailyDeathsList[dailyDeathsList.length - 1];
    let lastTotalDeaths = totalDeathsList[totalDeathsList.length - 1];

    reportTitle.innerHTML = `Último reporte registrado<br>(${lastDate})`;
    ttlCases.innerHTML = `<div class="report-stats"><p class="report-data">${lastTotalCases}</p><p class="report-text">contagios<br>registrados</p></div>`
    dailyCases.innerHTML = `<div class="report-stats"><p class="report-data">${lastNewCases}</p><p class="report-text">nuevos<br>contagios</p></div>`
    ttlDeaths.innerHTML = `<div class="report-stats"><p class="report-data">${lastTotalDeaths}</p><p class="report-text">fallecidos<br>registrados</p></div>`
    dailyDeaths.innerHTML = `<div class="report-stats"><p class="report-data">${lastNewDeaths}</p><p class="report-text">nuevos<br>fallecidos</p></div>`

}

function updateADiarios(chart) {

    chart.options.title.text = 'Casos Por Día';

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

    chart.options.title.text = 'Contagios Totales';

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

    chart.options.title.text = 'Fallecidos Totales';

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

    chart.options.title.text = 'Fallecidos Por Día';

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

    const data = regional

    let preparedData = Object.keys(data).map((regionNumber) => {
        contagiosList = Array.from(Array(10).keys()).map(() => 1000)
        // contagiosList = Object.keys(data[regionNumber].regionData).map((x) => {

        //     return data[regionNumber].regionData[x].confirmed;
        // })

        muertesList = Array.from(Array(10).keys()).map(() => 1000)
        // muertesList = Object.keys(data[regionNumber].regionData).map((x) => {

        //     let deaths = data[regionNumber].regionData[x].deaths;

        //     if (deaths == undefined) {
        //         return 0;
        //     } else {
        //         return deaths;
        //     }
        // })

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

    //OBTENIENDO DATOS REGIONALES
    // fetch('https://chile-coronapi1.p.rapidapi.com/v3/historical/regions', {
    //     method: 'GET',
    //     headers: {
    //         'x-rapidapi-host': 'chile-coronapi1.p.rapidapi.com',
    //         'x-rapidapi-key': '94a928ddd1msh94a43eaf68e37cfp11c6aejsn31acec61285f',
    //         'useQueryString': true,
    //     },
    // })
    //     .then(res => res.json())
    //     .then(data => {

    //     })
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

            responsive: true,
            maintainAspectRatio: false,

            title: {
                display: true,
                text: 'Contagios: Arica y Parinacota',
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
                }],
                xAxes: [{
                    ticks: {
                        fontSize: 11,
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

            responsive: true,
            maintainAspectRatio: false,

            title: {
                display: true,
                text: 'Fallecidos: Arica y Parinacota',
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
                }],
                xAxes: [{
                    ticks: {
                        fontSize: 11,
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

        //media query
        var x = window.matchMedia("(max-width: 600px)");

        if (x.matches) {
            windowWidth = windowWidth / 0.4;
            windowHeight = windowHeight / 3;
        } else {
            windowWidth = windowWidth / 1.1;
            windowHeight = windowHeight / 3;
        }


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

    chartContagios.options.title.text = 'Contagios: ' + regionName;

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

    chartMuertes.options.title.text = 'Fallecidos: ' + regionName;

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

const bigChartContainer = document.getElementById('totales-div');
const mapContainer = document.getElementById('map-container');
const smallChartsContainer = document.getElementById('small-charts');
const mobileText = document.getElementById('map-mobile-text');

mapForm.onsubmit = (e) => {
    e.preventDefault();

    bigChartContainer.setAttribute("style", "display: none;")

    mapContainer.removeAttribute("style");
    smallChartsContainer.removeAttribute("style");

    var x = window.matchMedia("(max-width: 600px)");

    if (x.matches) {
        mobileText.removeAttribute("style");
    }
}

const toggleToChart = () => {

    bigChartContainer.removeAttribute("style")

    mapContainer.setAttribute("style", "display: none;");
    smallChartsContainer.setAttribute("style", "display: none;");
    mobileText.setAttribute("style", "display:none;")
}

