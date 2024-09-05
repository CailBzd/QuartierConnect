module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',  // Ce nom doit être utilisé pour l'importation des variables
        path: '.env',        // Spécifiez le chemin vers le fichier .env
      }]
    ]
  };
};
