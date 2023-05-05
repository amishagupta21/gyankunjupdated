const { merge } = require("webpack-merge");
const packageJson = require('../package.json')


const devConfig = {
    mode: "development",
    output : {
        publicPath: "http://localhost:3000/",
    },
    devServer : {
        host: "0.0.0.0",
        port: 3000,
        historyApiFallback: true,
    }
}

module.exports = merge(devConfig);