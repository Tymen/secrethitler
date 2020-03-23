/**

 // route to get the message: messageConfig to the subject pages, to the page home.
 state = {
        getMsg: messagesConfig.pages.home,
    };

 // Needed to call the this.child.getNotify function.
 constructor(props) {
        super(props);
        this.child = React.createRef();
    };

 // Call the getNotify function, Define the message it should display.
 notify = () => {
        this.child.getNotify(this.state.getMsg.auth.noLogin);
    };

 // Place in the render section
 <Notification onRef={ref => (this.child = ref)} />
 **/

const msgTypes = {
    One: "error",
    Two: "success",
    Three: "warning",
};

const messagesConfig = {
    components: {
        example: {
            spnLogin: {
                default: "Error",
                clientId: "Error",
                secretKey: "Error",
                tenantId: "Error",
            },
            subscriptSel: {
                subscriptionErr: "Subscription is required"
            }
        },
        register: {
            auth: {
                registerError: {
                    type: msgTypes.One,
                    title: "Invalid",
                    message: "Incorrect inputs"
                }
            },
        },
        rooms: {
            internalServer: {
                type: msgTypes.One,
                title: "Connection issue",
                message: "Internal server error"
            }
        }
    },
    pages: {
        example: {
            index: {
                snackbarErrorInvalid: "Your credentials are invalid!",
                snackbarSucces: "Succecfully logged in!",
                snackbarErrorTextValidation: "Please fill in all required fields",
                subscripSelError: "Select valid subscriptions"
            }
        },
        home: {
            auth: {
                noLogin: {
                    type: msgTypes.One,
                    title: "Authentication Error",
                    message: "You're not logged in",
                }
            }
        },
        about: {

        },
        game: {

        },
        gameRule: {

        },
        auth: {

        }

    },
    universal: {

    }
};

export { messagesConfig }
