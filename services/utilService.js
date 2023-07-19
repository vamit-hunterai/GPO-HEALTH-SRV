module.exports = {
    getTimePeriod(period){
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        var today = new Date(),d,month,year, finalArr=[];
        
        for(var i = period?period:6; i > 0; i -= 1) {
          d = new Date(today.getFullYear(), today.getMonth() - i, 1);
          month = monthNames[d.getMonth()];
          year = d.getFullYear().toString().substr(2,2);
          finalArr.push(month+' '+year)
        }
        return finalArr;
    },
    datesArrToObj(arr){
        let obj = {}
        for(var i in arr){
            obj[arr[i].month] =arr[i].count;
        }
        return obj;
    },
    flattenJSON(arr){
        let finalArr = [], _tmpObj ={};
        try{
        if(arr.recordset) return arr.recordset;
        for(var i in arr){
            _tmpObj= JSON.parse(JSON.stringify(arr[i]));
            if(arr[i].hasOwnProperty('SowMaster')){
                _tmpObj = Object.assign({}, _tmpObj, _tmpObj.SowMaster);
                if(_tmpObj.SowMaster && _tmpObj.SowMaster.SowPricing){
                    _tmpObj = Object.assign({}, _tmpObj, _tmpObj.SowMaster.SowPricing);
                    delete _tmpObj.SowPricing;
                }
                delete _tmpObj.SowMaster;
            }
            if(arr[i].hasOwnProperty('InvoiceDetail')){
                _tmpObj = Object.assign({}, _tmpObj, _tmpObj.InvoiceDetail);
                delete _tmpObj.InvoiceDetail;
            }
            //console.log(_tmpObj)
            finalArr.push(_tmpObj);
        }
        }catch(e){console.log(e)}
        return finalArr;
    }
}