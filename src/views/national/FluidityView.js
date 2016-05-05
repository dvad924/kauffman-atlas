/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classes from './nationalView.scss'
import FluidityGraph from '../../components/graphs/FluidityGraph.js'
import NationalMap from 'components/maps/NationalMap'

type Props = {
};

export class FluidityView extends React.Component<void, Props, void> {
  static propTypes = {};

  constructor () {
    super()
    this.state = {
      'selectedMetric':"irsNet",
      'dataType':'raw',
      'plot':'rank'
    }
    this._setMetric = this._setMetric.bind(this)
    this._setDataType = this._setDataType.bind(this)
    this._setRankVal = this._setRankVal.bind(this)
  }

  _setMetric (e){
    //console.log(d3.selectAll("."+classes["metricBox"]))
    
    d3.selectAll("."+classes["metricBox"])[0].forEach(metricBox => {
      metricBox.className = classes["metricBox"];
    })

    e.target.className = classes["active"] + " " + classes["metricBox"];

    if(e.target.id == "fluiditycomposite"){
      d3.select("#raw")[0][0].className = classes["disabled"] + " " + classes["rawRelBox"];
      d3.select("#relative")[0][0].className = classes["disabled"] + " " +  classes["rawRelBox"];
    }
    else{
      d3.select("#raw")[0][0].className = classes["rawRelBox"];
      d3.select("#relative")[0][0].className = classes["rawRelBox"];
      d3.select("#" + this.state.dataType)[0][0].className = classes["active"] + " " +  classes["rawRelBox"];      
    }

    this.setState({'selectedMetric':e.target.id});
  }

  _setDataType (e){
    console.log(d3.selectAll("."+classes["rawRelBox"]))
    
    d3.selectAll("."+classes["rawRelBox"])[0].forEach(rawRelBox => {
      rawRelBox.className = classes["rawRelBox"];
    })

    e.target.className = classes["active"] + " " + classes["rawRelBox"];

    this.setState({'dataType':e.target.id});
  }

  _setRankVal (e){
    console.log(d3.selectAll("."+classes["rankValBox"]))
    
    d3.selectAll("."+classes["rankValBox"])[0].forEach(rankValBox => {
      rankValBox.className = classes["rankValBox"];
    })

    e.target.className = classes["active"] + " " + classes["rankValBox"];

    this.setState({'plot':e.target.id});
  }

  render () {

    console.log(this.state);
    
    const sectionStyle = {
      height: 200,
      border: '1px solid orangered'
    }

    return (
      <div>
        <div className='container text-center'>
          <div className='row'>
            <div className={'col-xs-3 ' + classes["metricBoxContainer"]}>
              <div className={classes["rawRelContainer"]}>
                <div id="raw" onClick={this._setDataType} className={classes["active"] + " " + classes["rawRelBox"]}>Raw</div>
                <div id="relative" onClick={this._setDataType} className={classes["rawRelBox"]}>Relative</div>
              </div>
              <div className={classes["rankValContainer"]}>
                <div id="rank" onClick={this._setRankVal} className={classes["active"] + " " + classes["rankValBox"]}>Rank</div>
                <div id="value" onClick={this._setRankVal} className={classes["rankValBox"]}>Value</div>
              </div>             
              <div onClick={this._setMetric} id="fluiditycomposite" className={classes["metricBox"]}>Overall Fluidity</div>
              <div onClick={this._setMetric} id="inc" className={classes["metricBox"]}>High Growth Firms</div>
              <div onClick={this._setMetric} id="irsNet" className={classes["active"] + " " + classes["metricBox"]}>Net Migration (IRS)</div>
              <div onClick={this._setMetric} id="acsNet" className={classes["metricBox"]}>Net Migration (ACS)</div>
              <div onClick={this._setMetric} id="irsTotalMigration" className={classes["metricBox"]}>Total Migration(Inflow/Outflow Sum) (IRS)</div>
              <div onClick={this._setMetric} id="irsInflowMigration" className={classes["metricBox"]}>Inflow Migration</div>
              <div onClick={this._setMetric} id="irsOutflowMigration" className={classes["metricBox"]}>Outflow Migration</div> 
            </div>
            <div className='col-xs-9'>
                  <NationalMap />
            </div>
          </div>
          <div className = 'row'>
            <div className='col-xs-12'>
              <FluidityGraph plot={this.state.plot} dataType={this.state.dataType} selectedMetric={this.state.selectedMetric}/>          
            </div>
          </div>        
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

export default connect((mapStateToProps), {})(FluidityView)