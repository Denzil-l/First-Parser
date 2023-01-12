
const axios = require('axios');
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dataForParsing = [
    {
        linkForParsing: 'https://www.ice.co.il/jobs',
        numberOfElements: 3, //title, location, description ...id need something else
        numberOfPages:0,
        nameOfProperties: ['title','loaction','description'],
        GetElem: (dom,ind,j)=>{
            switch (true) {
                case ind === 0:
                    return dom.window.document.getElementsByClassName('details')[j].getElementsByClassName('title')[0].getElementsByTagName('a')[0].textContent
                    break;
                case ind === 1:
                    return dom.window.document.getElementsByClassName('details')[j].getElementsByClassName('row body')[0].getElementsByClassName('col  col-lg-8')[0].getElementsByClassName('body-row')[1].textContent
                    break;
                case ind === 2:
                    return dom.window.document.getElementsByClassName('details')[j].getElementsByClassName('positionDescription')[0].textContent
                    break;
            
                default:
                    return ''
                    break;
            }

        },
        GetNumbers: (dom)=>{
            return dom.window.document.getElementsByClassName('details').length
        }
    },
    // {
    //     linkForParsing: 'https://www.mizrahi-tefahot.co.il/about-mizrahi-tefahot-he/career/open-jobs/',
    //     numberOfElements: 5,
    //     numberOfPages:0,
    //     nameOfProperties: ['title','loaction','description','inform1','inform2'],
    //     GetElem: (dom,ind,j)=>{
    //         switch (true) {
    //             case ind === 0:
    //                 return dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem')[j].getElementsByTagName('h3')[0].textContent
    //                 break;
    //             case ind === 1:
    //                 return dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem')[j].getElementsByClassName('jobMeta')[0].getElementsByClassName('location')[0].textContent
    //                 break;
    //             case ind === 2:
    //                 return dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem')[j].getElementsByClassName('jobDescription')[0].textContent
    //                 break;
    //             case ind === 3:
    //                 return dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem')[j].getElementsByClassName('jobMeta')[0].getElementsByClassName('type')[0].textContent
    //                 break;
    //             case ind === 4:
    //                 return dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem')[j].getElementsByClassName('jobDetails collapse')[0].textContent
    //                 break;
            
    //             default:
    //                 return ''
    //                 break;
    //         }

    //     },
    //     GetNumbers: (dom)=>{
    //         return dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem').length
    //     }
      
    // },
]
let array = []
const RemoveTags = (body) => {
    let regexp = /\n/g;
   return result = body.replace(regexp,'')
}

const Start = () => {
    for (let i = 0; i < dataForParsing.length; i++) {
         array[i] = Parsing(i)
         console.log(array[i])
    }
   
    
}
const Parsing = (i) => {

    //Preparation for work

    console.log('request for information via link: ' + dataForParsing[i].linkForParsing +'\n');
    axios.get(dataForParsing[i].linkForParsing) //Here we send a GET request on the link
        .then(response => {
            var currentPage = response.data; //Here we write result(all html code)
            const dom = new JSDOM(currentPage); //Сonnect the DOM module for more familiar work
            const length = dataForParsing[i].GetNumbers(dom)
            console.log(length)

            let newJson = []
    
    // Parsing start
    
            for (let j = 0; j < length; j++) {
                newJson[j] = {}
                for (let ind = 0; ind < dataForParsing[i].numberOfElements; ind++) {
                    newJson[j][dataForParsing[i].nameOfProperties[ind]] = RemoveTags(dataForParsing[i].GetElem(dom,ind,j))
                }
            }
            console.log(newJson)
            return newJson

        });
};
Start()





