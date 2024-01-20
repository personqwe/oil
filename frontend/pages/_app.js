import '@/styles/globals.css'
import { Noto_Sans_KR } from 'next/font/google';

const inter = Noto_Sans_KR({ 
  weight: ["100", "300", "400", "500", "700", "900"],
  display: 'optional',
  subsets: ['latin']
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}