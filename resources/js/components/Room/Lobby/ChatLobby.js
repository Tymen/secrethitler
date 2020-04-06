import React, {Component} from 'react';

export default class ChatLobby extends Component {
    state = {
        messages: [],
        message: '',
    };

    componentDidMount() {
        var channel = Echo.channel(`room.${this.props.id}`);
        channel.listen('.message-event', (data) => {
            this.setState({
                messages: [...this.state.messages, {
                    time: this.getCurrentTime(),
                    message: data.user.username + " : " + data.message
                }],
            });
            this.scrollToBottom()
        });
    }
    getCurrentTime = () => {
        let time = new Date();
        let hour = time.getHours();
        let minutes = time.getMinutes();
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
        let liveTime = hour + ':' + minutes
        return liveTime
    }

    scrollToBottom = () => {
        document.getElementById('messagesEnd').scrollIntoView({ behavior: "smooth" });
    }

    handleChange(e) {
        this.setState({message: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.message) {
            axios.post('/rooms/' + this.props.id, {
                message: this.state.message,
            })
        }
        this.setState({
            message: '',
        });
        this.mainInput.value = "";
    }

    render() {
        return (

            <div>
                <div className="chat">

                    <div className="side-border">
                        {this.state.messages.map(message => (
                            <div>
                                <p className="time">{message.time}</p>
                                <p key={Math.floor(Math.random() * 99999)} className="message">{message.message}</p>
                            </div>
                        ))}
                    </div>
                    <div id="messagesEnd" style={{float: "left", clear: "both"}} />
                </div>

                <div className="send-message">
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <label className="text-white">
                            <input type="text" className="input-message" placeholder="Message..."
                                   onChange={(e) => this.handleChange(e)} ref={(ref) => this.mainInput= ref}/>
                        </label>
                        <input type="submit" value="Send" className="btn btn-send-button"/>
                    </form>
                </div>
            </div>
        );
    }
}
