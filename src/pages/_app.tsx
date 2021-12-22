import { AppProps } from 'next/app';
import '@/styles/global.css';
import '@/styles/slider.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
