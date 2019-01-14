let _api = {};

//------请求----------------------------------
//
_api.axios = function(url, config){
  defaultconfig = {
    data : {},
    header : {},
    shwloading  : true

  };

  if(config.shwloading === true){
    _api.loadingShow();
  }

  axios({
    method: config.method ,
    url: url,
    data: config.data,
    success: function(data, textStatus, xhr){
      if(typeof config.success == 'function'){
        config.success(data, textStatus,xxx);
      }
      if(typeof config.complete  == 'function'){
        config.complete (data, textStatus,xxx);
      }
      if(config.shwloading === true){
        _api.loadingHide();
      }

    },
    error : function(){

    }


  });
}
//
_api.post = function(){

}
//
_api.get = function(){

}

//-------交互--------------------------------------------------------------
_api.showLoading = function(){

}

_api.hideLoading = function(){

}

_api.showToast  = function(){}

_api.hideToast = function(){

}

_api.showModal = function(){}





//--------路由-----------------------------------------------------------
_api.navitateBack = function(){

}

_api.redirect = function(){

}


//----缓存----------------------------
_api.getStorage = function(){

}
_api.setStorage = function(){

}
_api.clearStorage = function(){

}




//------------------------------------

export default _api;

/*
export default {
    //ajax请求

    async httpRequest(option = {}) {
        if (option.methods == 'GET' || option.methods == 'get') {
          return await axios.get(
            option.url, {
              params: option.data
            }
          )
        } else if (option.methods == 'POST' || option.methods == 'post') {
          return await axios.post(
            option.url, option.data
          )
        } else {
          console.log('method not allow!')
        }
    }
    
}
*/
