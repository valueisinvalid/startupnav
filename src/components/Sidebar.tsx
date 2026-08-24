import Link from "next/link";
import SidebarNav from "./SidebarNav";
import Toolbar from "./Toolbar";

export default function Sidebar() {
  return (
    <aside className="sidebar" id="sidebar">
      <h1 className="blog-title">
        <Link href="/" className="blog-logo-link" aria-label="The StartupNav">
          startupnav
        </Link>
      </h1>

      <SidebarNav />
      <Toolbar />
    </aside>
  );
}
