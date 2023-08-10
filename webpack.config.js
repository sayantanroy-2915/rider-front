// webpack.config.js
module.exports = {
    // ... other config options
    resolve: {
        fallback: {
            "crypto": require.resolve("crypto-browserify")
        }
    }
};