
//
// Donut Charts lib
// email: cafernandez@gmail.com
// github: https://github.com/crandomize/donutcharts


var donut = {
  backgroundCircle: 'transparent',
  classPath:"donut-path",
  class:"donut-chart",
  start: 0, 
  angleSeparation: 1,
  draw: function(data) {
  	
    // Add default data
    if (data.startAngle == undefined) data.startAngle=240;
    if (data.endAngle == undefined) data.endAngle=480;
    if (data.class == undefined) data.class='donut-chart';
    if (data.strokeWidth == undefined) data.strokeWidth= 10;
    if (data.defaultSeriesColor == undefined) data.defaultSeriesColor='transparent';

    
    
    var seriesSVG ='';
    var lengthAngle = data.endAngle - data.startAngle;
    var lastAngle = data.startAngle;
    
    //Add the series:
    
    var numSeries = data.series.length;
    
    for (var i=0; i< numSeries; i++) {
    	var serie = data.series[i];
      var angleRange = serie.percent*lengthAngle/100;
      var startAngle = lastAngle;
      var endAngle = startAngle + angleRange;
      lastAngle = endAngle;
      var svgserie = this.generatePath(data.class, serie.name, 
      	startAngle, endAngle, data.strokeWidth, serie.color);
      seriesSVG = seriesSVG + svgserie;
    }
    
    if (lastAngle < data.endAngle) {
     var donutBackground = this.generatePath(data.class, '', 
    				lastAngle, data.endAngle, data.strokeWidth, data.defaultSeriesColor);   
    }
    
    if (data.title != undefined) {
    	if (data.subtitle == undefined) data.subtitle = '';
      var labels  = '<span class="big">' + data.title + 
        '</span><span class="small">' + data.subtitle + '</span>';
    }
    
    var output = '<div class="' + data.class + 
    	'"><svg viewBox="0 0 100 100"  xmlns="http://www.w3.org/2000/svg">' +
    	donutBackground + seriesSVG + labels +
			'</svg></div>';
    
    return output;
  },
  generatePath: function(sClass, sName, sAngleStart, sAngleEnd,sStroke, sColor) {
 
  	var svgarc = this.describeArc(50, 50, 40, 
    	sAngleStart + this.angleSeparation/2, sAngleEnd - this.angleSeparation/2 );
  	var svg = '<path ' + 
        this.addParameter("class", sClass) + 
        this.addParameter("d", svgarc) +
        this.addParameter("fill", this.backgroundCircle) + 
        this.addParameter("stroke", sColor) + 
        this.addParameter("stroke-width", sStroke) +
        '/>';
    return svg;
  },
  
	polarToCartesian: function(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  },

  describeArc: function(x, y, radius, startAngle, endAngle){

      var start = this.polarToCartesian(x, y, radius, endAngle);
      var end = this.polarToCartesian(x, y, radius, startAngle);
      var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      var d = [
          "M", start.x, start.y, 
          "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
      ].join(" ");
      return d;       
  },

  addParameter: function(name, val) {
  	return name + '="'+ val +'" ';
  }

}