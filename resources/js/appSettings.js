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
                noLogin: "You're not logged in",
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
