var config = require("./");

module.exports = {
    src: config.sourceAssets + "/img/**",
    dest: config.publicAssets + "/img",
    settings:{
        optimizationLevel: 3, //png
        progressive: true, //jpg
        nterlaced: true //gif        
    }
}
