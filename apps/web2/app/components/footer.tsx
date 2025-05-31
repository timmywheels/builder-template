import { Link } from "react-router";
import { Sparkles } from "lucide-react";
import { Separator } from "./ui/separator";

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Company */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-base font-medium">AI Monitor</span>
            </div>
            <p className="text-[11px] text-muted-foreground font-light leading-relaxed">
              Monitor and optimize your brand's presence in AI search engines like ChatGPT, Claude,
              and Perplexity.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-normal text-xs mb-3">Product</h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  to="/platform"
                  className="text-[11px] text-muted-foreground hover:text-primary transition-colors font-light"
                >
                  Platform
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-[11px] text-muted-foreground hover:text-primary transition-colors font-light"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/demo"
                  className="text-[11px] text-muted-foreground hover:text-primary transition-colors font-light"
                >
                  Book a demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-normal text-xs mb-3">Solutions</h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  to="/agencies"
                  className="text-[11px] text-muted-foreground hover:text-primary transition-colors font-light"
                >
                  For Agencies
                </Link>
              </li>
              <li>
                <Link
                  to="/affiliate"
                  className="text-[11px] text-muted-foreground hover:text-primary transition-colors font-light"
                >
                  Affiliate program
                </Link>
              </li>
              <li>
                <Link
                  to="/enterprise"
                  className="text-[11px] text-muted-foreground hover:text-primary transition-colors font-light"
                >
                  Enterprise
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-normal text-xs mb-3">Free Tools</h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  to="/tools"
                  className="text-[11px] text-muted-foreground hover:text-primary transition-colors font-light"
                >
                  All free tools
                </Link>
              </li>
              <li>
                <Link
                  to="/ai-seo-audit"
                  className="text-[11px] text-muted-foreground hover:text-primary transition-colors font-light"
                >
                  AI SEO Audit
                </Link>
              </li>
              <li>
                <Link
                  to="/llms-txt"
                  className="text-[11px] text-muted-foreground hover:text-primary transition-colors font-light"
                >
                  LLMs.txt Generator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-5" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-muted-foreground font-light">
            © 2025 AI Monitor. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/privacy"
              className="text-[11px] text-muted-foreground hover:text-primary transition-colors font-light"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-[11px] text-muted-foreground hover:text-primary transition-colors font-light"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
