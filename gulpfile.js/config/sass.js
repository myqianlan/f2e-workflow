var config = require("./");

module.exports = {
    autoprefixer: {browser: ["lst 2 version","ie >= 9"]},
    src: config.sourceAssets + "/scss/**/*.scss",
    dest: config.sourceAssets + "/css",
    settings: {
        imagePath: "assets/img"
    }
}
