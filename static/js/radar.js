anychart.onDocumentReady(function () {
    // create data set on our data

      
    var chartData = {
      title: 'Top 5 States recorded Gun Incident by Year (2014-2018) ',
      header: ['#','California', 'Texas', 'Florida', 'Illinois','Ohio'],
      rows: [

        ['2014', 1198, 882, 699, 587, 437],
        ['2015', 1065, 992, 709, 644, 487],
        ['2016', 1138, 1137, 830, 893, 559],
        ['2017', 1263, 1002, 841, 868, 624] ,
        ['2018', 265, 275, 216, 147, 122]
      ]
    };

    // create radar chart
    var chart = anychart.radar();

    // set default series type
    chart.defaultSeriesType('area');

    // set chart data
    chart.data(chartData);

    // force chart to stack values by Y scale.
    chart.yScale().stackMode('value');

    // set yAxis settings
    chart.yAxis().stroke('#545f69');
    chart.yAxis().ticks().stroke('#545f69');

    // set yAxis labels settings
    chart
      .yAxis()
      .labels()
      .fontColor('#545f69')
      .format('{%Value}{scale:(1000000)|(M)}');

    // set chart legend settings
    chart.legend().align('center').position('center-bottom').enabled(true);

    // set container id for the chart
    chart.container('container');
    // initiate chart drawing
    chart.draw();



});

  