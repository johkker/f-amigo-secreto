import Head from 'next/head';

export const Header = () => {
  return (
    <Head>
      <title>Amigo Secreto</title>
      <meta
        name="Aplicativo para sortear grupos de 'amigo secreto' (amigo oculto)."
        content="Website criado em NextJs, com MaterialUI como biblioteca de componentes"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest"></link>
    </Head>
  );
};
