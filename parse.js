
const axios = require('axios');
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const baseLink = 'https://www.mizrahi-tefahot.co.il/about-mizrahi-tefahot-he/career/open-jobs/';



const RemoveTags = (body) => {
    let regexp = /\n/g;
   return result = body.replace(regexp,'')
}
const RemoveTags2 = (body) => {
    let regexp = /\n/g;
    let str = body.replace('תיאור המשרה','').split('דרישות')

    return result =[str[0].replace(regexp,''),str[1]]
    

}
function MainFunction() {
    console.log('request for information via link: ' + baseLink +'\n');
    axios.get(baseLink) //Here we send a GET request on the link
        .then(response => {
            var currentPage = response.data; //Here we write result(all html code)
            const dom = new JSDOM(currentPage); //Сonnect the DOM module for more familiar work

            const howMany = dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem').length

            console.log(`We have ${howMany} vacancies\n`)
            let newJson = []
            for (let i = 0; i < howMany; i++) {
                newJson[i] = {}

                let title = dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem')[i].getElementsByTagName('h3')[0].textContent
                newJson[i].title = title

                
                let location = dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem')[i].getElementsByClassName('jobMeta')[0].getElementsByClassName('location')[0].textContent
                newJson[i].location = location

                
                let atributes = dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem')[i].getElementsByClassName('jobMeta')[0].getElementsByClassName('type')[0].textContent
                newJson[i].atributes = atributes

                let description = dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem')[i].getElementsByClassName('jobDescription')[0].textContent
                newJson[i].description = RemoveTags(description)
             
             
                let description2 = dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem')[i].getElementsByClassName('jobDetails collapse')[0].textContent
                newJson[i].description2 = RemoveTags2(description2)
                
            
            console.log(i)
            console.log(newJson[i])
            let str = JSON.stringify({newJson})
               fs.writeFileSync('text.json',str)
            }
        });
};
MainFunction()
// let x = JSON.parse(fs.readFileSync('text.json'));
// console.log(x.description2)
