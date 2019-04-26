const path = require('path')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const buildPath = path.resolve(__dirname, "./build")
const frontConfig = {
    target: "web",
    entry: {
        app: ["./browser.js"]
    },
    output: {
        path: buildPath,
        filename: "highlightr.min.js",
    },
    devtool: 'inline-source-map',
}
const backConfig = {
    target: "node",
    entry: {
        app: ["./index.js"]
    },
    output: {
        path: buildPath,
        filename: "node.highlightr.min.js"
    },
    externals: [nodeExternals()]
}

module.exports = [frontConfig, backConfig]