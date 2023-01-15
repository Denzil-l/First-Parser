const axios = require('axios');
const jsdom = require("jsdom");
const fs = require ('fs')
const {JSDOM} = jsdom;

const dataForParsing = [
// 1 Page
   {
	  linkForParsing: 'https://www.ice.co.il/jobs',
	  numberOfElements: 3, //title, location, description ...id need something else
	  nameOfProperties: ['title', 'loaction', 'description'],
	  GetElem: (dom, ind, j) => {
		 switch (true) {
			case ind === 0:
			   return dom.window.document.getElementsByClassName('details')[j].getElementsByClassName('title')[0].getElementsByTagName('a')[0].textContent
			case ind === 1:
			   return dom.window.document.getElementsByClassName('details')[j].getElementsByClassName('row body')[0].getElementsByClassName('col  col-lg-8')[0].getElementsByClassName('body-row')[1].textContent
			case ind === 2:
			   return dom.window.document.getElementsByClassName('details')[j].getElementsByClassName('positionDescription')[0].textContent
			default:
			   return ''
		 }
	  },
      
	  GetNumbers: (dom) => {
		 return dom.window.document.getElementsByClassName('details').length
	  },
      GetNumberOfPages: () => {
        return 0 
      }
    },
// 1 Page
   {
        linkForParsing: 'https://www.mizrahi-tefahot.co.il/about-mizrahi-tefahot-he/career/open-jobs/',
        numberOfElements: 5,
        nameOfProperties: ['title','loaction','description','inform1','inform2'],
        GetElem: (dom,ind,j)=>{
            switch (true) {
                case ind === 0:
                    return dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem')[j].getElementsByTagName('h3')[0].textContent
                    break;
                case ind === 1:
                    return dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem')[j].getElementsByClassName('jobMeta')[0].getElementsByClassName('location')[0].textContent
                    break;
                case ind === 2:
                    return dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem')[j].getElementsByClassName('jobDescription')[0].textContent
                    break;
                case ind === 3:
                    return dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem')[j].getElementsByClassName('jobMeta')[0].getElementsByClassName('type')[0].textContent
                    break;
                case ind === 4:
                    return dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem')[j].getElementsByClassName('jobDetails collapse')[0].textContent
                    break;
            
                default:
                    return ''
                    break;
            }

        },
        GetNumbers: (dom)=>{
            return dom.window.document.getElementsByClassName('container containerSmall')[1].getElementsByClassName('job filterItem').length
        },
        GetNumberOfPages: () => {
          return 0 
        }
      
    },
// 1 Page
   {
        linkForParsing: 'https://www.payngo.co.il/jobs2',
        numberOfElements: 3,
        nameOfProperties: ['title','loaction','description'],
        GetElem: (dom,ind,j)=>{
            let link = dom.window.document.getElementsByClassName('columns')[0].getElementsByTagName('a')[j+1].textContent
            

            const Parsing = async (element) => {
                const response = await axios.get(element)
                const dom1 = new JSDOM(response.data)

                switch (true) {
                    case ind === 0:
                        return dom1.window.document.getElementsByClassName('H1')[0].textContent
                        break;
                    case ind === 1:
                        return dom1.window.document.getElementsByClassName('location')[0].textContent
                        break;
                    case ind === 2:
                        return dom1.window.document.getElementsByClassName('descript_wrap white-bg')[0].textContent
                        break;
                    default:
                        return ''
                        break;
                }
            }
             return Parsing(link)
            },
        GetNumbers: (dom)=>{
            return dom.window.document.getElementsByClassName('columns')[0].getElementsByTagName('a').length - 1
        },
        GetNumberOfPages: () => {
          return 0 
        }
    },
// The next objects are part of the same site, so they will be very similar
// 1
   {
        linkForParsing: 'https://www.aman.co.il/careers/פיתוח-תוכנה/',
        numberOfElements: 3,
        nameOfProperties: ['title','loaction','description'],
        GetElem: (dom,ind,j)=>{
                switch (true) {
                    case ind === 0:
                        return dom.window.document.getElementsByClassName('positions_page__application')[j].getElementsByClassName('positions_page__application-header-title')[0].textContent
                        break;
                    case ind === 1:
                        return dom.window.document.getElementsByClassName('positions_page__application')[j].getElementsByClassName('aman_careers__location')[0].textContent
                        break;
                    case ind === 2:
                        return dom.window.document.getElementsByClassName('positions_page__application')[j].getElementsByClassName('positions_page__application-content-info')[0].textContent
                        break;
                    default:
                        return ''
                        break;
                }
            
        },
        GetNumbers: (dom)=>{
            return dom.window.document.getElementsByClassName('positions_page__application').length
        },
        GetNumberOfPages: () => {
            let str = 'https://www.aman.co.il/careers/פיתוח-תוכנה/'
            const Parsing1 = async (element) => {  
            const response = await axios.get(element)
            const dom = new JSDOM(response.data)
            const check = dom.window.document.getElementsByClassName('positions_page__content-applications-pagination')[0].textContent
            if(check.length === 37){
                return 0
            }
            else{
                const length = dom.window.document.getElementsByClassName("page-numbers").length
                return (length - 1) 
            }
        }
            return Parsing1(str)
        },
        GetLinkForParsing: (index) =>{
            return `https://www.aman.co.il/careers/פיתוח-תוכנה/page/${index + 1}/`
        }
    },
// 2
   {
        linkForParsing: 'https://www.aman.co.il/careers/bi-big-data-dba/',
        numberOfElements: 3,
        nameOfProperties: ['title','loaction','description'],
        GetElem: (dom,ind,j)=>{
                switch (true) {
                    case ind === 0:
                        return dom.window.document.getElementsByClassName('positions_page__application')[j].getElementsByClassName('positions_page__application-header-title')[0].textContent
                        break;
                    case ind === 1:
                        return dom.window.document.getElementsByClassName('positions_page__application')[j].getElementsByClassName('aman_careers__location')[0].textContent
                        break;
                    case ind === 2:
                        return dom.window.document.getElementsByClassName('positions_page__application')[j].getElementsByClassName('positions_page__application-content-info')[0].textContent
                        break;
                    default:
                        return ''
                        break;
                }
            
        },
        GetNumbers: (dom)=>{
            return dom.window.document.getElementsByClassName('positions_page__application').length
        },
        GetNumberOfPages: () => {
            let str = 'https://www.aman.co.il/careers/bi-big-data-dba/'
            const Parsing1 = async (element) => {  
            const response = await axios.get(element)
            const dom = new JSDOM(response.data)
            const check = dom.window.document.getElementsByClassName('positions_page__content-applications-pagination')[0].textContent
            if(check.length === 37){
                return 0
            }
            else{
                const length = dom.window.document.getElementsByClassName("page-numbers").length
                return (length - 1) 
            }
        }
            return Parsing1(str)
        },
        GetLinkForParsing: (index) =>{
            return `https://www.aman.co.il/careers/bi-big-data-dba/page/${index + 1}/`
        }
    },
// 3
   {
        linkForParsing: 'https://www.aman.co.il/careers/מטה/',
        numberOfElements: 3,
        nameOfProperties: ['title','loaction','description'],
        GetElem: (dom,ind,j)=>{
                switch (true) {
                    case ind === 0:
                        return dom.window.document.getElementsByClassName('positions_page__application')[j].getElementsByClassName('positions_page__application-header-title')[0].textContent
                        break;
                    case ind === 1:
                        return dom.window.document.getElementsByClassName('positions_page__application')[j].getElementsByClassName('aman_careers__location')[0].textContent
                        break;
                    case ind === 2:
                        return dom.window.document.getElementsByClassName('positions_page__application')[j].getElementsByClassName('positions_page__application-content-info')[0].textContent
                        break;
                    default:
                        return ''
                        break;
                }
            
        },
        GetNumbers: (dom)=>{
            return dom.window.document.getElementsByClassName('positions_page__application').length
        },
        GetNumberOfPages: () => {
            let str = 'https://www.aman.co.il/careers/מטה/'
            const Parsing1 = async (element) => {  
            const response = await axios.get(element)
            const dom = new JSDOM(response.data)
            const check = dom.window.document.getElementsByClassName('positions_page__content-applications-pagination')[0].textContent
            if(check.length === 37){
                return 0
            }
            else{
                const length = dom.window.document.getElementsByClassName("page-numbers").length
                return (length - 1) 
            }
        }
            return Parsing1(str)
        },
        GetLinkForParsing: (index) =>{
            return `https://www.aman.co.il/careers/מטה/page/${index + 1}/`
        }
    },
// 4
   {
        linkForParsing: 'https://www.aman.co.il/careers/תשתיות-משרות-סיסטם-devops/',
        numberOfElements: 3,
        nameOfProperties: ['title','loaction','description'],
        GetElem: (dom,ind,j)=>{
                switch (true) {
                    case ind === 0:
                        return dom.window.document.getElementsByClassName('positions_page__application')[j].getElementsByClassName('positions_page__application-header-title')[0].textContent
                        break;
                    case ind === 1:
                        return dom.window.document.getElementsByClassName('positions_page__application')[j].getElementsByClassName('aman_careers__location')[0].textContent
                        break;
                    case ind === 2:
                        return dom.window.document.getElementsByClassName('positions_page__application')[j].getElementsByClassName('positions_page__application-content-info')[0].textContent
                        break;
                    default:
                        return ''
                        break;
                }
            
        },
        GetNumbers: (dom)=>{
            return dom.window.document.getElementsByClassName('positions_page__application').length
        },
        GetNumberOfPages: () => {
            let str = 'https://www.aman.co.il/careers/תשתיות-משרות-סיסטם-devops/'
            const Parsing1 = async (element) => {  
            const response = await axios.get(element)
            const dom = new JSDOM(response.data)
            const check = dom.window.document.getElementsByClassName('positions_page__content-applications-pagination')[0].textContent
            if(check.length === 37){
                return 0
            }
            else{
                const length = dom.window.document.getElementsByClassName("page-numbers").length
                return (length - 1) 
            }
        }
            return Parsing1(str)
        },
        GetLinkForParsing: (index) =>{
            return `https://www.aman.co.il/careers/תשתיות-משרות-סיסטם-devops/page/${index + 1}/`
        }
    },
// 5
   {
        linkForParsing: 'https://www.aman.co.il/careers/ui-ux/',
        numberOfElements: 3,
        nameOfProperties: ['title','loaction','description'],
        GetElem: (dom,ind,j)=>{
                switch (true) {
                    case ind === 0:
                        return dom.window.document.getElementsByClassName('positions_page__application')[j].getElementsByClassName('positions_page__application-header-title')[0].textContent
                        break;
                    case ind === 1:
                        return dom.window.document.getElementsByClassName('positions_page__application')[j].getElementsByClassName('aman_careers__location')[0].textContent
                        break;
                    case ind === 2:
                        return dom.window.document.getElementsByClassName('positions_page__application')[j].getElementsByClassName('positions_page__application-content-info')[0].textContent
                        break;
                    default:
                        return ''
                        break;
                }
            
        },
        GetNumbers: (dom)=>{
            return dom.window.document.getElementsByClassName('positions_page__application').length
        },
        GetNumberOfPages: () => {
            let str = 'https://www.aman.co.il/careers/ui-ux/'
            const Parsing1 = async (element) => {  
            const response = await axios.get(element)
            const dom = new JSDOM(response.data)
            const check = dom.window.document.getElementsByClassName('positions_page__content-applications-pagination')[0].textContent
            if(check.length === 37){
                return 0
            }
            else{
                const length = dom.window.document.getElementsByClassName("page-numbers").length
                return (length - 1) 
            }
        }
            return Parsing1(str)
        },
        GetLinkForParsing: (index) =>{
            return `https://www.aman.co.il/careers/ui-ux/page/${index + 1}/`
        }
    },
// 6
   {
        linkForParsing: 'https://www.aman.co.il/careers/בדיקות-תוכנה-qa/',
        numberOfElements: 3,
        nameOfProperties: ['title','loaction','description'],
        GetElem: (dom,ind,j)=>{
                switch (true) {
                    case ind === 0:
                        return dom.window.document.getElementsByClassName('positions_page__application')[j].getElementsByClassName('positions_page__application-header-title')[0].textContent
                        break;
                    case ind === 1:
                        return dom.window.document.getElementsByClassName('positions_page__application')[j].getElementsByClassName('aman_careers__location')[0].textContent
                        break;
                    case ind === 2:
                        return dom.window.document.getElementsByClassName('positions_page__application')[j].getElementsByClassName('positions_page__application-content-info')[0].textContent
                        break;
                    default:
                        return ''
                        break;
                }
            
        },
        GetNumbers: (dom)=>{
            return dom.window.document.getElementsByClassName('positions_page__application').length
        },
        GetNumberOfPages: () => {
            let str = 'https://www.aman.co.il/careers/בדיקות-תוכנה-qa/'
            const Parsing1 = async (element) => {  
            const response = await axios.get(element)
            const dom = new JSDOM(response.data)
            const check = dom.window.document.getElementsByClassName('positions_page__content-applications-pagination')[0].textContent
            if(check.length === 37){
                return 0
            }
            else{
                const length = dom.window.document.getElementsByClassName("page-numbers").length
                return (length - 1) 
            }
        }
            return Parsing1(str)
        },
        GetLinkForParsing: (index) =>{
            return `https://www.aman.co.il/careers/בדיקות-תוכנה-qa/page/${index + 1}/`
        }
    },
// 7
   {
        linkForParsing: 'https://www.aman.co.il/careers/מערכות-מידע/',
        numberOfElements: 3,
        nameOfProperties: ['title','loaction','description'],
        GetElem: (dom,ind,j)=>{
                switch (true) {
                    case ind === 0:
                        return dom.window.document.getElementsByClassName('positions_page__application')[j].getElementsByClassName('positions_page__application-header-title')[0].textContent
                        break;
                    case ind === 1:
                        return dom.window.document.getElementsByClassName('positions_page__application')[j].getElementsByClassName('aman_careers__location')[0].textContent
                        break;
                    case ind === 2:
                        return dom.window.document.getElementsByClassName('positions_page__application')[j].getElementsByClassName('positions_page__application-content-info')[0].textContent
                        break;
                    default:
                        return ''
                        break;
                }
            
        },
        GetNumbers: (dom)=>{
            return dom.window.document.getElementsByClassName('positions_page__application').length
        },
        GetNumberOfPages: () => {
            let str = 'https://www.aman.co.il/careers/מערכות-מידע/'
            const Parsing1 = async (element) => {  
            const response = await axios.get(element)
            const dom = new JSDOM(response.data)
            const check = dom.window.document.getElementsByClassName('positions_page__content-applications-pagination')[0].textContent
            if(check.length === 37){
                return 0
            }
            else{
                const length = dom.window.document.getElementsByClassName("page-numbers").length
                return (length - 1) 
            }
        }
            return Parsing1(str)
        },
        GetLinkForParsing: (index) =>{
            return `https://www.aman.co.il/careers/מערכות-מידע/page/${index + 1}/`
        }
    },
// 8
   {
        linkForParsing: 'https://www.aman.co.il/careers/אבטחת-מידע-וסייבר/',
        numberOfElements: 3,
        nameOfProperties: ['title','loaction','description'],
        GetElem: (dom,ind,j)=>{
                switch (true) {
                    case ind === 0:
                        return dom.window.document.getElementsByClassName('positions_page__application')[j].getElementsByClassName('positions_page__application-header-title')[0].textContent
                        break;
                    case ind === 1:
                        return dom.window.document.getElementsByClassName('positions_page__application')[j].getElementsByClassName('aman_careers__location')[0].textContent
                        break;
                    case ind === 2:
                        return dom.window.document.getElementsByClassName('positions_page__application')[j].getElementsByClassName('positions_page__application-content-info')[0].textContent
                        break;
                    default:
                        return ''
                        break;
                }
            
        },
        GetNumbers: (dom)=>{
            return dom.window.document.getElementsByClassName('positions_page__application').length
        },
        GetNumberOfPages: () => {
            let str = 'https://www.aman.co.il/careers/אבטחת-מידע-וסייבר/'
            const Parsing1 = async (element) => {  
            const response = await axios.get(element)
            const dom = new JSDOM(response.data)
            const check = dom.window.document.getElementsByClassName('positions_page__content-applications-pagination')[0].textContent
            if(check.length === 37){
                return 0
            }
            else{
                const length = dom.window.document.getElementsByClassName("page-numbers").length
                return (length - 1) 
            }
        }
            return Parsing1(str)
        },
        GetLinkForParsing: (index) =>{
            return `https://www.aman.co.il/careers/אבטחת-מידע-וסייבר/page/${index + 1}/`
        }
    },
//The End this web site
// 1 Page
   {
    linkForParsing: 'http://www.polycad.co.il/he/jobs',
    numberOfElements: 1, //title, location, description ...id need something else
    nameOfProperties: ['big description'],
    GetElem: (dom, ind, j) => {
       const length = dom.window.document.getElementsByClassName('spage clear opage-inner').length
       let index = -1
       for (let i = 0; i < length; i++) {
        let str = dom.window.document.getElementsByClassName('spage clear opage-inner')[i].textContent     
        let search = str.indexOf('משרות')   
        if(search !== -1){
            index = i
        }
       }
       
       switch (true) {
          case ind === 0:
             return dom.window.document.getElementsByClassName('spage clear opage-inner')[index].getElementsByClassName('contentside')[0].textContent
          default:
             return ''
       }
    },
    GetNumbers: (dom) => {
       return 1
    },
    GetNumberOfPages: () => {
      return 0 
    }
    },


]
let array = []
const RemoveTags = (body) => {
   let regexp = /\n/g;
   return result = body.replace(regexp, '.')
}
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------

