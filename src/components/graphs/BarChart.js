"use strict"
import React from 'react'
import d3 from 'd3'
import { connect } from 'react-redux'
import classes from '../../components/maps/NationalMap.scss'
import { withRouter } from 'react-router'

export class BarChart extends React.Component<void, Props, void> {

    constructor () {
        super()

        this._renderGraph = this._renderGraph.bind(this)
        this._labelFunction = this._labelFunction.bind(this)
        this._msaClick = this._msaClick.bind(this)
    }

    componentWillMount () {
        console.log("comp will mount barchart")
    }
    componentDidMount () {
        console.log("barchartmount");
        this._renderGraph();
    }
  _msaClick (d) {
    console.log(d.key);
    this.context.router.push('/metro/'+d.key);   
  }
    _renderGraph () {
        var percFormat = d3.format(".3%");
        var scope = this;
        
        var compColor = d3.scale.ordinal()
            .domain(["lowIncome","highIncome"])
            .range(['red','green']);

    	var data = scope.props.data;

        if(this.props.metros){
          data = data.filter(d => {
            var inBucket = false;
            this.props.metros.forEach(msaId => {
              if(d.key == msaId){
                inBucket = true;
              } 
            })
            return inBucket;
          }) 
        }

        //Need to add a circular reference to each value
        data.forEach(metro => {
            var city = metro;

            metro.values.forEach(yearValue => {
              yearValue.city = city;
            })

        })

        if(scope.props.graph != "opportunity"){
            //Sort data so bar chart descends
            data.sort(function(a,b){
              return b.values[(b.values.length-1)].y - a.values[(a.values.length-1)].y
            })
            var filteredData = data;
        }
        else{
            //Sort data so bar chart descends
            if(scope.props.dataType != "composite"){
                data.sort(function(a,b){
                    var aVal,
                        bVal;

                    a.values.forEach(function(val){
                        if(val.x == scope.props.dataType){
                            aVal = val.y;
                        }
                    })
                    b.values.forEach(function(val){
                        if(val.x == scope.props.dataType){
                            bVal = val.y;
                        }
                    })

                    if(aVal<=bVal){
                        return 1;
                    }
                    else if(aVal>bVal){
                        return -1;
                    }
                    else{
                        return 0;
                    }
                })                
            }

            //Trim data so that each city only has the values for the current selected metric
            var trimmedData = data.map(function(metroArea){
                var values = [];
                var filteredMetro = {
                    "key":metroArea.key,
                    "name":metroArea.name,
                    "values":null
                };

                filteredMetro.values = metroArea.values.filter(function(value){
                    if(scope.props.dataType == "composite"){
                        return value;
                    }
                    else{
                        if(value.x == scope.props.dataType){
                            return value;
                        }
                    }
                })
                return filteredMetro;
            })   

            //Make sure the cities we are using have the selected dataset
            var filteredData = trimmedData.filter(metroArea => {
                if(scope.props.dataType == "composite"){
                    if(metroArea.values[0].y == null || metroArea.values[1].y == null){
                        return false;
                    }
                    else{
                        return true;
                    }
                }
                else{
                    if(metroArea.values[0] == null){
                        return false;
                    }
                    else{
                        return true;
                    }                
                }
            })          
        }

        var margin = {top: 0, right: -0, bottom: 0, left: -0},
            width = document.getElementById("mapDiv").offsetWidth,
            height = width*.5;

		var x0 = d3.scale.ordinal()
		    .rangeBands([0, width], .5,1);

        var x1 = d3.scale.ordinal();

		var y = d3.scale.linear()
		    .range([height, 0]);

		var xAxis = d3.svg.axis()
		    .scale(x0)
		    .orient("bottom")
            .tickValues([]);

		var yAxis = d3.svg.axis()
		    .scale(y)
		    .orient("left");

        if(scope.props.graph != "opportunity"){}
        else{
            yAxis.ticks(20, "%");
        }
		    
        var voronoi = d3.geom.voronoi()
            .x(function(d) { return x0(d.city.key); })
            .y(function(d) { return y(d.y); })
            .clipExtent([[-margin.left, -margin.top], [width + margin.right, height + margin.bottom]])

        //Remove everything currently in the svg
        d3.select("#barChart svg").selectAll("*").remove();

        //Make a new svg
        var svg = d3.select("#barChart svg")
            .attr('viewBox','-90 -10 ' + (width+110) + ' ' + (height+60))

		x0.domain(filteredData.map(function(d) { return +d.key; }));

        //Opportunity data uses 
        if(scope.props.graph == "opportunity"){
            x1.domain(['lowIncome','highIncome']).rangeBands([0,x0.rangeBand()]);
            y.domain([d3.min(filteredData, function(d) { return d['values'][0]['y']; }), d3.max(filteredData, function(d) { return d['values'][0]['y'] })]);
        } 
        else{
            y.domain([d3.min(filteredData, function(d) { return d['values'][(d.values.length-1)]['y']; }), d3.max(filteredData, function(d) { return d['values'][(d.values.length-1)]['y'] })]);
        }

		svg.append("g")
		    .attr("class", "x axis")
		    .attr("transform", "translate(0," + height + ")")
		    .call(xAxis)
                .selectAll("text")  
                .style("display", "none");

		svg.append("g")
		    .attr("class", "y axis")
		    .call(yAxis)
		      .append("text")
		      .attr("transform", "rotate(-90)")
		      .attr("y", 6)
		      .attr("dy", "-3.5em")
		      .style("text-anchor", "end")
		      .text(function(){
                if(scope.props.graph != "opportunity"){
                    return "Score"
                }
                else{
                    return "Percent Income Gain/loss"
                }
              });

        var metroArea = svg.selectAll(".metroArea")
              .data(filteredData)
            .enter().append("g")
              .attr("class",function(d){return "metroArea" + d.key})
              .attr("transform",function(d){ return "translate(" + x0(d.key) + ",0)";});

        var voronoiGroup = svg.append("g")
              .attr("class", "voronoi")
              .style("fill","#FFFFFF")
              .style("stroke","#000000")
              .style("opacity","0")

        if(scope.props.graph != "opportunity"){
            metroArea.selectAll("rect")
                  .data(function(d){var val = [d.values[d.values.length-1]]; return val;})
                .enter().append("rect")
                  .attr("id",function(d){return "metroArea"+ d.city.key + d.x;})
                  .attr("width",x0.rangeBand())
                  .attr("x",function(d){ return x0(d.x);})
                  .attr("y",function(d){ if(y(d.y) == height){return height-15} else{return y(d.y);}})
                  .attr("height",function(d){if(y(d.y) == height){return 15} else{return height- y(d.y);}})
                  .style("fill",function(d){
                    return d.city.color;
                  })  

            voronoiGroup.selectAll("path")
                .data(voronoi(d3.nest()
                    .key(function(d) {return x0(d.city.key) + "," + y(d.y); })
                    .rollup(function(v) { return v[0]; })
                    .entries(d3.merge(filteredData.map(function(d) {var val = [d.values[d.values.length-1]]; return val; })) )
                    .map(function(d) { return d.values; })))
            .enter().append("path")
                .attr("d", function(d) { if(d!=undefined){return "M" + d.join("L") + "Z"}; })
                .datum(function(d) { if(d!=undefined){return d.point}; })
                .on("mouseover", mouseover)
                .on("mouseout", mouseout)
                .on("click",click);
        }
        else{
            metroArea.selectAll("rect")
                  .data(function(d){ return d.values;})
                .enter().append("rect")
                  .attr("id",function(d){return "metroArea"+ d.city.key + d.x;})
                  .attr("width",x1.rangeBand())
                  .attr("x",function(d){ return x1(d.x);})
                  .attr("y",function(d){ return y(d.y);})
                  .attr("height",function(d){return height- +y(d.y);})
                  .style("fill",function(d){
                    if(scope.props.dataType == "composite"){ 
                        return compColor(d.x);
                    }
                    else{
                        return d.color;
                    }
                  })    

            voronoiGroup.selectAll("path")
                .data(voronoi(d3.nest()
                    .key(function(d) {return (x0(d.city.key) + x1(d.x)) + "," + y(d.y); })
                    .rollup(function(v) { return v[0]; })
                    .entries(d3.merge(filteredData.map(function(d) { return d.values; })) )
                    .map(function(d) { return d.values; })))
            .enter().append("path")
                .attr("d", function(d) { if(d!=undefined){return "M" + d.join("L") + "Z"}; })
                .datum(function(d) { if(d!=undefined){return d.point}; })
                .on("mouseover", mouseover)
                .on("mouseout", mouseout)
                .on("click",click);

        }

        //Focus is the hover popup text
        var focus = svg.append("g")
            .attr("transform", "translate(-100,-100)")
            .attr("class", "focus");

        focus.append("text")
        .attr("y", 10)
        .style("font-size",".75em");

        function mouseover(d) {
            var popText = "",
                name;

            name = d.city.name;
       
            var rect = d3.select("#metroArea"+d.city.key+d.x);

            popText = "Name: " + name

            if(scope.props.graph != "opportunity"){
                rect.attr("width",(x0.rangeBand()*2));
                popText += " | " + d.y;
            }
            else{
                rect.style("fill","#000000");
                rect.attr("width",(x1.rangeBand()*5));
                if(scope.props.dataType == "composite" || scope.props.dataType == "highIncome"){
                    popText += " High Income: " + percFormat(d.city.values[1].y)
                }
                if(scope.props.dataType == "composite" || scope.props.dataType == "lowIncome"){
                    popText += " Low Income: " + percFormat(d.city.values[0].y);
                }                
            }

          focus.attr("transform", "translate(10,-5)");
          focus.select("text").text(popText);
        }

        function click(d){ 
            console.log("d.city",d.city);
            scope._msaClick(d.city)
        }

        function mouseout(d) {                          
            var rect = d3.select("#metroArea"+d.city.key+d.x);

            if(scope.props.graph != "opportunity"){
                rect.attr("width",(x0.rangeBand()));     
                rect.style("fill",function(){return d.city.color})     
            }
            else{
                if(scope.props.dataType == "composite"){
                    rect.style("fill",function(){return compColor(d.x);})
                }
                else{
                    rect.style("fill",function(){return d.color})                        
                }
                rect.attr("width",(x1.rangeBand()));                        
            }
        }
    }
    _labelFunction () {
        if(this.props.graph != "opportunity"){
            return "Composite " + this.props.title.split("composite")[0] + " score " + "(" + this.props.data[0].values[this.props.data[0].values.length-1].x + ")"
        }
        else{
            return "Income gain/loss relative to parental income by metro area"
        }
    }
    render () {
    	var scope = this;

    	console.log("bargraph",scope);
        this._renderGraph();
        return (
            <div className={classes['graphContainer']}>
                <div className={classes['title']}>
                    <h4>{scope._labelFunction()}</h4>
                </div>
                <div id="barChart" className={classes['svg-container']}>
                  <svg className={classes['.svg-content-responsive']} preserveAspectRatio='xMinYMin meet'/>
                </div>
            </div>
        );            
    }
}
BarChart.contextTypes = {
  router: React.PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({

})

export default connect((mapStateToProps), {

})(BarChart)