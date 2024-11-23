const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
    name: "Electron Test App",
    icon: "img/movie.ico",
    appCopyright: "MIT",
    //plateform: "win32"
    win32metadata: {
        CompanyName: "Franck Gaspoz Software",
        ProductName: "Movie Db Viewer"        
        //application-manifest
    },
    appCategoryType: 'public.app-category.developer-tools'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
    {
        name: '@electron-forge/maker-appx',
        config: {
            icon: './img/movie.ico',
            setupIcon: './img/movie.ico',
            //publisher: 'CN=Franck Gaspoz Software',
            devCert: './default.pfx',
            certPass: 'zobilamouche'
        }
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
