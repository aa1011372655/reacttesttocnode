import React, {Component} from 'react';
import {connect} from 'react-redux'
class Home extends Component {
    render() {
        return (
            <div></div>
        )
    }
}
const mapStateToProps = (state) => {
    let {} = state;
};
export default connect()(Home);