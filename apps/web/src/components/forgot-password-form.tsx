import { useState } from "react";
import { useSearch, useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { Link } from "@tanstack/react-router";
import { Route as ForgotPasswordRoute } from "@/routes/forgot-password";
import { Mail } from "lucide-react";

export function ForgotPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const search = useSearch({ from: ForgotPasswordRoute.id });
  const navigate = useNavigate({ from: ForgotPasswordRoute.id });
  const isPending = Boolean(search.pending);
  const { requestPasswordReset, isPasswordResetRequestPending, passwordResetRequestError } =
    useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    try {
      await requestPasswordReset({ email });

      // Add pending query parameter to show check email state
      await navigate({
        search: {
          ...search,
          pending: true,
        },
        replace: true,
      });
    } catch (error) {
      // Error handling is already done by useAuth
    }
  };

  if (isPending) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Check Your Email</CardTitle>
            <CardDescription>
              We've sent a password reset link to your email address
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <p className="text-center text-sm text-muted-foreground max-w-xs mb-6">
                Please check your inbox and follow the instructions to reset your password.
              </p>
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Back to Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address and we will send you a link to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              {passwordResetRequestError && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {passwordResetRequestError.message ||
                      "Failed to send reset link. Please try again."}
                  </AlertDescription>
                </Alert>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isPasswordResetRequestPending}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isPasswordResetRequestPending}>
                {isPasswordResetRequestPending ? "Sending..." : "Reset Password"}
              </Button>
              <div className="text-center text-sm">
                <Link to="/login" className="underline underline-offset-4">
                  Back to Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
