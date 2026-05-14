import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/routing';
import { notFound } from 'next/navigation';
import Script from 'next/script';

export function generateStaticParams() {
  return routing.locales.map((locale: string) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>

        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-B7DCR9L3K2" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-B7DCR9L3K2');
        `}</Script>

        {/* Binotel callback widget */}
        <Script id="binotel-call" strategy="lazyOnload">{`
          (function(d, w, s) {
            var widgetHash = '22820', gcw = d.createElement(s);
            gcw.type = 'text/javascript'; gcw.async = true;
            gcw.src = '//widgets.binotel.com/getcall/widgets/' + widgetHash + '.js';
            var sn = d.getElementsByTagName(s)[0]; sn.parentNode.insertBefore(gcw, sn);
          })(document, window, 'script');
        `}</Script>

        {/* Binotel online chat widget */}
        <Script id="binotel-chat" strategy="lazyOnload">{`
          (function(d, w, s) {
            var widgetHash = 'uitxCXtUBEeN7ilXnphG', bch = d.createElement(s);
            bch.type = 'text/javascript'; bch.async = true;
            bch.src = '//widgets.binotel.com/chat/widgets/' + widgetHash + '.js';
            var sn = d.getElementsByTagName(s)[0]; sn.parentNode.insertBefore(bch, sn);
          })(document, window, 'script');
        `}</Script>
      </body>
    </html>
  );
}
