import { createFileRoute, redirect, useSearch, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Brand } from "@/components/brand";

export const Route = createFileRoute("/confirm-account")({
  component: ConfirmAccountComponent,
  validateSearch: z.object({
    token: z.string().optional(),
    email: z.string().optional(),
  }),
});

function ConfirmAccountComponent() {
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const search = useSearch({ from: "/confirm-account" });
  const navigate = useNavigate();
  const { confirmAccount } = useAuth();

  useEffect(() => {
    const confirmUserAccount = async () => {
      const token = search.token;
      const email = search.email;

      if (!token || !email) {
        setError("Missing token or email. Please use the link from your email.");
        return;
      }

      setIsConfirming(true);
      try {
        confirmAccount({ email, token });
        setSuccess(true);
        // After successful confirmation, the user will be redirected to login
        // with a token in the URL (handled by the API)

        navigate({ to: "/login" });
      } catch (err) {
        setError("Failed to confirm your account. The link may have expired or is invalid.");
      } finally {
        setIsConfirming(false);
      }
    };

    confirmUserAccount();
  }, [search.token, search.email, confirmAccount, navigate]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Brand />
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Account Confirmation</CardTitle>
            <CardDescription>
              {isConfirming
                ? "Confirming your account..."
                : success
                ? "Your account has been confirmed!"
                : "We're verifying your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="grid gap-4">
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
                <Button onClick={() => navigate({ to: "/login" })} className="w-full">
                  Back to Login
                </Button>
              </div>
            ) : success ? (
              <div className="grid gap-4 text-center">
                <p>
                  Your account has been successfully confirmed. You will be redirected to the login
                  page.
                </p>
                <Button onClick={() => navigate({ to: "/login" })} className="w-full">
                  Go to Login
                </Button>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
