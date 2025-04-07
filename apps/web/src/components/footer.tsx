import { Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary"></div>
              <span className="text-xl font-bold">SaaS Platform</span>
            </div>
            <p className="text-sm text-background/80 max-w-xs">
              Building the future of SaaS development with powerful tools and incredible developer
              experiences.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-background/10">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-background/10">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-background/10">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-background/10">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
            </div>
          </div>

          {/* Navigation columns */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold">Product</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a href="#" className="text-sm text-background/70 hover:text-background">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-background/70 hover:text-background">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-background/70 hover:text-background">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-background/70 hover:text-background">
                      Changelog
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold">Company</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a href="#" className="text-sm text-background/70 hover:text-background">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-background/70 hover:text-background">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-background/70 hover:text-background">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-background/70 hover:text-background">
                      Press
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold">Resources</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a href="#" className="text-sm text-background/70 hover:text-background">
                      Community
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-background/70 hover:text-background">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-background/70 hover:text-background">
                      Partners
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-background/70 hover:text-background">
                      Status
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold">Legal</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a href="#" className="text-sm text-background/70 hover:text-background">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-background/70 hover:text-background">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-background/70 hover:text-background">
                      Cookie Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-background/70 hover:text-background">
                      Licenses
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="mt-12 border-t border-background/10 pt-8">
          <p className="text-sm text-background/70 text-center">
            &copy; {new Date().getFullYear()} SaaS Platform, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
