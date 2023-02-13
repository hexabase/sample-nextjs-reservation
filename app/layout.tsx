import Image from 'next/image'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body>
        <header>
          <div className='container-responsive'>
            <div className='flex items-center justify-between py-5'>

              <Image src='/logo.png' width={159} height={43.06} alt='logo' />
              <div>
                <button className='button-header'>
                  ログイン
                </button>
              </div>
            </div>
          </div>
        </header>
        <>
          <main>

            {children}
          </main>
          <footer className=' bg-[#F2F2F2] flex flex-col items-center px-60 py-8 gap-y-[60px]'>
            <div>
              <Image alt='logo' src='/logoFooter.svg' width={93} height={91} />
            </div>
            <div className='flex items-center justify-between gap-x-9'>
              <p>ホーム</p>
              <p>ログイン</p>
              <p>会員登録</p>
              <p>プライバシーポリシー</p>
            </div>
            <div>
              <p>©️2022 Hexabase</p>
            </div>
          </footer>
        </>
      </body>
    </html>
  )
}
