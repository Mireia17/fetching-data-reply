const google = require('./googlefetch.js');

const axios = require('axios');

const headers = {
    Authorization: 'Token c61c8933eaf4256e6a950a93701e724d0a15950a'
}

const url = 'https://www.reply.ai/api/v1/content/';
const getUrl = 'https://www.reply.ai/api/v1/contents.json';


function getAllData() {
    const data = []; 
    let numPage = 1;

    const getData = function(numPage) {
       
        return axios.get(getUrl + '?page=' + numPage , { headers }).then(response => {
            

            response.data.results.map(result => {
                data.push(result);
                //console.log(result);
            });
           
            if (response.data.next) {
                numPage ++;
                return getData(numPage);
            } else {
                return data; 
            }
        });
    }

    return getData(numPage).then(function(result) {
        return result;
    })
    .catch(function(error) {
        console.error(error);
    })
}

(async () => {

    const googledata = await google.fetchGoogle();
    // console.log(googledata);
    const apidata = await getAllData();
    
    const newdata = [];

        apidata.map(item => { //map trough the items 
            const match = googledata.find(function(element) { 
                return item.name === element[0]; //compare two value_names
        
            }); 
         
            if (match && item.value != match[1]) { 
                item.value = match[1]; // if they don't match substitute them
            }
       
        newdata.push(item);
        
    });

  
    
    newdata.forEach(element => {
        
        const options = { 

            method: 'PUT',
            headers: { 
                'content-type': 'application/json',
                'Authorization': 'Token c61c8933eaf4256e6a950a93701e724d0a15950a'
                
            },
            data: {
                "content_value": element.value
            },
            url: url + element.name + '.json'
                
        };


        axios(options).then(response => {
            return response;
                
        }).catch(err =>{
            console.log('error');
            console.log(err);
        })

  
    });

     
 })();

 