export default function Heading(props: { children: string }) {
  return (
    <div>
      <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
        {props.children}
      </h1>
    </div>
  );
}
