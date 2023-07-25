import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="id">
        <Head />
        <meta name="google-site-verification" content="6MAhMl8DETJAEL6vwD4RIf4QOprJYS-Vwsz9f2LKaNk" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-C7BKLRFC53"></script>
        <script
          data-ad-client="ca-pub-5442972248172818"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-C7BKLRFC53');
              `,
          }}
        />

        <body className="dark:bg-gray-800">
          <script
            dangerouslySetInnerHTML={{
              __html: `
            (function() {
              window.__onThemeChange = function() {};
              function setTheme(newTheme) {
                window.__theme = newTheme;
                preferredTheme = newTheme;
                document.body.className = newTheme;
                window.__onThemeChange(newTheme);
              }
              var preferredTheme;
              try {
                preferredTheme = localStorage.getItem('theme');
              } catch (err) { }
              window.__setPreferredTheme = function(newTheme) {
                setTheme(newTheme);
                try {
                  localStorage.setItem('theme', newTheme);
                } catch (err) {}
              }
              var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
              darkQuery.addListener(function(e) {
                window.__setPreferredTheme(e.matches ? 'dark' : 'light')
              });
              setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
            })();
              `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
