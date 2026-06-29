type ButtonProps = {
  children: React.ReactNode;
  url: string;
};

export default function Button({ children, url }: ButtonProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700"
    >
      {children}
    </a>
  );
}