import Link from 'next/link';

export default function Copyright(props: any) {
  return (
    <div className="text-center text-gray-500 text-xs">
      &copy; {new Date().getFullYear()}{' '}
      <Link href="https://github.com/James-wc-Field/Napky">Napky</Link>. All
      rights reserved.
    </div>
  );
}
