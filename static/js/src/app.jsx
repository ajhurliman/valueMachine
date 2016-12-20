
var margin = {top:20, right:20, bottom:70, left:40};
var width  = 600 - margin.left - margin.right;
var height = height = 400 - margin.top - margin.bottom;
var canvasWidth = 500;
var canvasHeight = 500;

function getMin(arr) {
  var min = 9999999;
  var i;
  for (i = 0; i < arr.length; i++) {
    if (arr[i].val < min) {
      min = arr[i].val;
    }
  }
  return min;
}

function getMax(arr) {
  var max = 0;
  var i;
  for (i = 0; i < arr.length; i++) {
    if (arr[i].val > max) {
      max = arr[i].val;
    }
  }
  return max;
}

function parseData(obj) {
  returnArr = [];
  for (el in obj) {
    if (obj[el]) {
      returnArr.push({
        date: new Date(+el),
        val: +obj[el]
      });
    }
  }
  return returnArr;
}

function renderBollinger() {
  d3.json('/api/bollinger/KORS', function(err, data) {
    if (err) return console.warn(err);
    var jsonObj = JSON.parse(data);
    var json = {};
    var labels = [
      'daily_avgs',
      'rm',
      'upper',
      'lower'
    ];
    var color = d3.scale.category10();
    color.domain(d3.keys(labels));

    json.daily_avgs = parseData(jsonObj.daily_avgs);
    json.rm = parseData(jsonObj.rm);
    json.upper = parseData(jsonObj.upper);
    json.lower = parseData(jsonObj.lower);

    var startDate = json.daily_avgs[0].date;
    var endDate = json.daily_avgs[json.daily_avgs.length - 1].date;
    var minimum = getMin(json.lower);
    var maximum = getMax(json.upper);
    minimum = minimum - (maximum - minimum) * .1;
    maximum = maximum + (maximum - minimum) * .1;


    var x0 = d3.time.scale()
      .domain([d3.time.day.offset(startDate, 0), endDate])
      .rangeRound([0, width-40]);

    var y = d3.scale.linear()
      .domain([minimum, maximum])
      .rangeRound([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x0)
      .orient('bottom')
      .ticks(d3.time.days, 50)
      .tickFormat(d3.time.format('%b-%d-%Y'))
      .innerTickSize(-height)
      .outerTickSize(0)
      .tickPadding(8);

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient('left')
      .outerTickSize(2)
      .tickPadding(8);

    var line = d3.svg.line()
      .x(function(d) { return x0(d.date) })
      .y(function(d) { return y(d.val) });

    var svg = d3.select('#chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg.append('g')
      .attr('class', 'x axis')
      .style({'stroke': 'Black', 'fill': 'none', 'stroke-width': '1px'})
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
      .selectAll('text')
      .attr('transform', 'rotate(40)')
      .style('text-anchor', 'start');

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)

    for (trendLine in json) {
      svg.append('path')
        .data([json[trendLine]])
        .attr('class', 'line')
        .attr('data-legend', function(d) { return trendLine; })
        .style({'stroke': color(trendLine), 'fill': 'none', 'stroke-width': '1px'})
        .attr('d', line);
    }

    legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', 'translate(50,30)')
      .style('font-size', '12px')
      .call(d3.legend);

    var barLabels = ['Price', 'Trailing'];
  });
}


