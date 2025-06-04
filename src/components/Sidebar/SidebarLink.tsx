export default function SidebarLink({
  icon,
  text,
  active = false,
}: {
  icon: string;
  text: string;
  active?: boolean;
}) {
  return (
    <a
      href="#"
      className={`flex items-center px-4 py-3 mx-2 rounded-lg transition-colors duration-200 ${
        active ? "bg-indigo-700" : "hover:bg-indigo-700"
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="ml-3 hidden group-hover:block">{text}</span>
    </a>
  );
}
