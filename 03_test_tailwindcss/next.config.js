const path = require("path");

/** Next.jsの設定値 */
const nextConfig = {
  /** WebPack の設定を追加 */
  webpack: config => {
    // Vue と同じように 「@ = src/」,「~ = src/」に設定する。
    // => モジュールのパス解決とエイリアスを設定している。
    //path.resolveは、実行結果のPathが絶対パス。
    // path.joinは、実行結果のPathが相対パス。
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    config.resolve.alias["~"] = path.join(__dirname, "src");
    return config;
  },
};

module.exports = nextConfig;