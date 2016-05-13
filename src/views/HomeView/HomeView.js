/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { loadDensityComposite } from 'redux/modules/densityData'
import { loadFluidityComposite } from 'redux/modules/fluidityData'
import { loadDiversityComposite } from 'redux/modules/diversityData'
import { loadCombinedComposite } from 'redux/modules/combinedData'
import classes from 'styles/sitewide/index.scss'
import d3 from 'd3'
import NationalMap from 'components/maps/NationalMap'
// import DensityView from 'views/'
import { browserHistory } from 'react-router'


type Props = {
  counter: number,
  doubleAsync: Function,
  increment: Function
};

export class HomeView extends React.Component<void, Props, void> {
   constructor () {
    super()
    this.state = {
      activeComponent:'combined'
    }
    this._initGraph = this._initGraph.bind(this)
    this._isActive = this._isActive.bind(this)
    this._linkIsActive = this._linkIsActive.bind(this)
    this._setActiveComponent = this._setActiveComponent.bind(this)
  }

  componentWillMount () {
    this._initGraph();
  }
 

  _initGraph () {
    if(!this.props['densitycomposite']){
      return this.props['getdensitycomposite']()
    }
    if(!this.props['fluiditycomposite']){
      return this.props['getfluiditycomposite']()
    }
    if(!this.props['diversitycomposite']){
      return this.props['getdiversitycomposite']()
    }
    if(!this.props['combinedcomposite']){
      return this.props['getcombinedcomposite']()        
    }        
  }

  _setActiveComponent(type){
    this.setState({activeComponent:type})
  }

  _isActive(type){
    return type === this.state.activeComponent ? classes['active'] : ''
  }

  _linkIsActive(type){
    return type === this.state.activeComponent ? classes['active-link'] : ''
  }

