
const axios = require('axios');
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const baseLink = 'https://www.mizrahi-tefahot.co.il/about-mizrahi-tefahot-he/career/open-jobs/';


const GetStr = (leftTag, rightTag, body) => {
    let x = leftTag.length
    let xIND = body.indexOf(leftTag)
    const str1 = body.substring(x+xIND,body.length);
    let y = str1.indexOf(rightTag)
    const str2 = str1.substring(0,y)
    const result = str2
    return result
}
// const GetDescription2 = (body,dom,ind) => {
//     const tags = ['<p>','</p>','<br>','<div>','</div>','<span>','</span>','&nbsp','<strong>','</strong>','<li>','</li>']
// let check = dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem')[ind].getElementsByClassName('jobDetails collapse')[0].getElementsByTagName('ul').length
// if(check !== 0){
//     let str =''

// for (let i = 0; i < body.length; i++) {
//     let x = body[i].outerHTML
//     let y = x.replace('<p>','')
//     let z = y.replace('</p>','')
//     str+=z
// }

// while(str.indexOf('<strong>') !== -1){
//     let x = str.replace('<strong>','.')
//     str = x.replace('</strong>','')
    
// }

// for (let i = 0; i < tags.length; i++) {
//     while (str.indexOf(tags[i]) !== -1) {
//      let x = str.replace(tags[i],'')
//      str = x
//     }
//  }
//  let list = dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem')[ind].getElementsByClassName('jobDetails collapse')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')
//  let length = list.length
//  let newList = []
//  for (let i = 0; i < length; i++) {
//     let x = list[i].outerHTML
//     for (let j = 0; j < tags.length; j++) {
//         while (x.indexOf(tags[j]) !== -1) {
//             let y = x.replace(tags[j],'')
//             x = y
//             newList[i] = ConvertToHebrew(x)
//            }
//     }
  
    
//  }
 
// for (let i = 0; i < tags.length; i++) {
    
//  }
//  let str2 = str.replace('.דרישות','')
//  return obj = {
//     bigDescription: ConvertToHebrew(str2),
//     requirements: newList
// }

// }else{
//     let str =''

//     for (let i = 0; i < body.length; i++) {
//         let x = body[i].outerHTML
//         let y = x.replace('<p>','')
//         let z = y.replace('</p>','')
//         str+=z
//     }
//  let list = str.split('דרישות')
//  str = list[0]

//  for (let i = 0; i < tags.length; i++) {
//     while (str.indexOf(tags[i]) !== -1) {
//      let x = str.replace(tags[i],'')
//      str = x
//     }
//  }
//  let list1 = list[1].replace('</strong>','')

//  let newlist = []
//  let i = 0
//  while (list1.indexOf('<br>' !== -1)) {
        
//         let ind2 = list1.indexOf('<br>- ')
//         let index = -100
//         let x = ''
//         if(ind2 !== -1){
//             x = list1.replace('<br>- ','')
//             index = x.indexOf('<br>')

//         }else{
//             x = list1.replace('<br>','')
//             index = x.indexOf('<br>')
//         }


//         if(index !== -1){
//             let y = x.substring(0,index)
//             for (let j = 0; j < tags.length; j++) {
//                 while (y.indexOf(tags[j]) !== -1) {
//                  let z = y.replace(tags[j],'')
//                  y = z

//                 }
//                 newlist[i] = ConvertToHebrew(y)

//              }

//             i++

//             list1 = x.replace(y,'')
      

//         }
//         else{
//             newlist[i] = ConvertToHebrew(x)
//             return obj ={
//                 bigDescription: ConvertToHebrew(str),
//                 requirements: newlist
//              }        
//             }
//     }
   
//  }
//  return obj ={
//     bigDescription: ConvertToHebrew(str),
//     requirements: newlist
//  }
// }
const GetDescription2 = (body) => {

}
const GetDescription = (body,ind,dom) => {
    const tags = ['<p>','</p>','<br>','<div>','</div>','<span>','</span>','&nbsp']
    const check = body.indexOf('<span>')
    if(check === -1){
        let str1 = body.split('<div class="jobDescription">')
        let str2 = str1[1].split('</div>')
        let str3 = str2[0]
        for (let i = 0; i < tags.length; i++) {
           while (str3.indexOf(tags[i]) !== -1) {
            let x = str3.replace(tags[i],'')
            str3 = x
           }
        }
        let regexp = /\n/g;
        let str4 = str3.replace(regexp,'')
         return str4

    }
    else{

        let length = dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem')[ind].getElementsByClassName('jobDescription')[0].getElementsByTagName('span').length

        let str = ''
        for (let i = 0; i < length; i++) {
            let description = dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem')[1].getElementsByClassName('jobDescription')[0].getElementsByTagName('span')[i].outerHTML

            let x = description.replace('<span>','')
            let y = x.replace('</span>','')
            str+=y
        }
        while(str.indexOf('&nbsp') !== -1){
            let z = str.replace('&nbsp',' ')
            str = z
        }
        while(str.indexOf(';') !== -1){
            let z = str.replace(';','')
            str = z
        }
        return str       
    }
}
const ConvertToHebrew = (str) =>{
    let y =''
   for (let i = str.length -1; i > -1; i--) {
    y += str[i]
    
   }
    return y
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
            for (let i = 0; i < 1; i++) {
                newJson[i] = {}

                let title = dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem')[i].getElementsByTagName('h3')[0].outerHTML
                newJson[i].title = ConvertToHebrew(GetStr('<h3>', '</h3>', title))

                
                let location = dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem')[i].getElementsByClassName('jobMeta')[0].getElementsByClassName('location')[0].outerHTML
                newJson[i].location = ConvertToHebrew(GetStr(`alt="מיקום המשרה">`,`</`,location))

                
                let atributes = dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem')[i].getElementsByClassName('jobMeta')[0].getElementsByClassName('type')[0].outerHTML
                newJson[i].atributes = ConvertToHebrew(GetStr(`alt="היקף משרה">`,`</`,atributes))

                let description = dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem')[i].getElementsByClassName('jobDescription')[0].outerHTML
                newJson[i].description = ConvertToHebrew(GetDescription(description,i,dom))
             
             
                let description2 = dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem')[i].getElementsByClassName('jobDetails collapse')[0].textContent
                // newJson[i].description2 = GetDescription2(description2)
                // newJson[i].description2 = GetDescription2(description2,dom,i)
            //  console.log(newJson[i])
            let obj = {
                x:description2
            }
            console.log(i)
            console.log(obj)
               

            }
        });
};
MainFunction()
