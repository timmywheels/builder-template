import { Link } from "react-router";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, Sparkles } from "lucide-react";
import { useState } from "react";

export function NavigationHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-12 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-base font-medium">AI Monitor</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-5">
                <NavigationMenuItem>
                  <Link
                    to="/resources"
                    className="text-xs font-normal transition-colors hover:text-primary"
                  >
                    Resources
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    to="/agencies"
                    className="text-xs font-normal transition-colors hover:text-primary"
                  >
                    Agencies
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    to="/pricing"
                    className="text-xs font-normal transition-colors hover:text-primary"
                  >
                    Pricing
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="font-medium h-8 text-xs">
              Book a demo
            </Button>
            <Button size="sm" className="gap-1.5 font-medium h-8 text-xs">
              <span>Start 7-day trial</span>
              <Sparkles className="h-3 w-3" />
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link
                  to="/resources"
                  className="text-lg font-normal transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Resources
                </Link>
                <Link
                  to="/agencies"
                  className="text-lg font-normal transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Agencies
                </Link>
                <Link
                  to="/pricing"
                  className="text-lg font-normal transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </Link>
                <div className="pt-4 space-y-3">
                  <Button variant="outline" className="w-full font-medium">
                    Book a demo
                  </Button>
                  <Button className="w-full gap-2 font-medium">
                    <span>Start 7-day trial</span>
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
