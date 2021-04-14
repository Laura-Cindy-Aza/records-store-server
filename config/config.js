// const { env } = process;

// const config = {
//   env: env.NODE_ENV || 'development',
// };

// const devConfig = {
//   db: env.MONGO_URI_DEV,
//   jwt_key: env.JWT_KEY_DEV,
//   frontendOrigin: env.FRONTEND_ORIGIN_DEV,
// };

// const prodConfig = {
//   db: env.MONGO_URI_PROD,
//   jwt_key: env.JWT_KEY_PROD,
//   frontendOrigin: env.FRONTEND_ORIGIN_PROD,
// };

// const currentConfig = config.env === 'production' ? prodConfig : devConfig;
// console.log('OUR ENVIROMENT SETUP IS:', config.env);
// console.log(currentConfig);

// module.exports = Object.assign({}, config, currentConfig);