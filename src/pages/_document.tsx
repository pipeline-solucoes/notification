import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import createCache from "@emotion/cache";
import createEmotionServer from "@emotion/server/create-instance";
import { CacheProvider } from "@emotion/react";

// Função para criar o cache do Emotion
const createEmotionCache = () => {
  return createCache({ key: "css", prepend: true });
};

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            (
              <CacheProvider value={cache}>
                <App {...props} />
              </CacheProvider>
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);

      // Extrai os estilos críticos para renderização no lado do servidor
      const emotionStyles = extractCriticalToChunks(initialProps.html);
      const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
          key={style.key}
          data-emotion={`${style.key} ${style.ids.join(" ")}`}
          dangerouslySetInnerHTML={{ __html: style.css }}
        />
      ));

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {emotionStyleTags}
          </>
        ),
      };
    } finally {
      // Nada a liberar como no caso do styled-components
    }
  }

  render() {
    return (
      <Html lang="pt">
        <Head>                 
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}