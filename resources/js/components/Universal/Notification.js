import React, {Component} from 'react';
import PNotify from 'pnotify/dist/es/PNotify';

export default class Home extends Component {
    // Set notification style
    // this.props.onRef..... This allowes other components to call functions inside this component
    componentDidMount() {
        PNotify.defaults.styling = 'bootstrap4'; // Bootstrap version 4
        this.props.onRef(this)
    };

    // Same as this.props.onRef.....
    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    // This will give the state a message as a object
    getNotify = (getMsg) => {
        this.setState( {
            MSG: getMsg,
        });
    };

    // Function to show the right type of notification
    notifyMSG = () => {
        if (this.state) {
            switch(this.state.MSG.type){
                case "error":
                    PNotify.error({
                        title: this.state.MSG.title,
                        text: this.state.MSG.message,
                        modules: {
                            Desktop: {
                                desktop: true
                            },
                        }
                    });
                    break;
                case "success":
                    PNotify.success({
                        title: this.state.MSG.title,
                        text: this.state.MSG.message,
                        modules: {
                            Desktop: {
                                desktop: true
                            },
                        }
                    });
                    break;
                case "warning":
                    PNotify.notice({
                        title: this.state.MSG.title,
                        text: this.state.MSG.message,
                        modules: {
                            Desktop: {
                                desktop: true
                            },
                        }
                    });
                    break;
            }
        }
    };

    // This is needed so the notification will be shown if the state changes.
    render() {
        return (
            <div>
                {this.notifyMSG()}
            </div>
        )
    }
}
