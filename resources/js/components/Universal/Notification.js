import React, {Component} from 'react';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons'; // Must import this in order to see the close and pause buttons (Even though it's not used in this file).

export default class Home extends Component {
    // Set notification style
    // this.props.onRef..... This allowes other components to call functions inside this component
    componentDidMount() {
        PNotify.defaults.styling = 'bootstrap4'; // Bootstrap version 4
        PNotify.defaults.icons = 'fontawesome4';
        this.props.onRef(this)
    };

    // Same as this.props.onRef.....
    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    // This will give the state a message as an object
    getNotify = (getMsg) => {
        this.setState( {
            MSG: getMsg,
        });
    };

    // Function to show the right type of notification
    notifyMSG = () => {
        if (this.state) {
            if (this.state.MSG){
                switch(this.state.MSG.type){
                    case "error":
                        PNotify.error({
                            title: this.state.MSG.title,
                            text: this.state.MSG.message,
                            modules: {
                                Desktop: {
                                    desktop: true
                                },
                                Buttons: {
                                    closer: true,
                                    closerHover: true
                                }
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
                                Buttons: {
                                    closer: true,
                                }
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
                                Buttons: {
                                    closer: true,
                                }
                            }
                        });
                        break;
                }
                this.setState({MSG: ""})
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
