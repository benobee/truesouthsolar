/****************************************/
/********    WEBPACK CONFIG     *********/
/****************************************/


const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");



/****************************************/
/********    CONFIG OBJECT      *********/
/****************************************/


const WEBPACK_CONFIG = { module: {} };
const isProduction = JSON.parse(process.env.PROD_ENV || '0'); //set 1 for production, 0 for development



/****************************************/
/********     ENVRIONMENTS      *********/
/****************************************/


const PRODUCTION = process.env.PROD_ENV === 'production';
const DEVELOPMENT = process.env.PROD_ENV === 'development';



/***************************************/
/**********      INPUT        **********/
/***************************************/
const input = {
    context: __dirname,
    entry: ['./main.js', './main.less'],
    devtool: isProduction ? '' : 'eval',
    node: {
        dns: 'mock',
        net: 'mock',
        fs: 'empty'
    },
    resolve: {
        alias: {
          'masonry': 'masonry-layout',
          'isotope': 'isotope-layout'
        }
    }
};

//extend properties to config
Object.assign(WEBPACK_CONFIG, input);


/****************************************/
/********        LOADERS      ***********/
/****************************************/

/*
 * each loader will push to this rules
 * array.
*/

const rules = [];

//babel
const babel = {
    test: /\.js$/, 
    exclude: /node_modules/,
    use: [
        {
            loader: 'babel-loader',
            options: { presets: 
                ['es2015'] //NEED TO USE WEBPACK MODULES INSTEAD
            }       
        }
    ]
};

rules.push(babel);

//less
const lessLoader = {
    test: /\.less$/, 
    exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        loader: [
            {
                loader: 'css-loader'
            },
            {
                loader: 'less-loader',
            }
        ]
    })
};

rules.push(lessLoader);

//json
const jsonLoader = { 
    test: /\.json$/,
    use: [
        {
            loader: "json-loader"
        }
    ]
};

rules.push(jsonLoader);


WEBPACK_CONFIG.module.rules = rules;


/***************************************/
/**********      PLUGINS      **********/
/***************************************/

/*
 * each plugin will push to this plugins
 * array. Some will only be pushed when
 * config is set to production. 
*/

const plugins = [];



const nodeENV = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
});

isProduction ? plugins.push(nodeENV) : false;



//es6 linting loader
const loaderOptions = new webpack.LoaderOptionsPlugin({
  test: /.js$/,
  exclude: /node_modules/,
  loader: "eslint-loader"
});

plugins.push(loaderOptions);



//compile all less files into master CSS
const CSSBundle = new ExtractTextPlugin({ 
    filename: isProduction ? "[name].[hash].bundle.css" : "bundle.css"
});

plugins.push(CSSBundle);



//extend jquery for jquery plugins
const jQueryExtend = new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
});

plugins.push(jQueryExtend);



//handling es6 promises
const promises = new webpack.ProvidePlugin({
    'Promise': 'es6-promise', 
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
});

plugins.push(promises);



//for minifying javascript
const minify = new webpack.optimize.UglifyJsPlugin({
    compress: { 
        warnings: false 
    },
    output: {
        comments: false
    },
    minimize: isProduction ? true : false,
    debug: false,
    sourceMap: true,
    minify: true
});

//if production is set, js will be minified
isProduction ? plugins.push(minify) : false;


//output to config object
WEBPACK_CONFIG.plugins = plugins;

/************************************/
/**********      OUTPUT       *******/
/************************************/
const output = {
    output: {
          publicPath: '/',
          path: __dirname + "/template/assets",
          filename: isProduction ? "[name].[hash].bundle.js" : "bundle.js"
    }
};

//extend properties to config
Object.assign(WEBPACK_CONFIG, output);


//export config
module.exports = WEBPACK_CONFIG;