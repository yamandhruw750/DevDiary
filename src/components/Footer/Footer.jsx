import { Separator } from "../ui/separator";
import {
  GitHubLogoIcon,
  TwitterLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

function Footer() {
  return (
    <footer className="border-t bg-background shadow rounded">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold">DevDiary</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              DevDiary is a platform where developers share knowledge, tutorials
              and coding experiences.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground cursor-pointer">Blogs</li>
              <li className="hover:text-foreground cursor-pointer">Write</li>
              <li className="hover:text-foreground cursor-pointer">
                Categories
              </li>
              <li className="hover:text-foreground cursor-pointer">Authors</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground cursor-pointer">Docs</li>
              <li className="hover:text-foreground cursor-pointer">
                Community
              </li>
              <li className="hover:text-foreground cursor-pointer">
                Help Center
              </li>
              <li className="hover:text-foreground cursor-pointer">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>

            <div className="flex gap-4 text-muted-foreground">
              <GitHubLogoIcon className="cursor-pointer hover:text-foreground" />
              <TwitterLogoIcon className="cursor-pointer hover:text-foreground" />
              <LinkedInLogoIcon className="cursor-pointer hover:text-foreground" />
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Follow us for updates and new articles.
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} DevDiary. All rights reserved.</p>
          <p>Built with React, Tailwind & shadcn/ui</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
