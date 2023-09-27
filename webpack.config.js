const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    // Other configuration options

    resolve: {
        fallback: {
            util: require.resolve('util/'),
            net: require.resolve('net/'),
            tls: require.resolve('tls/'),
        },
    },
    externals: [nodeExternals()],
};