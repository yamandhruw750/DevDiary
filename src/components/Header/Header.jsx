import { Container, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ModeToggle } from "../themetoggle";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
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
      variant: "secondary",
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
            <Link to="/">Logo</Link>
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
            <li>
              <ModeToggle />
            </li>
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
