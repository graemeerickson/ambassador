import React, { Component } from 'react';

class HomebuyerTargetLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      targetAddress: this.props.user.targetAddress
    }
  }

  handleTargetAddressChange = e => { this.setState({ targetAddress: e.target.value }); }

  handleSubmit = e => {
    e.preventDefault();
    this.props.updateTargetLocation(this.state.targetAddress);
  }

  render() {
    if (this.props.user.role[0] === 'Prospective Homebuyer') {
      return(
        <div className="row">
          <div className="col-12">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group mb-3">
              <input name="targetAddress" type="text" className="form-control" placeholder="Enter desired address, or just a city & state for now" value={this.state.targetAddress} onChange={this.handleTargetAddressChange} aria-label="Target address" aria-describedby="target-address" />
              <div className="input-group-append">
                <button type="submit" className="btn btn-primary">Update map</button>
              </div>
            </div>
          </form>
          </div>
        </div>
      )
    }
    else { return(<div></div>) }
  }
}

export default HomebuyerTargetLocation;