import { Dropdown } from "./Dropdown";
import { DropdownItem } from "./DropdownItem";
import { Menu } from "./Menu";
import { MenuItem } from "./MenuItem";
import ThemeToggle from "./ThemeToggle";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 h-16  backdrop-blur-md  bg-[var(--navbar-bg-color)] border-b border-[var(--navbar-border-color)] shadow-[var(--navbar-shadow-color)]">
      <Menu className="max-w-4xl mx-auto px-4 h-full">
        <MenuItem href="/">Home</MenuItem>
        <MenuItem href="/Blog">Blog</MenuItem>
        <MenuItem href="/contact">Contact</MenuItem>
        <Dropdown
          trigger={<span className="flex items-center gap-1">More</span>}
        >
          <DropdownItem href="/blog" prefix="📝">
            Blog
          </DropdownItem>
          <DropdownItem href="/editor?id=secret-demo-key" prefix="🎨">
            Editor
          </DropdownItem>
        </Dropdown>
        <ThemeToggle classNames="ml-auto" />
      </Menu>
    </header>
  );
}
