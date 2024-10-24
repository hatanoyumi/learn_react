// import { Html, Head, Main, NextScript } from "next/document";

// export default function Document() {
//   return (
//     <Html lang="en">
//       <Head />
//       <body>
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   );
// }

import Document, { DocumentContext } from "next/document";
import { ServerStyleSheet } from "styled-components";

// デフォルトのDocumentをMyDocumentで上書き
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalResderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalResderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      // 初期値を流用
      const initialProps = await Document.getInitialProps(ctx)

      // initialPropsに加えて、styleを追加して返す
      return {
        ...initialProps,
        styles: [
          // 元々のstyle
          initialProps.styles,
          // styled-componentsのstyle
          sheet.getStyleElement()
        ],
      }
    } finally {
      sheet.seal()
    }
  }
}