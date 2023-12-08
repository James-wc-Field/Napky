import { Link } from '@nextui-org/link'

export default function Copyright() {
  return (
    <div className="text-center text-gray-500 text-xs">
      &copy; {new Date().getFullYear()}{' '}
      <Link
        className="text-xs" href="https://github.com/James-wc-Field/Napky">Napky
      </Link>. All
      rights reserved.
    </div>
  );
}
