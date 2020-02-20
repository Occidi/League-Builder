const path = require('path');
const webpack = require('webpack');


const moduleObjClient = {
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            options: { presets: ['@babel/env', '@babel/react'] },
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        },
    ],
};

const moduleObjServer = {
    rules: [
        {
            test: /\.(js)$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            options: { presets: ['@babel/env'] },
        },
    ],
};


const client = {
    entry: {
        client: './src/client/index.js',
    },
    target: 'web',
    mode: 'development',
    module: moduleObjClient,
    resolve: { extensions: ['*', '.js', '.jsx'] },
    output: {
        path: path.resolve(__dirname, 'dist/public'),
        publicPath: '/dist/',
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist/public'),
        port: 3000,
        publicPath: 'http://localhost:3000/dist/public',
        hotOnly: true,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
};

const server = {
    entry: {
        server: './src/server/index.js',
    },
    mode: 'development',
    target: 'node',
    resolve: { extensions: ['*', '.js'] },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: moduleObjServer,
};


module.exports = [client, server];
