/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

type Props = {
};

export class FluidityView extends React.Component<void, Props, void> {
  static propTypes = {};

  render () {

    const sectionStyle = {
      height: 200,
      border: '1px solid orangered'
    }

    return (
      <div>
        <div className='container text-center'>
          <div className='row'>
            <div className='col-xs-12'>
              <h4>Fluidity View</h4>
            </div>
          </div>            
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

export default connect((mapStateToProps), {})(FluidityView)
