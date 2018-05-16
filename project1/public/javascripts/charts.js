function ExPo(){
    var dataF = new google.visualization.DataTable();
    dataF.addColumn('string','Estado');
    dataF.addColumn('number','População');
    dataF.addRows(statesInfo.length);

    for (var n = 0; n < statesInfo.length; n++) {
        dataF.setValue(n, 0, statesInfo[n].name);
        dataF.setValue(n, 1, statesInfo[n].population);
    }
    return dataF;
}

function ExPI(){
    var dataF = new google.visualization.DataTable();
    dataF.addColumn('string','Estado');
    dataF.addColumn('number','PIB');
    dataF.addRows(statesInfo.length);

    for (var n = 0; n < statesInfo.length; n++) {
        dataF.setValue(n, 0, statesInfo[n].name);
        dataF.setValue(n, 1, statesInfo[n].pib);
    }
    return dataF;
}

function ExPoxPI(){
    var dataF = new google.visualization.DataTable();
    dataF.addColumn('string','Estado');
    dataF.addColumn('number','População');
    dataF.addColumn('number','PIB');
    dataF.addRows(statesInfo.length);

    for (var n = 0; n < statesInfo.length; n++) {
        dataF.setValue(n, 0, statesInfo[n].name);
        dataF.setValue(n, 1, statesInfo[n].population);
        dataF.setValue(n, 2, statesInfo[n].pib);
    }
    return dataF;
}

function barChart(pr) {
    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(drawDualX);
    
    function drawDualX() {
        if(pr == 0){
            var data = ExPo();
        }
        else if(pr == 1){
            var data = ExPI();
        }
        else if(pr == 2){
            var data = ExPoxPI();
        }
    
        var options = {
            chart: {
                title: 'Barras'
            },
            bars: 'horizontal'
        };
        var chart = new google.charts.Bar(document.querySelector(".graph-div"));
        chart.draw(data, options);
    }
}

function lineChart(pr) {
    google.charts.load('current', {packages: ['corechart', 'line']});
    google.charts.setOnLoadCallback(drawBackgroundColor);

    function drawBackgroundColor() {
        if(pr == 0){
            var data = ExPo();
        }
        else if(pr == 1){
            var data = ExPI();
        }
        else if(pr == 2){
            var data = ExPoxPI();
        }

        var options = {
            chart: {
                title: 'Linha'
            }
        };

        var chart = new google.charts.Line(document.querySelector(".graph-div"));
        chart.draw(data, google.charts.Line.convertOptions(options));
    }
}

function areaChart(pr) {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        if(pr == 0){
            var data = ExPo();
        }
        else if(pr == 1){
            var data = ExPI();
        }
        else if(pr == 2){
            var data = ExPoxPI();
        }

        var options = {
            title: 'Área'
        };

        var chart = new google.visualization.AreaChart(document.querySelector(".graph-div"));
        chart.draw(data, options);
    }
}

function columnChart(pr) {
    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(drawBasic);

    function drawBasic() {
        if(pr == 0){
            var data = ExPo();
        }
        else if(pr == 1){
            var data = ExPI();
        }
        else if(pr == 2){
            var data = ExPoxPI();
        }

        var options = {
            chart: {
                title: 'Colunas'
            },
            bars: {
                groupWidth: 10
            }
        };

        var chart = new google.charts.Bar(document.querySelector(".graph-div"));
        chart.draw(data, google.charts.Bar.convertOptions(options));
    }
}

var ch = 0;
barChart(0);

var rd = document.querySelector("#param-rds");
rd.addEventListener("click",function(){
    getParams(ch)
});

function getParams(ch){
    for(var i = 0; i < rd.length; i++){
        if(rd[i].checked){
            if(ch == 0){
                barChart(rd[i].value);
            }
            else if(ch == 1){
                lineChart(rd[i].value);
            }
            else if(ch == 2){
                areaChart(rd[i].value);
            }
            else if(ch == 3){
                columnChart(rd[i].value);
            }
        }
    }
}

var larrow = document.querySelector(".triangle-left");
larrow.addEventListener("click", function(){
    if(ch > 0){
        ch--;
        getParams(ch);
        makeAct(ch);
    }
});

var rarrow = document.querySelector(".triangle-right");
rarrow.addEventListener("click", function(){
    if(ch < 3){
        ch++;
        getParams(ch);
        makeAct(ch);
    }
});

var barAct = document.querySelector("#bar-label");
var lineAct = document.querySelector("#line-label");
var areaAct = document.querySelector("#area-label");
var colAct = document.querySelector("#col-label");

function makeAct(chAct){
    if(chAct == 0 && !barAct.classList.contains("active")){
        barAct.classList.add("active");
        lineAct.classList.remove("active");
        areaAct.classList.remove("active");
        colAct.classList.remove("active");
    }
    else if(chAct == 1 && !lineAct.classList.contains("active")){
        barAct.classList.remove("active");
        lineAct.classList.add("active");
        areaAct.classList.remove("active");
        colAct.classList.remove("active");
    }
    else if(chAct == 2 && !areaAct.classList.contains("active")){
        barAct.classList.remove("active");
        lineAct.classList.remove("active");
        areaAct.classList.add("active");
        colAct.classList.remove("active");
    }
    else if(chAct == 3 && !colAct.classList.contains("active")){
        barAct.classList.remove("active");
        lineAct.classList.remove("active");
        areaAct.classList.remove("active");
        colAct.classList.add("active");
    }
}

barAct.addEventListener("click", function(){
    makeAct(0);
    getParams(0);
});

lineAct.addEventListener("click", function(){
    makeAct(1);
    getParams(1);
});

areaAct.addEventListener("click", function(){
    makeAct(2);
    getParams(2);
});

colAct.addEventListener("click", function(){
    makeAct(3);
    getParams(3);
});

//console.log(larrow);

//barChart();
//lineChart(2);
//areaChart(2);
//columnChart(2);