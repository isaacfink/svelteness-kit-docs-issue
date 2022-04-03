
export function sequelPayConfigure(handleSubmit){
    CollectJS.configure({
        // Note: The following is not required and you can instead call manually `CollectJS.startPaymentRequest()`
        // Default value is #payButton
        // NOTE: You need to include the # sign
        fields: {
            ccnumber: {
                selector: "#creditCardNumber", // Or whatever the id is
                title: "Card Number", // The html title attribute value for the input field
                placeholder: "0000 0000 0000 0000" // The html title attribute value for the input field
            },
            ccexp: {
                selector: "#creditCardExpiryDate", // Or whatever the id is
                title: "Exp. Date",
                placeholder: "MM / YY"
            },
            cvv: {
                selector: "#creditCardCvv", // Or whatever the id is
                title: "Security Code",
                placeholder: "***"
            },
            cardname: {
                selector: "#creditCardName", // Or whatever the id is
                title: "Name on card",
                placeholder: "Name On Card"
            }
        },
        
        timeoutDuration: 3000, // Optional timeout in milliseconds after which if the fields/iframes are not loaded it calls the callback specified in `timeoutCallback`
        timeoutCallback: showTimeoutError,
        validationCallback: validateFields, // Optional callback described in section D "Validation Callback" above
        fieldsAvailableCallback: fieldsPopulated, // Optional callback when the fields/iframes are finished loading
        callback: handleSubmit, // Callback described in section C "Callback"
        stylesheet:'http://127.0.0.1:3000/styles/collect.css'
    });
}

function showTimeoutError(){
    if(window){
        console.error("Timeout error!!!");
    }
}

function validateFields(field, status, message) {
    if (status) return;
        switch (field) {
            case "ccnumber": 
                alert("The CC number is invalid"); 
                break;
            case "ccexp": 
                alert("The exp date is invalid"); 
                break;
            case "cvv": 
                alert("The CVV is invalid"); 
                break;
            case "cardname": 
                alert("The card name is invalid"); 
                break;
        }
    }

function fieldsPopulated(){
    console.log("Fields populated");
}
