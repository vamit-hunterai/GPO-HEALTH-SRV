var config = require('../../config/common').config;
const searchService = require('../../services/searchService');
const searchCountService = require('../../services/searchCountService');
const utilService = require('../../services/utilService');

module.exports = {
    /**
     * params: {obj} 
     * */
     search: async(request, response)=>{
        try{
            let resp;
            switch(request.query.type){
                case 'resources': resp = searchService.resources(request.query); break;
                case 'commercials': resp = searchService.commercials(request.query); break;
                case 'milestones': resp = searchService.milestones(request.query); break;
                case 'contacts': resp = searchService.contacts(request.query); break;
                //case 'invoices': resp = searchService.invoices(request.query); break;  
                case 'invoices': resp = searchService.invoiceDetails(request.query); break;   
                case 'ap-details': resp = searchService.apDetails(request.query); break; 
                case 'po-details': resp = searchService.poDetails(request.query); break; 
                case 'customers': resp = searchService.customers(request.query); break; 
                case 'po-invoices': resp = searchService.poInvoices(request.query); break; 
                case 'invoice-pdf': resp = searchService.invoicePDFs(request.query); break; 
                case 'data-quality': resp = searchService.dataQuality(request.query); break;
                case 'insights': resp = await searchService.insights(request.query); break; 
                case 'customer-folders': resp = searchService.s3Folders(request.query); break;
                default: resp = searchService.poDetails(request.query);
            }
            // console.log(resp)
            if(resp && request.query.type!='insights'){
                resp.then((dat)=>{
                    response.render(utilService.flattenJSON(dat));
                })
            }else if(resp && request.query.type=='insights'){
                response.render(utilService.flattenJSON(resp));
            }
            
            
        }catch(err){
            console.log(err);
            response.render([],err,err.toString());
        }
    },
    apDetails: async(req,resp)=>{
        searchService.apDetails(req.query).then((res)=>
        {
            console.log(res);
            resp.render(utilService.flattenJSON(res))
        })
    },
    searchCount: async(request, response)=>{
        try{
            let resp;

            switch(request.body.type){
                case 'resources': resp = searchCountService.resources(request.body.params); break;
                case 'commercials': resp = searchCountService.commercials(request.body.params); break;
                case 'milestones': resp = searchCountService.milestones(request.body.params); break;
                case 'contacts': resp = searchCountService.contacts(request.body.params); break;
                case 'invoices': request.body.type = "Invoice"; resp = searchCountService.counts(request.body); break;   
                case 'ap-details': request.body.type = "AP"; resp = searchCountService.counts(request.body); break;  
                case 'po-details': request.body.type = "PO"; resp = searchCountService.counts(request.body); break; 
                case 'po-invoices': request.body.type = "PO-INVOICES"; resp = searchCountService.counts(request.body); break;   
                
            }
            // console.log(resp)
            if(resp){
                resp.then((dat)=>{
                    console.log(dat)
                    response.render(dat);
                })
            }
        }catch(err){
            // console.log(err);
            response.render([],err,err.toString());
        }
    },
    sow: async(request, response)=>{
        try{
            //console.log(request.params)
            var promises = [], items = ['resources','commercials','milestones', 'contacts','deliverables'];
            promises.push(searchService.resources({NumberSOW:request.params.numberSow}));
            promises.push(searchService.commercials({NumberSOW:request.params.numberSow}));
            promises.push(searchService.milestones({NumberSOW:request.params.numberSow}));
            promises.push(searchService.contacts({NumberSOW:request.params.numberSow}));
            promises.push(searchService.deliverables({NumberSOW:request.params.numberSow}));

            Promise.all(promises).then((dat)=>{
                var finalResp = {sow:request.params.numberSow};
                dat.forEach((val, ind)=>{
                    if(items[ind]=='deliverables'){
                        console.log(val)
                    finalResp[items[ind]] = val ;
                    }else
                    finalResp[items[ind]] = val && val.length>0?utilService.flattenJSON(val[0])[0]:{};
                })
                response.render(finalResp);
            });
 
        }catch(err){
            console.log(err);
            response.render([],err,err.toString());
        }
    },
    autoSuggest: async(request, response)=>{
        try{
            searchService.autoSuggest(request.params.sow).then((dat)=>{
               // console.log(dat)
                response.render(dat);
            });
 
        }catch(err){
            console.log(err);
            response.render([],err,err.toString());
        }
    },
    sowInvoiceGraph: async(request, response)=>{
        //var promises = [];
        // promises.push(searchService.sowGraph());
        // promises.push(searchService.invoiceGraph())
        // Promise.all(promises).then((dat)=>{
        //     response.render(dat);
        // });
        var periods = utilService.getTimePeriod(request.query.period);
        //console.log(periods)
        searchService.sowGraph().then((dat)=>{
                dat = utilService.datesArrToObj(dat);
               var retObj = {
                   series:[],
                   xaxis: periods
               }
               //console.log(dat)
               var _tmp = {name:"SOW",data:[]};
               for(var i in periods){
                    if(dat.hasOwnProperty(periods[i]))
                     _tmp.data.push(dat[periods[i]])   
                    else 
                    _tmp.data.push(0)  
               }
               retObj.series.push(_tmp);
               searchService.invoiceGraph().then((dat2)=>{
                   console.log(dat2)
                dat2 = utilService.datesArrToObj(dat2);
                _tmp = {name:"Invoices",data:[]};
                for(var i in periods){
                    if(dat2.hasOwnProperty(periods[i]))
                     _tmp.data.push(dat2[periods[i]])   
                    else 
                    _tmp.data.push(0)  
                 }
                retObj.series.push(_tmp);
                response.render(retObj);
              });
        });
    },
    roles: async(request, response)=>{
        try{
            searchService.roles().then((dat)=>{
                response.render(dat);
            });
 
        }catch(err){
            console.log(err);
            response.render([],err,err.toString());
        }
    },
    suppliers: async(request, response)=>{
        try{
            searchService.suppliers(request.query).then((dat)=>{
                response.render(dat);
            });
 
        }catch(err){
            console.log(err);
            response.render([],err,err.toString());
        }
    },
    searchSimilar: async(request, response)=>{
        try{
            searchService.searchSimilar(request.params.sow).then(function(dat){
                response.render(dat);
            });
        }catch(err){
            console.log(err);
            response.render([],err,err.toString());
        }
    },
    locations: async(request, response)=>{
        try{
            searchService.locations().then((dat)=>{
                response.render(dat);
            });
 
        }catch(err){
            console.log(err);
            response.render([],err,err.toString());
        }
    },
    techStack: async(request, response)=>{
        try{
            searchService.techStack().then((dat)=>{
                response.render(dat);
            });
 
        }catch(err){
            console.log(err);
            response.render([],err,err.toString());
        }
    },
    getFullList: async(request, response)=>{
        try{
            searchService.getFullList(request.params?request.params.type:'sow').then((dat)=>{
                response.render(dat);
            });
 
        }catch(err){
            console.log(err);
            response.render([],err,err.toString());
        }
    },
    engagements: async(request, response)=>{
        try{
            searchService.engagements().then((dat)=>{
                response.render(dat);
            });
 
        }catch(err){
            console.log(err);
            response.render([],err,err.toString());
        }
    }
}