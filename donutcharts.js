
//
// Donut Charts lib
// email: cafernandez@gmail.com
// github: https://github.com/crandomize/donutcharts



var donut = {
  backgroundColor: 'transparent',
  backgroundCircle: '#d2d3d4',
  classPath:"donut-path",
  class:"donut-chart",
  start: 0, 
  
  draw: function(data) {
  	
    var seriesSVG ='';
    var donutBackground = this.generatePath(data.class, '', 
    				data.startAngle, data.endAngle, data.strokeWidth, data.backgroundColor);
    
    //
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
    var labels  = '<span class="big">' + data.title + 
    	'</span><span class="small">' + data.subtitle + '</span>';
    
    var output = '<div class="' + data.class + 
    	'"><svg viewBox="0 0 100 80"  xmlns="http://www.w3.org/2000/svg">' +
    	donutBackground + seriesSVG + labels +
			'</svg></div>';
    
    return output;
  },
  generatePath: function(sClass, sName, sAngleStart, sAngleEnd,sStroke, sColor) {
  	var svgarc = this.describeArc(50, 50, 40, sAngleStart, sAngleEnd);
  	var svg = '<path ' + 
        this.addParameter("class", sClass) + 
        this.addParameter("d", svgarc) +
        this.addParameter("fill", this.backgroundColor) + 
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