const Start = async () => {
   for (let i = 0; i < dataForParsing.length; i++) {
    console.log(`Web Site number ${i}`)
	  array[i] = await Parsing(i)
   }
   console.log(array)
let str = JSON.stringify({array})
fs.writeFileSync('result.json',str)
}

//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------

const Parsing = async (element) => {
    const numberOfPages =  await dataForParsing[element].GetNumberOfPages()

   if(numberOfPages === 0){
    const response = await axios.get(dataForParsing[element].linkForParsing)
    const dom = new JSDOM(response.data)
   const length = dataForParsing[element].GetNumbers(dom)
   let newJson = []
   for (let j = 0; j < length; j++) {
	  newJson[j] = {}
	  for (let ind = 0; ind < dataForParsing[element].numberOfElements; ind++) {
		 newJson[j][dataForParsing[element].nameOfProperties[ind]] = RemoveTags( await dataForParsing[element].GetElem(dom, ind, j))
	  }
      newJson[j].URL = dataForParsing[element].linkForParsing
   }

   return newJson
}
else{
    let index = 0
    let newJson = []
    for (let y = 0; y < numberOfPages; y++) {

        const response = await axios.get(dataForParsing[element].GetLinkForParsing(y))
        const dom = new JSDOM(response.data)
        const length = dataForParsing[element].GetNumbers(dom)
        for (let j = 0; j < length; j++) {
            newJson[index] = {}
            for (let ind = 0; ind < dataForParsing[element].numberOfElements; ind++) {
               newJson[index][dataForParsing[element].nameOfProperties[ind]] = RemoveTags( await dataForParsing[element].GetElem(dom, ind, j))
            }
            newJson[index].URL = dataForParsing[element].linkForParsing
            index++
         }
    }
    return newJson
}
}

Start()























