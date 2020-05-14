import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setPolicies} from "../../../redux/actions/room-actions";
class ChoosePolicy extends Component {
    state = {
        policies: [],
        clicked: false,
    };

    componentDidMount() {
        axios.get(`/api/v1/rooms/${this.props.room.id}/get_policies`)
            .then(response => {
                this.props.dispatch(setPolicies(response.data.result));
                console.log(response)
            }).catch(err => {
                console.log(err);
        })
    }
    setPolicies = (policy) => {
        if (!this.state.clicked) {
            this.setState({clicked: false});
            const list = [].concat(this.props.room.policies);
            const indexOfPolicyArray = list.indexOf(policy);
            list.splice(indexOfPolicyArray, 1);
            console.log(list);
            axios.post(`/api/v1/rooms/${this.props.room.id}/set_policies`,
                {
                    "leftOver": list,
                    "removed":  policy,
                })
                .then(responese => {
                    console.log(responese);
                    this.setState({clicked: false});
                }).catch(err => {
                console.log(err);
            })
        }
    };
    render() {
        return (
            <div className="header-choose-chancellor">
                <div className="row">
                    <div className="col-2">
                    </div>
                    <div className="col-8">
                        <p>Remove Policy</p>
                        <p className="under-title">(click on the policy to remove it)</p>
                    </div>
                </div>
                <div className={"choosePolicies"}>
                    {this.props.room.policies?.map((policy, index) => {
                        return policy === "Fascist" ?
                            <img onClick={() => {
                                this.setPolicies(policy)
                            }} src="/images/facist-article.png" key={index}/> :
                            <img onClick={() => {
                                this.setPolicies(policy)
                            }} src="/images/liberal-article.png" key={index}/>;
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {room, users} = state;
    return {room: room, authUser: users.authUser}
}
export default connect(mapStateToProps)(ChoosePolicy);
