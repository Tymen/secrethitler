const messagesConfig = {
    components: {
        sam_mover: {
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
        sam_mover: {
            index: {
                snackbarErrorInvalid: "Your credentials are invalid!",
                snackbarSucces: "Succecfully logged in!",
                snackbarErrorTextValidation: "Please fill in all required fields",
                subscripSelError: "Select valid subscriptions"
            }
        }
    },
    vuex: {
        global: {

        }
    },
    universal: {

    }
}
export { messagesConfig }
