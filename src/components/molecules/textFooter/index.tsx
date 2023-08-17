export default function TextFooter() {
  return (
    <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400 mt-10">
     Created By{" "}
      <a
        href="https://github.com/sarrahman-me"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-sky-600 hover:underline dark:text-sky-500"
      >
        sarrahman.me
      </a>
    </p>
  );
}
