const path = require('path')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const frontConfig = {
    target: "web",
    entry: {
        app: ["./browser.js"]
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "highlightr.min.js",
    },
    devServer: {
        host: '0.0.0.0',
        publicPath: '/assets/',
        contentBase: path.resolve(__dirname, "./views"),
        watchContentBase: true,
        compress: true,
        port: 9001
    },
    devtool: 'inline-source-map',
}
const backConfig = {
    target: "node",
    entry: {
        app: ["./index.js"]
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "node.highlightr.min.js"
    },
    externals: [nodeExternals()]
}

module.exports = [frontConfig, backConfig]