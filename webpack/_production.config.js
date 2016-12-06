const {NoErrorsPlugin}      = require("webpack");
const UglifyJsPlugin        = require("webpack/lib/optimize/UglifyJsPlugin");
const OccurrenceOrderPlugin = require("webpack/lib/optimize/OccurrenceOrderPlugin");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const ExtractTextPlugin    = require("extract-text-webpack-plugin");
const {root}               = require("./constants");

/**
 * The production build may or may not include the BundleAnalyzerPlugin to visualize the build
 * result and check if any of the illustrated sizes might be optimized, or if anything is missing
 * you might have expected. By default, it starts a server at port 5000. Adjust its options if required.
 *
 * At the time of writing, the plugin is used in every production build (with and without AoT),
 * except when the exemplary production server is started as well.
 * @param useAnalyzePlugin Whether the BundleAnalyzerPlugin should be used or not.
 */
module.exports = function (useAnalyzePlugin) {
  const plugins = [
    // Plugin to let the whole build fail on any error; i.e. do not tolerate these
    new NoErrorsPlugin(),
    /**
     * Optimize the strategy of how module and chunk ids are assigned; make this more predictable.
     *
     * See: http://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
     */
    new OccurrenceOrderPlugin(true),
    /**
     * Plugin to properly minify the build output
     *
     * See: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
     */
    new UglifyJsPlugin({
      beautify: false,
      comments: false
    }),
    /**
     * Plugin to extract styles as css files; We're using this for the main.scss only atm.
     * This may optimize loading time in production mode since it may be cached by the browser separately.
     *
     * See: http://webpack.github.io/docs/stylesheets.html#separate-css-bundle
     */
    new ExtractTextPlugin("[name].[chunkhash].css")
  ];
  if (useAnalyzePlugin) {
    plugins.push(new BundleAnalyzerPlugin({analyzerPort: 5000}));
  }

  /**
   * In general, [hash] identifies the whole build, whereas [chunkhash] identifies the particular chunk.
   * Using these is one way to simplify cache busting.
   *
   * See: http://webpack.github.io/docs/configuration.html#output-filename
   */
  return {
    output: {
      path: root("dist"),
      filename: "bundle.[hash].js",
      chunkFilename: "[id].bundle.[chunkhash].js"
    },
    devtool: false,
    plugins: plugins
  };
};