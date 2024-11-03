import Link from "next/link";
import x from '@/style/app.module.css'
import y from '@/style/hoidanit.module.css'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'HomePage',
  description: 'Description bla bla',
}

export default function Home() {

  return (
    <div>
      <ul>
        <li className={x['red']}>
          <Link href="/facebook">
            <span className={y['red']}>Facebook</span>
          </Link>
        </li>
        <li>
          <Link href="/youtube">Youtube</Link>
        </li>
        <li>
          <Link href="/tiktok">Tiktok</Link>
        </li>
      </ul>
    </div>
  );
}
