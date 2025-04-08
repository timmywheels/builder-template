import { useState, useEffect } from "react";
import { useSearch, useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { Route as ResetPasswordRoute } from "@/routes/reset-password";
import { Loader2, Mail } from "lucide-react";

export function ResetPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isValidatingToken, setIsValidatingToken] = useState(true);
  const search = useSearch({ from: ResetPasswordRoute.id });
  const navigate = useNavigate({ from: ResetPasswordRoute.id });
  const { resetPassword, isResetPasswordPending, resetPasswordError } = useAuth();

  console.log("Auth hook contents:", { resetPassword, isResetPasswordPending, resetPasswordError });

  const token = search.token;
  const isPending = Boolean(search.pending);

  // Log query params on mount
  useEffect(() => {
    console.log("Reset password page mounted with params:", { token, isPending });
  }, [token, isPending]);

  // Check token when component mounts
  useEffect(() => {
    async function checkToken() {
      if (token) {
        // Show pending state while "validating" token
        await navigate({
          search: {
            token,
            pending: true,
          },
          replace: true,
        });

        // Simulate token validation (we don't have a real validation endpoint)
        // In a real app, you'd call an API to validate the token
        setTimeout(async () => {
          setIsValidatingToken(false);

          // Remove pending once token is "validated"
          await navigate({
            search: {
              token,
              pending: undefined,
            },
            replace: true,
          });
        }, 1000);
      } else if (!token) {
        setIsValidatingToken(false);
        setError("Missing token. Please use the link from your email.");
      }
    }

    checkToken();
  }, [token, navigate]);

  useEffect(() => {
    if (!isPending && !token) {
      setError("Missing token or email. Please use the link from your email.");
    }
  }, [token, isPending]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with values:", { password, confirmPassword, token });
    setError(null);

    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!token) {
      setError("Missing token. Please use the link from your email.");
      return;
    }

    // Add pending query parameter to show loading state
    await navigate({
      search: {
        token,
        pending: true,
      },
      replace: true,
    });

    // Attempt to reset password
    try {
      console.log("About to call resetPassword with:", { password, token });
      console.log("Trying hook method resetPassword");
      resetPassword({
        password,
        token,
      });

      console.log("Reset password hook call successful");

      // If successful, navigate to login page
      await navigate({
        to: "/login",
        replace: true,
      });
    } catch (error) {
      console.error("Reset password error:", error);
      // If there's an error, remove the pending state
      await navigate({
        search: {
          token,
          pending: undefined,
        },
        replace: true,
      });
    }
  };

  const isDisabled = isPending || isResetPasswordPending;
  const isLoading = isPending || isValidatingToken;

  const renderContent = () => {
    // Show loading spinner when validating token or processing reset
    if (isLoading && token) {
      return (
        <div className="flex flex-col items-center justify-center py-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
          <p className="text-sm text-muted-foreground">Verifying your request...</p>
        </div>
      );
    }

    // Show email icon when pending is true but token is missing
    if (isPending) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-1">Check Your Email</h3>
          <p className="text-sm text-muted-foreground text-center max-w-xs">
            We've sent you a password reset link. Please check your inbox and follow the
            instructions.
          </p>
        </div>
      );
    }

    // Show the form as default
    return (
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {(error || resetPasswordError) && (
            <Alert variant="destructive">
              <AlertDescription>
                {error ||
                  resetPasswordError?.message ||
                  "Failed to reset password. Please try again."}
              </AlertDescription>
            </Alert>
          )}
          <div className="grid gap-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isDisabled}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isDisabled}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isDisabled}>
            {isResetPasswordPending ? "Resetting..." : "Reset Password"}
          </Button>
        </div>
      </form>
    );
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {isPending && !token ? "Check Your Email" : "Reset Password"}
          </CardTitle>
          <CardDescription>
            {isPending && !token
              ? "We've sent you a link to reset your password"
              : "Enter your new password"}
          </CardDescription>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </div>
  );
}
