// Dependencies.
import express from 'express';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Constants.
const config = require('../webpack.config.js');
const isDeveloping = !process.env.NODE_ENV;
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

// Run webpack middleware if in development mode.
if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
}

// To support JSON-encoded bodies.
app.use(bodyParser.json());

// Allowing app to use static CSS and JavaScript files.
app.use(express.static(__dirname, './build'));

// Exporting app to use in routes file.
module.exports.app = app;

// Require routes.
require('./routes/index');

// Run express server.
app.listen(port);