  render () {

    this._initGraph();
    var topFiveDensity;
    var topFiveFluidity;
    var topFiveDiversity;
    var topFiveCombined;

    let msaClick = (d) =>{
      console.log(d);
      if(d.id){
       this.props.history.push('/metro/'+d.id);       
      }
      else{
        this.props.history.push('/metro/'+d.target.id);  
      }

    }

    if(this.props.densitycomposite){
      topFiveDensity = this.props.densitycomposite.reduce((prev,msa) => {
        if(msa.values[msa.values.length-1].rank < 6){
          prev[msa.values[msa.values.length-1].rank] = {name:msa.name,score:msa.values[msa.values.length-1].y,id:msa.key}
        }
        return prev;
      },{})
      console.log("density",topFiveDensity)
      topFiveDensity = Object.keys(topFiveDensity).map(rank => {
        var roundFormat = d3.format(".2f")
        return(
              <div onClick={msaClick} id={topFiveDensity[rank].id} className={classes["msa"]}>{rank + ". " + topFiveDensity[rank]["name"]} <div className={classes["score"]}>{roundFormat(topFiveDensity[rank]["score"])}</div></div>
        )
      })
    }
    else{
      topFiveDensity = "Loading..."
    }

    if(this.props.fluiditycomposite){
      topFiveFluidity = this.props.fluiditycomposite.reduce((prev,msa) => {
        if(msa.values[msa.values.length-1].rank < 6){
          prev[msa.values[msa.values.length-1].rank] = {name:msa.name,score:msa.values[msa.values.length-1].y,id:msa.key}
        }
        return prev;
      },{})
      console.log("fluidity",topFiveFluidity)
      topFiveFluidity = Object.keys(topFiveFluidity).map(rank => {
        var roundFormat = d3.format(".2f")
        return(
              <div onClick={msaClick} id={topFiveFluidity[rank].id} className={classes["msa"]}>{rank + ". " + topFiveFluidity[rank]["name"]} <div className={classes["score"]}>{roundFormat(topFiveFluidity[rank]["score"])}</div></div>
        )
      })
    }
    else{
      topFiveFluidity = "Loading..."
    }

    if(this.props.diversitycomposite){
      console.log(this.props.diversitycomposite);
      topFiveDiversity = this.props.diversitycomposite.reduce((prev,msa) => {
        if(msa.values[msa.values.length-1].rank < 6){
          prev[msa.values[msa.values.length-1].rank] = {name:msa.name,score:msa.values[msa.values.length-1].y,id:msa.key}
        }
        return prev;
      },{})
      console.log("diversity",topFiveDiversity)
      topFiveDiversity = Object.keys(topFiveDiversity).map(rank => {
        var roundFormat = d3.format(".2f")
        return(
              <div onClick={msaClick} id={topFiveDiversity[rank].id} className={classes["msa"]}>{rank + ". " + topFiveDiversity[rank]["name"]} <div className={classes["score"]}>{roundFormat(topFiveDiversity[rank]["score"])}</div></div>
        )
      })
    }
    else{
      topFiveDiversity = "Loading..."
    }

    if(this.props.combinedcomposite){
      topFiveCombined = this.props.combinedcomposite.reduce((prev,msa) => {
        if(msa.values[msa.values.length-1].rank < 6){
          prev[msa.values[msa.values.length-1].rank] = {name:msa.name,score:msa.values[msa.values.length-1].y,id:msa.key}
        }
        return prev;
      },{})
      console.log("composite",topFiveCombined)
      topFiveCombined = Object.keys(topFiveCombined).map(rank => {
        var roundFormat = d3.format(".2f")
        return(
              <div onClick={msaClick} id={topFiveCombined[rank].id} className={classes["msa"]}>{rank + ". " + topFiveCombined[rank]["name"]} <div className={classes["score"]}>{roundFormat(topFiveCombined[rank]["score"])}</div></div>
        )
      })
    }
    else{
      topFiveCombined = "Loading..."
    }

    const sectionStyle = {
    }

    return (
     
      <div className='container'>
        <div className='row'>
          <div className={'col-xs-12 ' + classes['text-div']}>
            <strong>Lorem</strong> ipsum dolor sit amet, mel nibh soluta molestiae in, ut vis illud utamur disputando, sed id eius bonorum. Mei vivendum adversarium ex, libris assentior eu per. In summo invenire interpretaris quo, ex vix partem facilisis signiferumque, ridens splendide conclusionemque an vis. Dico aliquip scriptorem vix et. Te eum omnes possit omittantur. Ei volutpat dignissim sit, erat option pri in.
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-3' style={sectionStyle} onClick={this._setActiveComponent.bind(null,'combined')}>
            <div className={classes['selector-buttons']+' '+this._isActive('combined')}>
              <Link className={this._linkIsActive('combined') +' '+ classes['darklink']} to='/combined'>
              Combined
              </Link>
              <div className={classes["topFive"]}>{topFiveCombined}</div>
            </div>
          </div>
          <div className='col-xs-3' style={sectionStyle} onClick={this._setActiveComponent.bind(null,'density')}>
           <div className={classes['selector-buttons']+' '+this._isActive('density')}>
              <Link className={classes['darklink'] + ' ' + this._linkIsActive('density')} to='/density'>
              Density
              </Link>
              <div className={classes["topFive"]}>{topFiveDensity}</div>
            </div>
          </div>
          <div className='col-xs-3' style={sectionStyle} onClick={this._setActiveComponent.bind(null,'fluidity')}>
            <div className={classes['selector-buttons']+' '+this._isActive('fluidity')}>
              <Link className={classes['darklink'] + ' ' + this._linkIsActive('fluidity')} to='/fluidity'>
              Fluidity
              </Link>
              <div className={classes["topFive"]}>{topFiveFluidity}</div>
            </div>
          </div>
          <div className='col-xs-3' style={sectionStyle} onClick={this._setActiveComponent.bind(null,'diversity')}>
            <div className={classes['selector-buttons']+' '+this._isActive('diversity')}>
              <Link className={classes['darklink'] + ' ' + this._linkIsActive('diversity')} to='/diversity'>
              Diversity
              </Link>
              <div className={classes["topFive"]}>{topFiveDiversity}</div>
            </div>
          </div>
        </div>
         <div className='row' style={{padding:15, border:'1px solid black', marginTop: 15}}>
          <div className={'col-xs-3'}>
              <strong style={{color:'chartreuse'}}>All Metros</strong> 
          </div>
           <div className={'col-xs-3'}>
              <strong>Big Metros</strong>
              <br /> 2m+
          </div>
          <div className={'col-xs-3'}>
              <strong>Medium Metros</strong>
               <br />1m - 2m
          </div>
          <div className={'col-xs-3'}>
              <strong>Small Metros</strong> 
          </div>
        </div>
        <div className='row'>
         <div className={'col-xs-12 ' + classes['text-div']}>
              <strong>Lorem</strong> ipsum dolor sit amet, mel nibh soluta molestiae in, ut vis illud utamur disputando, sed id eius bonorum. Mei vivendum adversarium ex, libris assentior eu per. In summo invenire interpretaris quo, ex vix partem facilisis signiferumque, ridens splendide conclusionemque an vis. Dico aliquip scriptorem vix et. Te eum omnes possit omittantur. Ei volutpat dignissim sit, erat option pri in.
           </div>
        </div>
          
        <div className='row'>
          <div className='col-xs-12'>
            <NationalMap click={msaClick}/>
          </div>
        </div>  
      </div>
      
    )
  }
}

const mapStateToProps = (state) => ({
  densitycomposite:state.densityData.compositeData,
  fluiditycomposite:state.fluidityData.compositeData,
  diversitycomposite : state.diversityData.diversitycomposite,
  combinedcomposite : state.combinedData.combinedcomposite 
})

export default connect((mapStateToProps), {
  getdensitycomposite: () => loadDensityComposite(),
  getfluiditycomposite: () => loadFluidityComposite(),
  getdiversitycomposite: () => loadDiversityComposite(),
  getcombinedcomposite: () => loadCombinedComposite()
})(HomeView)
