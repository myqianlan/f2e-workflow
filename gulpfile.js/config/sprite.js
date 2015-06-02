var config = require("./");

module.exports = {
    src: config.sourceAssets + "/sprite/img/**.png",
    dest: config.sourceAssets + "/sprite",
    settings:{
        imgName: 'sprites.png',
        cssName: 'sprite.css'
        // algorithm: 'diagonal'       
    }
}
