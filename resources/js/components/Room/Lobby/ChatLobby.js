import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addMessage} from "../../../redux/actions/room-actions";

class ChatLobby extends Component {
    state = {
        messages: [],
        message: '',
    };

    componentDidMount() {
        this._isMounted = true
        setTimeout(this.listener, 1000)
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    listener = () => {
        let channel = Echo.channel(`room.${this.props.room.id}`)
        channel.listen('.message-event', (data) => {
            if (this._isMounted) {
                this.props.dispatch(addMessage({
                    time: this.getCurrentTime(),
                    message: data.user.username + " : " + data.message
                }));
                this.scrollToBottom()
            }
        });
    }

    getCurrentTime = () => {
        let time = new Date();
        let hour = time.getHours();
        let minutes = time.getMinutes();
        minutes < 10 ? minutes = `0${minutes}` : false
        return hour + ':' + minutes
    }

    scrollToBottom = () => {
        document.getElementById('messagesEnd').scrollIntoView({behavior: "smooth"});
    }

    handleChange(e) {
        e.persist()
        this.setState(() => {
            return {
                message: e.target.value
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.message) {
            axios.post(`/rooms/${this.props.room.id}/message`, {
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
                        {this.props.room.messages?.map(message => (
                            <div className="message-container" key={Math.floor(Math.random() * 99999)}>
                                <p key={Math.floor(Math.random() * 99999)} className="message">{message.message}</p>
                                <p className="time">{message.time}</p>
                            </div>
                        ))}
                    <div id="messagesEnd" style={{float: "left", clear: "both"}} />
                </div>

                <div className="send-message">
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <label className="text-white">
                            <input type="text" className="input-message" placeholder="Message..."
                                   onChange={(e) => this.handleChange(e)} ref={(ref) => this.mainInput = ref}/>
                        </label>
                        <input type="submit" value="Send" className="btn btn-send-button"/>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {room} = state
    return {room: room}
}

export default connect(mapStateToProps)(ChatLobby)
