import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadMetroGdp, loadMetroGdpPerCapita } from 'redux/modules/metroGdpData'
import MetroMap from 'components/maps/MetroMap'
import LineGraph from 'components/graphs/SimpleLineGraph'

export class MetroHeader extends React.Component<void, Props, void> {
  _fecthData () {
    if(!this.props.gdpData[this.props.metroId] || !this.props.gdpData[this.props.metroId].gdp){
      return this.props.loadGdpData(this.props.metroId)
    }
    if(!this.props.gdpData[this.props.metroId] || !this.props.gdpData[this.props.metroId].gdp_per_capita){
      return this.props.loadGdpPerCapita(this.props.metroId)
    }
  }

   componentDidMount() {
    this._fecthData ()
  }
  
  componentWillReceiveProps (nextProps){
    this._fecthData ()
  }

  hasData () {
    return this.props.gdpData[this.props.metroId] &&
      this.props.gdpData[this.props.metroId].gdp &&
      this.props.gdpData[this.props.metroId].gdp_per_capita
  }

  render () {
    if (!this.hasData()) return <span />
    let popData = [{
      key:'Population',
      strokeWidth: 2,
      values: Object.keys(this.props.metroData.pop)
        .filter(d => {return +d > 2000})
        .map((d,i) => {
        return {
          key: d,
          values:{
            x: +d,
            y: this.props.metroData.pop[d]  //i === 0 ? 0 : (this.props.metroData.pop[d] - this.props.metroData.pop[d - 1]) / this.props.metroData.pop[d - 1] * 100 ,
          }
        }
      })
    }]

    let gdpData = [{
      key:'Population',
      strokeWidth: 2,
      values: this.props.gdpData[this.props.metroId].gdp
        .map((d,i) => {
        return {
          key: d.key,
          values:{
            x: +d.key,
            y: d.value  //i === 0 ? 0 : (this.props.metroData.pop[d] - this.props.metroData.pop[d - 1]) / this.props.metroData.pop[d - 1] * 100 ,
          }
        }
      })
    }]

    let gdpDataPerCapita = [{
      key:'Population',
      strokeWidth: 2,
      values: this.props.gdpData[this.props.metroId].gdp
        .map((d,i) => {
        console.log('test', d.key, d.value, popData[0].values[i].values.y)
        return {
          key: d.key,
          values:{
            x: +d.key,
            y: +Math.round((d.value / popData[0].values[i].values.y)* 1000000)//i === 0 ? 0 : (this.props.metroData.pop[d] - this.props.metroData.pop[d - 1]) / this.props.metroData.pop[d - 1] * 100 ,
          }
        }
      })
    }]
    console.log('header', this.props.gdpData[this.props.metroId])
    let growth = (this.props.metroData.pop[2014] - this.props.metroData.pop[2001]) / this.props.metroData.pop[2001] * 100
    let last_gdp = this.props.gdpData[this.props.metroId].gdp.find(d => { return +d.key === 2014 }).value
    let first_gdp = this.props.gdpData[this.props.metroId].gdp.find(d => { return +d.key === 2001 }).value
    let gdpGrowth = (last_gdp - first_gdp) / first_gdp * 100
    let last_per_capita = gdpDataPerCapita[0].values.find(d => { return +d.key === 2014 }).values.y
    let first_per_capita = gdpDataPerCapita[0].values.find(d => { return +d.key === 2001 }).values.y
    let perCapitaGrowth = (last_gdp - first_gdp) / first_gdp * 100



    return (
      <div className='container'>
        <h4>{this.props.metroData.name}</h4>
        <div className='row'>
          <div className='col-xs-3'>
              <MetroMap currentMetro={this.props.metroId} />
              
          </div>
          <div className='col-xs-3'>
              <div>
                <span style={{fontSize:36, fontWeight:0,paddingRight: 10}}> 
                  {this.props.metroData.pop['2014'].toLocaleString()}
                </span> 
                <div style={{display:'inline-block'}}><strong>Population</strong><br />
                  {growth.toLocaleString()}% 
                </div>
              </div>
              <LineGraph data={popData} uniq='popGraph' options={{height: 50}} />
              <span className='pull-left'>{popData[0].values[0].key}</span>
              <span className='pull-right'>{popData[0].values[popData[0].values.length-1].key}</span>
          </div>
          <div className='col-xs-3'>
            <div>
              <span style={{fontSize:36, fontWeight:0,paddingRight: 10}}> 
                {this.props.gdpData[this.props.metroId].gdp.find(d => { return +d.key === 2014 }).value.toLocaleString()}
              </span> 
              <div style={{display:'inline-block'}}><strong>GDP</strong> (in millions)<br />
                {gdpGrowth.toLocaleString()}% 
              </div>
            </div>
            <LineGraph data={gdpData} uniq='gdpGraph' options={{height: 50}} />
            <span className='pull-left'>{popData[0].values[0].key}</span>
            <span className='pull-right'>{popData[0].values[popData[0].values.length-1].key}</span>
          </div>
           <div className='col-xs-3'>
            <div>
              <span style={{fontSize:36, fontWeight:0,paddingRight: 10}}> 
                {last_per_capita.toLocaleString()}
              </span> 
              <div style={{display:'inline-block'}}><strong>GDP Per Capita</strong><br />
                {perCapitaGrowth.toLocaleString()}% 
              </div>
            </div>
            <LineGraph data={gdpDataPerCapita} uniq='perCapitaGraph' options={{height: 50}} />
            <span className='pull-left'>{popData[0].values[0].key}</span>
            <span className='pull-right'>{popData[0].values[popData[0].values.length-1].key}</span>
          </div>
        </div>
      </div>
    )      
  }
}

const mapStateToProps = (state) => {
  return ({
   
    gdpData : state.metroGdpData
  })
}

export default connect((mapStateToProps), {
  loadGdpPerCapita: (currentMetro) => loadMetroGdpPerCapita (currentMetro),
  loadGdpData: (currentMetro) => loadMetroGdp (currentMetro)
})(MetroHeader)