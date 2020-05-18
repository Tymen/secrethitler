import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setPolicies} from "../../../redux/actions/room-actions";

class ChoosePolicy extends Component {
    state = {
        policies: [],
    };

    componentDidMount() {
        axios.get(`/api/v1/rooms/${this.props.room.id}/get_policies`)
            .then(response => {
                this.props.dispatch(setPolicies(response.data.result));
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.room?.second <= 0) {
            this.setPolicies(this.props.room.policies[0])
        }
    }

    setPolicies = (policy) => {
        const list = [].concat(this.props.room.policies);
        const indexOfPolicyArray = list.indexOf(policy);

        list.splice(indexOfPolicyArray, 1);

        axios.post(`/api/v1/rooms/${this.props.room.id}/set_policies`,
            {
                "leftOver": list,
                "removed": policy,
            })
    };

    render() {
        return (
            <div className="header-choose-chancellor">
                <div className="row">
                    <div className="col-2">
                        <p>{this.props.room?.second}</p>
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
