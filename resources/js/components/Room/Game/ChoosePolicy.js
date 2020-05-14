import React, {Component} from 'react';
import {connect} from 'react-redux';

class ChoosePolicy extends Component {
    state = {
        policies: ["Fascist", "Liberal", "Fascist"]
    }
    render()
    {
        return (
            <div className={"choosePolicies"}>
                {this.state.policies.map((policy,index) => {
                    return policy === "Fascist" ?
                        <img src="/images/facist-article.png" key={index}/>:
                        <img src="/images/liberal-article.png" key={index}/>;
                })}
            </div>
        )
    }
}
export default ChoosePolicy;
