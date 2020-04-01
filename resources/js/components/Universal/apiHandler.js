/**
 // Import Api Handler
 import {get} from "../Universal/apiHandler";

 get('/api/v1/rooms')
    .then(response => {
        if(response.error){
            this.child.getNotify(this.state.getMsg.internalServer);
        }else {
            this.setState({rooms: response.data});
        }
    })

 */
const get = async (link) => {
        let responseObj = {
            "error": false,
            "statuscode": '',
            "data": ''
        };
        await axios.get(link)
            .then(response => {
                responseObj.statuscode = response.status;
                responseObj.data = response.data;
            })
            .catch(error => {
                if (error.response) {
                    responseObj.statuscode = error.response.status;
                    responseObj.error = true;
                    responseObj.data = error.response.data.message;
                }
            });
        return responseObj;
};

export {get};

