//import { getOptions } from 'loader-utils';
//import validateOptions from 'schema-utils';

var startstr = '//#ifdef';
var startstr_n = '//#ifndef';
var endstr   = '//#endif';
var agent    =  global.jhyconfig.agent;


//endstr = endstr.replace(/\//g,'\\\\/');

module.exports = function(source) {
  var returnstr = '';
  var deletestr = '';
  var _len = source.length;
  var flag_e_len = endstr.length;
  var flag_s_len = startstr.length;
  var flag_sn_len = startstr_n.length;

  var st = 0,en = 0;
  while(st < _len){

    
    var startparamstr = '';
    var newstobj = [];
    newstobj[0] = {start:source.indexOf(startstr_n, st),val:startstr_n};
    newstobj[1] = {start:source.indexOf(startstr, st),val:startstr};

    var newst = -1;
    var item = startstr_n;

    for(var i in newstobj){//console.log(newstobj[i].start);
      if(newstobj[i].start >= 0){
        if(newstobj[i].start < newst || newst == -1){
          newst = newstobj[i].start;
          item  = newstobj[i].val;
        }
      }
    }

    /*
    if(newst<0){
      newst = newst2;
      item = startstr;
    }else{
      if(newst2 < 0){

      }else{
        if(newst > newst2){
          newst = newst2;
          item = startstr;
        }

      }
    }

    */
    if(newst !== -1){
      returnstr += source.substr(st, newst-st);
      en = source.indexOf(endstr, newst);
      startparamstr = '';
      var i = newst + flag_s_len;
      while((_c = source.substr(i, 1)) != "\n" && i< _len){
        if(_c != "\r")
          startparamstr += _c;
        i++;
      }
      var _str = source.substr(i, en-i);

      var paramArr = startparamstr.trim().split(/\s+|,/);
      if(item == startstr &&  (paramArr.indexOf(agent) !== -1)){
       // console.log('sfffffffff');
        returnstr += _str;
      }else if(item == startstr_n && (paramArr.indexOf(agent) === -1)){
        returnstr += _str; 
        // console.log('sssssssssssssssss');
      }
      st = en + flag_e_len;
      // console.log(st);
      // console.log( paramArr,agent, item == startstr, (paramArr.indexOf(agent)));
    }else{
      returnstr += source.substr(st);//if(st>0)console.log(source.substr(st, 100));
      // console.log('e_'+st);
      break;
    }

    


  }







  // return source;
  return returnstr;



/*

  //const options = getOptions(this);

  //validateOptions(schema, options, 'Example Loader');
  var str = startstr+"[\\s]+"+agent+"[\\s\\S]*?"+endstr;
  var str_n = startstr_n + "[\\s]+" + "(?!"+agent+")" + "[\\s\\S]*?"+endstr;
  var reg = new RegExp(str_n, 'gi');
  //console.log(str_n);

  var arr = reg.exec(source);
  while(arr){
    // console.log(arr[0]);
    arr=reg.exec(source);
    
  }

  source = source.replace(reg, "\n");
  source = source.replace(new RegExp(str, 'gi'),"\n");

  // 对资源应用一些转换……
  //console.log(agent);
  return source ;
  */
};