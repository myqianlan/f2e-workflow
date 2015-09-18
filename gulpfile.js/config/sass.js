var config = require("./");

module.exports = {
    autoprefixer: {browser: ["last 3 version", "> 1% in CN", "ie >= 9", "ie_mob >= 10","Android >= 4"]},
    src: config.sourceAssets + "/scss/**/*.scss",
    dest: config.sourceAssets + "/css",
    settings: {
        imagePath: "assets/img"
    }
}
