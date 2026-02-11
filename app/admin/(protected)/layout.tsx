import LogoutButton from "./LogoutButton";
import Sidebar from "./Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--admin-bg)] text-[var(--admin-text)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-10 py-8 lg:flex-row">
        <aside className="w-full lg:w-72 lg:shrink-0">
          <div className="sticky top-8 space-y-6">
            <Sidebar />
            <LogoutButton />
          </div>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
