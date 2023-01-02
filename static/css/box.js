const CSV =
    "bluered.csv";

function plotFromCSV() {
    Plotly.d3.csv(CSV, function(err, rows) {
        processData(rows);
    });
}

function processData(allRows) {
    let y1 = [];
    let y2 = [];
    let row;

    let i = 0;
    while (i < allRows.length) {
        row = allRows[i];
        y1.push(row["Democrat"]);
        y2.push(row["Republican"]);
        i += 1;
    }

    makePlotly(y1, y2);
}

function makePlotly(y1, y2) {
    let traces = [
        {
            y: y1,
            type: "box",
            // boxmean: true,
            name: "Democrat leaning"
        },
        {
            y: y2,
            type: "box",
            marker: {
                color: 'rgb(255,0,0)'
              },
            // boxmean: true,
            
            name: "Republican leaning"
        }
        
    ];

    let layout = {
        title: "Box and Whisker Plot Per Capita Incidents",
        yaxis: {
            gridcolor: "lightgrey",
            gridwidth: 2,
            zerolinewidth: 3,
            title: 'Gun Incidents Per Capita'
        },
        y1: {
            
        }
    };

    let config = { responsive: true };

    Plotly.newPlot("plot", traces, layout, config);
}

plotFromCSV();
