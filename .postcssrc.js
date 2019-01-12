// https://github.com/michael-ciniawsky/postcss-load-config

let conf = {
  "plugins": {
    "postcss-mpvue-wxss": {},
    "postcss-import": {},
    "postcss-url": {},
   // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
};
if(global.jhyconfig.agent != 'wx'){
	delete conf['plugins']['postcss-mpvue-wxss'];
}

module.exports = conf;
