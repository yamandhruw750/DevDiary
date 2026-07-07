import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { GitHubLogoIcon, TwitterLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

function Footer() {
  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1.1fr]">
          <div>
            <div className="text-xl font-semibold tracking-[-0.04em]">DevDiary</div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              A premium workspace for developers to document learning, ship projects, and build a public portfolio with clarity.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground">Product</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>Markdown Editor</li>
              <li>Project Showcase</li>
              <li>Progress Tracking</li>
              <li>Achievement Badges</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground">Resources</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>Documentation</li>
              <li>Guides</li>
              <li>Templates</li>
              <li>Changelog</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground">Community</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>Explore Posts</li>
              <li>Creators</li>
              <li>Open Source</li>
              <li>Discord</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground">Newsletter</h3>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">Get product updates and thoughtful dev writing once a month.</p>
            <div className="mt-4 flex gap-2">
              <Input className="h-11 rounded-full border-border bg-background placeholder:text-muted-foreground dark:bg-card/70" placeholder="Email address" />
              <Button className="h-11 rounded-full bg-foreground px-5 text-background hover:bg-foreground/90">Join</Button>
            </div>
            <div className="mt-6 flex items-center gap-4 text-muted-foreground">
              <GitHubLogoIcon />
              <TwitterLogoIcon />
              <LinkedInLogoIcon />
            </div>
          </div>
        </div>
        <Separator className="my-10 bg-border" />
        <div className="flex flex-col gap-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} DevDiary. All rights reserved.</p>
          <p>Built with React, Tailwind CSS, shadcn/ui, and Lucide icons.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
