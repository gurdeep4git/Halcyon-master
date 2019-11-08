const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const distPath = path.resolve(__dirname, "dist");
const srcPath = path.join(__dirname, "src");

const config = {
    entry: {
        index: "./src/scripts/index.ts",
        contact: "./src/scripts/contact.ts",
        multiselect: "./src/scripts/multiselect.ts",
        fancytree: "./src/scripts/fancytree.ts",
        "datatable-custom": "./src/scripts/datatable-custom.ts",
        slider: "./src/scripts/slider.ts",
        countries: "./src/scripts/countries.ts",
        heros: "./src/scripts/Heros/heros-app.ts",
        localstorage: "./src/scripts/LocalStorage/localstorage.ts",
        checkboxapp: "./src/scripts/CheckboxApp/checkboxapp.ts",
        sortable: "./src/scripts/sortable/sortable.ts",
        autocomplete: "./src/scripts/autocomplete/autocomplete.ts",
        chart: "./src/scripts/Chart/chart.ts"
    },
    devtool: "inline-source-map",
    resolve: {
        alias: {
            "jquery-ui": "jquery-ui/jquery-ui.js",
            handlebars: "handlebars/dist/handlebars.min.js"
        },
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        path: distPath,
        filename: "js/[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.hbs$/,
                use: [
                    {
                        loader: "handlebars-loader",
                        options: {
                            helperDirs: path.join(
                                srcPath,
                                "scripts/Handlebars/helpers"
                            )
                        }
                    }
                ]
            },
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                    ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "fonts/",
                            publicPath: "../fonts/"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "window.$": "jquery",
            Popper: ["popper.js", "default"],
            Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
            Button: "exports-loader?Button!bootstrap/js/dist/button",
            Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
            Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
            Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
            Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
            Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
            Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            Util: "exports-loader?Util!bootstrap/js/dist/util"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common"
        }),
        new ExtractTextPlugin({
            filename: "css/[name].bundle.css"
        })
    ]
};

module.exports = config;
