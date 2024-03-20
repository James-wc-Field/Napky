import Link from "next/link";

export function Copyright() {
  return (
    <div className="text-center text-gray-500 text-xs">
      &copy; {new Date().getFullYear()}{" "}
      <Link className="text-xs text-blue-500" href="https://github.com/James-wc-Field/Napky">
        Napky
      </Link>
      . All rights reserved.
    </div>
  );
}
