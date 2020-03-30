import React, {Component} from 'react';

export default class ChatLobby extends Component {
    state = {
        messages: [],
        message: '',
    };

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        var channel = Echo.channel(`room.${this.props.id}`);
        channel.listen('.message-event', (data) => {
            console.log(data.message)
            this.setState({
                messages: [...this.state.messages, data.user.username + " : " + data.message ],
            });
            this.scrollToBottom()
        });
    }

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({message: e.target.value});
    }

    handleSubmit(e) {

        e.preventDefault();

        if (this.state.message) {
            axios.post('/rooms/'+ this.props.id , {
                message: this.state.message,
            })
        }

        this.setState({
            message: ''
        });

        this.mainInput.value = "";
    }

    render() {
        return (
            <div>
                <div className="chat">
                    <div>
                        {this.state.messages.map(message => (
                            <p className="message">{message}</p>
                        ))}
                    </div>
                    <div style={{ float:"left", clear: "both" }}
                         ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </div>

                <div className="send-message">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <input type="text" className="input-message" placeholder="Message..."
                                   onChange={this.handleChange} ref={(ref) => this.mainInput= ref}/>
                        </label>
                        <input type="submit" value="Send" className="btn btn-send-button"/>
                    </form>
                </div>
            </div>
        );
    }
}
