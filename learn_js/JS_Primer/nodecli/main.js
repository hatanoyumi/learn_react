// // コンソールにコマンドライン引数を出力する
// console.log(process.argv);

// `node:util`モジュールを、utilオブジェクトとしてインポートする
import * as util from "node:util";
// fs/promisesモジュールをfsオブジェクトとしてインポートする
import * as fs from "node:fs/promises";
// // markedモジュールからmarkedオブジェクトをインポートする
// import { marked } from "marked";
// md2htmlモジュールからmd2html関数をインポートする
import { md2html } from "./md2html";


// コマンドライン引数をparseArgs関数でパースする
// const {
//   // values,
//   positionals
// } = util.parseArgs({
//   // オプションやフラグ以外の引数を渡すことを許可する
//   allowPositionals: true
// });
//
// const { positionals } = util.parseArgs({
//   allowPositionals: true
// });

// コマンドライン引数からファイルパスとオプション/フラグを受け取る
const {
  values,
  positionals
} = util.parseArgs({
  allowPositionals: true,
  options: {
    // gfmフラグを定義する
    gfm: {
      // オプションの型をbooleanに指定
      type: "boolean",
      // --gfmフラグがない場合のデフォルト値をfalseにする
      default: false,
    }
  }
});
// // valuesにはオプションのパース結果がオブジェクトとして格納される
// console.log(values.gfm); // --gfmフラグがあればtrue、なければfalseとなる


// console.log(values); // オプションやフラグを含むオブジェクト
// console.log(positionals); // フラグ以外の引数の配列

// ファイルパスをpositionals配列から取り出す
const filePath = positionals[0];

// console.log(filePath);
// // ファイルを非同期で読み込む
// fs.readFile(filePath).then(file => {
//   console.log(file);
// });
// ファイルをUTF-8として非同期で読み込む
fs.readFile(filePath, { encoding: "utf8" }).then(file => {
  // console.log(file);

  // // MarkdownファイルをHTML文字列に変換する
  // const html = marked.parse(file);

  // // gfmオプションを無効にする
  // const html = marked.parse(file, {
  //   gfm: false
  // });

  // // gfmフラグのパース結果をオプションとして渡す
  // const html = marked.parse(file, {
  //   gfm: values.gfm
  // });

  // md2htmlモジュールを使ってHTMLに変換する
  const html = md2html(file, {
    gfm:values.gfm
  });

  console.log(html);
}).catch(err => {
  console.error(err.message);
  // 終了ステータス 1（一般的なエラー）としてプロセスを終了する
  process.exit(1);
});