import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ModeToggle } from "../themetoggle";
import { ChevronRight, Code2 } from "lucide-react";
import LogoutBtn from "../Header/LogoutBtn";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${scrolled ? "border-border/70 bg-background/85 backdrop-blur-2xl" : "border-transparent bg-background/70 backdrop-blur-xl"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card shadow-[0_0_30px_rgba(139,92,246,0.2)]">
            <Code2 className="h-5 w-5 text-foreground" />
          </div>
          <div>
            <div className="text-sm font-semibold tracking-[0.24em] text-foreground uppercase">DevDiary</div>
            <div className="text-xs text-muted-foreground">Build in public</div>
          </div>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-muted-foreground lg:flex">
          {["Home", "Explore", "Projects", "Blog", "Community", "Pricing"].map((item) => (
            <button key={item} onClick={() => navigate(item === "Home" ? "/" : `/${item.toLowerCase()}`)} className="transition-colors hover:text-foreground">
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1 shadow-sm">
            <span className="hidden text-xs font-medium text-muted-foreground sm:inline">Theme</span>
            <ModeToggle />
          </div>
          {authStatus ? (
            <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm text-muted-foreground md:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-cyan-400 text-xs font-semibold text-white">
                {userData?.name?.charAt(0).toUpperCase()}
              </div>
              {userData?.name}
            </div>
          ) : (
            <Button variant="ghost" className="rounded-full text-muted-foreground hover:bg-muted hover:text-foreground" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
          <Button className="rounded-full bg-linear-to-r from-purple-500 via-indigo-500 to-cyan-500 px-5 text-white shadow-[0_10px_30px_rgba(99,102,241,0.35)] hover:opacity-95" onClick={() => navigate(authStatus ? "/add-post" : "/login?mode=signup")}>
            {authStatus ? "New Post" : "Get Started"}
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
          {authStatus && <LogoutBtn />}
        </div>
      </div>
    </header>
  );
}

export default Header;
