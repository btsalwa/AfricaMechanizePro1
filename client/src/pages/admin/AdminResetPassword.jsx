import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Shield, ArrowLeft, Mail } from "lucide-react";

const resetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function AdminResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const resetMutation = useMutation({
    mutationFn: async (data) => {
      const response = await apiRequest("POST", "/api/admin/reset-password", data);
      return await response.json();
    },
    onSuccess: () => {
      setEmailSent(true);
      toast({
        title: "Reset email sent",
        description: "Check your email for password reset instructions",
      });
    },
    onError: (error) => {
      toast({
        title: "Reset failed",
        description: error.message || "Unable to send reset email",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    resetMutation.mutate(data);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="w-full max-w-md p-6">
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-green-600">
                Email Sent
              </CardTitle>
              <CardDescription>
                We've sent password reset instructions to your email address. Please check your inbox and follow the link to reset your password.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Button
                onClick={() => window.location.href = "/admin/login"}
                className="w-full"
                variant="outline"
                data-testid="button-back-to-login"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md p-6">
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Reset Password
            </CardTitle>
            <CardDescription>
              Enter your admin email address and we'll send you instructions to reset your password
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Admin Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your admin email"
                          disabled={isLoading}
                          data-testid="input-admin-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                  disabled={isLoading}
                  data-testid="button-reset-password"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {isLoading ? "Sending..." : "Send Reset Instructions"}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <Button
                variant="link"
                className="text-sm text-muted-foreground"
                onClick={() => window.location.href = "/admin/login"}
                data-testid="link-back-to-login"
              >
                <ArrowLeft className="w-3 h-3 mr-1" />
                Back to Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}