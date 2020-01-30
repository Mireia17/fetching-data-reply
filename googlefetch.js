// (GET) the data from GoogleSheetsAPI

const {google} = require('googleapis');
const keys = require('./keys.json');

async function gsrun(cl){ 
    //console.log("Its calling,,.")
    const gsapi = google.sheets({version:'v4', auth: cl}); //here we are connecting with google sheets

    const opt = { 
        spreadsheetId:'14yYJ7AxzXhSviLwbMZkpqfqkFuTrhW3XxEbe7NJssKg',
        range:'Content!A1:B13',
    };

    let data = await gsapi.spreadsheets.values.get(opt); //here instead of the get we could do plenty of other actions such as batch for example
        return data;
//     let dataArray = data.data.values;
//     //console.log(data.data.values[1][1]);

};

exports.fetchGoogle = async () => {
    const client = new google.auth.JWT(
        keys.client_email, 
        null, 
        keys.private_key, 
        ['https://www.googleapis.com/auth/spreadsheets']
    );

    
    const response = await gsrun(client);
        return response.data.values;

   
};


