"use client";
import * as React from "react";
// components
import { Button } from "./button";
import { Input } from "./input";

// utils
import { updateUserName } from "~/app/(actions)/auth";
import { useRouter } from "next/navigation";
import { useForm } from "~/lib/hooks/use-form";

// types
import type { FormErrors } from "~/lib/types";

export type ChangeUsernameFormProps = {
  defaultValue: string;
  errors?: FormErrors;
};

export function ChangeUsernameForm({
  defaultValue,
  errors,
}: ChangeUsernameFormProps) {
  const { Form, isPending } = useForm(updateUserName, {
    onSubmit() {
      return confirm("Are you sure about this ?");
    },
  });

  const router = useRouter();

  React.useEffect(() => {
    return () => {
      if (errors) {
        // Refresh the router because we don't want to keep old values on mount (errors, defaultValue)
        return React.startTransition(() => router.refresh());
      }
    };
  }, [router, errors]);

  return (
    <Form className="flex flex-col gap-4 items-stretch md:items-start">
      <Input
        name="username"
        label="New username"
        placeholder="ex: johndoe"
        required
        defaultValue={defaultValue}
        validationStatus={!!errors?.username ? "error" : undefined}
        validationText={errors?.username}
        helpText="must be an alphanumeric character without any space or special chars, starting with a letter"
      />
      <Button isLoading={isPending} variant="ghost">
        {isPending ? "Updating your username..." : "Change username"}
      </Button>
    </Form>
  );
}