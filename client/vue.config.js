const path = require('path');

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000'
            },
            '/operations': {
                target: 'http://localhost:5000'
            }
        }
    }
}