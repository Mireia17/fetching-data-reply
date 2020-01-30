const google = require('./googlefetch.js');

const reply = require('./replyfetch');
const axios = require('axios');

const headers = {
    Authorization: ''
}

const url = 'https://www.reply.ai/api/v1/content/';

(async () => {

    const googledata = await google.fetchGoogle();
    // console.log(googledata);
    const apidatareply = await reply.replyFetch();
    const apidata = apidatareply.data.results;

    const newdata = [];

        apidata.map(item => {
            const match = googledata.find(function(element) { 
                return item.name === element[0]; 
            }); 

            if (match && item.value != match[1]) { 
                item.value = match[1];
            }
       
        newdata.push(item);
        
    });

        console.log(newdata);
    
    newdata.forEach(element => {
            
        const options = { 

            method: 'PUT',
            headers: { 
                'content-type': 'application/json',
                'Authorization': ''
            },
            data: {
                "content_value": element.value
            },
            url: url + element.name + '.json'
                
        };

        axios(options).then(response => {
            console.log(response);
                
        }).catch(err =>{
            console.log('error');
            console.log(err);
                        
                    })
        });

     
 })();





