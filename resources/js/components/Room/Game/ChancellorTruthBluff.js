import React, {Component} from 'react';
import {connect} from "react-redux";

class ChancellorTruthBluff extends Component {

    state = {
        Bluff: false,
        Truth: false,
        CardOption: '',
        CardOptions: [
            {id: 1, option: 'fascist, liberal'},
            {id: 2, option: 'liberal, liberal'},
            {id: 3, option: 'fascist, fascist'},
        ],
    }


    handleSubmit = (e) => {
        axios.post(`/api/v1/rooms/${this.props.room.id}/chancellor_truth_bluff`, {option: e})
    }

    HandleOnClick = (e) => {
        if (e === 'truth') {
            this.setState({
                Truth: true
            })
        } else if (e === 'bluff') {
            this.setState({
                Bluff: true
            })
        }
    }

    isChecked = (option) => {
        this.setState({
            CardOption: option
        })
    }

    showOptions = (option) => {
        return this.state.CardOptions.map(option => {
            if (option.id === this.state.CardOption.id) {
                return (
                    <div className="options active" key={option.id}>
                        <label className="container-choose-chancellor">
                            <input type="radio" name="radio" onChange={() => this.isChecked(option)}/>
                            <img className="checkbox"/>
                            {option.option}
                        </label>
                    </div>
                )
            } else {
                return (
                    <div className="options" key={option.id}>
                        <label className="container-choose-chancellor">
                            <input type="radio" name="radio" onChange={() => this.isChecked(option)}/>
                            <img className="checkbox"/>
                            {option.option}
                        </label>
                    </div>
                )
            }
        })
    }

    render() {

        if (this.state.Truth) {
            return <p>truth</p>

        } else if (this.state.Bluff) {

            return (
                <div>
                    <div className="header-choose-chancellor">
                        <div className="row">
                            <div className="col-2">
                                <p>{this.props.room?.second}</p>
                            </div>
                            <div className="col-8">
                                <p>Choose one of the bluff options</p>
                                <p className="under-title">(select one option and click submit to continue)</p>
                            </div>
                            <div className="col-2">
                                <button type="submit" className="btn btn btn-explanation btn-chancellor"
                                        onClick={(e) => this.handleSubmit(this.state.CardOption)}>submit
                                </button>
                            </div>
                        </div>
                    </div>
                    {this.showOptions()}
                </div>
            )
        } else {
            return (
                <div className="header-choose-chancellor">
                    <div className="row">
                        <div className="col-2">
                            <p>{this.props.room?.second}</p>
                        </div>
                        <div className="col-8">
                            <p>Choose if you want to bluff or tell the truth about the policy cards you got</p>
                            {/*<p className="under-title">(select one option and click submit to continue)</p>*/}
                        </div>
                    </div>
                    <div className="container-bluff-truth">
                        <button name="truth" className="truth-button"
                                onClick={() => this.HandleOnClick('truth')}>Truth
                        </button>
                        <button name="bluff" className="bluff-button"
                                onClick={() => this.HandleOnClick('bluff')}>Bluff
                        </button>
                    </div>
                </div>
            )
        }
    }


}

const mapStateToProps = state => {
    const {room} = state;
    return {room: room}
}
export default connect(mapStateToProps)(ChancellorTruthBluff);
