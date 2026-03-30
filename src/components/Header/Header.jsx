import { Container, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ModeToggle } from "../themetoggle";
import logo from "../../assets/logo.gif";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
      variant: "ghost",
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      variant: "default",
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      variant: "outline",
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
      variant: "ghost",
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      variant: "ghost",
    },
  ];

  return (
    <header className="py-3 shadow rounded bg-background">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
            {/* Logo is temprory */}
              <img src={logo} alt="" width={80} />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="px-1">
                  <Button
                    onClick={() => navigate(item.slug)}
                    variant={item.variant}
                  >
                    {item.name}
                  </Button>
                </li>
              ) : null,
            )}
            {authStatus && (
              <li className="flex gap-2 px-2.5">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
                  {userData?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-base text-center">{userData?.name}</span>
              </li>
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
            <li className="px-1">
              <ModeToggle />
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
