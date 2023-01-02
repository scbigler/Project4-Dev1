anychart.onDocumentReady(function () {

    anychart.data.loadJsonFile('../Original Files/us_per_capita.geojson', function (data) {
      
      // Get the names of the records 
      // data.features.map(function(feature){
        var recordNames = data.features.map(function(d){
        return d.properties['city']
        });
        //  get the state
        var stateNames = data.features.map(function(d){
          return d.properties['state']
        });
        // get incident count
        var incidentCount = data.features.map(function(d){
          return d.properties['incident_count']
        });
        // get population
        var populationCount = data.features.map(function(d){
          return d.properties['population']
        });
      // Get the percent values
        var recordPercentValue = data.features.map(function(d){
          return d.properties['per_capita']
          });
      
        var initialLength = recordPercentValue.length;
        recordPercentValue.length *= 2;
        recordPercentValue.fill(184.3636835, initialLength);
  
        // Set the data to indicate the percent values
        var dataSet = anychart.data.set(recordPercentValue);
      
        // Create the angular gauge
        var gauge = anychart.gauges.circular();
      
        // Set the data for the angular gauge
        gauge.data(dataSet);
       
        // Set the colors based on the designated palette
        var palette = anychart.palettes
          .distinctColors()
          .items([
            '#593d04', '#6c4304', '#966905', '#a77b0a', '#cf9f20', '#ddb22e', '#f1c84d', '#ffdc73'
        ]);
      
        // Specify the attributes of the angular gauge chart
        gauge
          .fill('#fff')
          .stroke(null)
          .padding(25, 100, 25, 100)
          .margin(0)
          .startAngle(0)
          .sweepAngle(270);
      
        // Create the angular gauge axis
        var axis = gauge.axis().radius(100).width(1).fill(null);
      
        // Set the minimum and maximum values for the axis
        axis
          .scale()
          .minimum(0)
          .maximum(100);
      
        // Hide the axis labels and ticks
        axis.labels().enabled(false);
        axis.ticks().enabled(false);
        axis.minorTicks().enabled(false);
      
        // Create a function to make radial bars for each data point
        var makeBarWithBar = function (gauge, radius, i, width) {
      
          // Create the radial bars based on the data
          gauge
            .bar(i)
            .dataIndex(i)
            .radius(radius)
            .width(width)
            .fill(palette.itemAt(i))
            .stroke(null)
            .zIndex(5);
      
          // Create the background radial bars indicating the total value
          gauge
            .bar(i + 100)
            .dataIndex(initialLength + i)
            .radius(radius)
            .width(width)
            .fill('#F5F4F4')
            .stroke(null)
            .zIndex(4);
      
          // Set the labels based on each data point
          gauge
            .label(i)
            .text(recordNames[i]);
      
          // Align the labels 
          gauge
            .label(i)
            .hAlign('center')
            .vAlign('middle')
            .anchor('right-center')
            .padding(0, 10)
            .height(width / 2 + '%')
            .offsetY(radius + '%')
            .offsetX(0);
      
          return gauge.bar(i);
      
        };
      
        // Angular gauge tooltip
        gauge.tooltip().useHtml(true);
       
        // Format the information of the tooltip
        gauge
          .tooltip()
          .format(function(){
            var index = this.index;
            if (index >= initialLength)
            index -= initialLength;
            return "<div style='font-size:15px; font-weight:400; margin: 0.2rem 0; color: #1db954; padding:0.15rem'>City: <span style='color:#fff;'>" + recordNames[index] + "</span></div><div style='font-size:15px; font-weight:400; margin: 0.2rem 0; color: #1db954; padding:0.15rem'>State: <span style='color:#fff;'>" + stateNames[index] + "</span></div><div style='font-size:15px; font-weight:400; margin: 0.2rem 0; color: #1db954; padding:0.15rem'>Population: <span style='color:#fff;'>" + Intl.NumberFormat().format(populationCount[index]) + "</span></div><div style='font-size:15px; font-weight:400; margin: 0.2rem 0; color: #1db954; padding:0.15rem'>Incident Counts: <span style='color:#fff;'>" + Intl.NumberFormat().format(incidentCount[index]) + "</span></div><div style='font-size:15px; font-weight:400; margin: 0.2rem 0; color: #1db954; padding:0.15rem'>Per Capita: <span style='color:#fff;'>" + recordPercentValue[index] + "</span></div>";
          
          }); 
          
        // Call the function to create the radial bars with specifications
        for(var i=0, j=100; i<data.length, j>=12.5; i++, j-=12.5){
          makeBarWithBar(gauge, j, i, 12);
        }
      
        // Add the angular gauge chart title
        gauge
          .title()
          .useHtml(true)
          .text(
            '<span style = "color: #4c2b04; font-size:20px;">Comparing Popularity of 2021 GRAMMYs Record of the Year Nominations</span>' +
            '<br/><span style="color:#1db954; font-size: 18px;">(Based on the number of Spotify Streams)</span>'
          );
      
        gauge
          .title()
          .enabled(true)
          .hAlign('center')
          .padding(0)
          .margin([0, 0, 10, 0]);
       
        // Drawing the resulting angular gauge
        gauge.container('container');
        gauge.draw();
      
        });
      
  // });
})
