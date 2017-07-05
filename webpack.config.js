const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const LIBS = {
    React: "react",
    ReactDOM: "react-dom",
    ReactRouter: "react-router"
}

module.exports = {
    entry: {
        app: ["./src/client/index.js"],
        vendor: Object.keys(LIBS).map((vendor) => LIBS[vendor])
    },
    output: {
        path: __dirname + "/dist",
        chunkFilename: "[name].js",
        filename: "[name].js"
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: [["es2015", {modules: false}], "react"],
                    plugins: [
                        "transform-object-rest-spread",
                        "syntax-async-functions",
                        "syntax-dynamic-import",
                        "transform-async-to-generator",
                        "transform-regenerator",
                        "transform-runtime"
                    ]
                }
            }]
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            chunks: ["app"],
            filename: "[name].js",
            minChunks: function(module){
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            chunks: ["vendor"],
            filename: "[name].js",
            minChunks: Infinity
        })/*,
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            }
        })*/,
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/client/index.html"
        }),
        new webpack.ProvidePlugin({
            THREE: "three",
            "window.THREE": "three"
        })
    ]
};