const isProduct = process.env.NODE_ENV === 'production';

module.exports = {
  // for git pages
  publicPath: isProduct ? 'vue-thanos-snap' : ''
};