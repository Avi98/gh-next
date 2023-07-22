"use client";
import * as React from "react";

// components
import { HomeIcon } from "@primer/octicons-react";
import { Button } from "../(components)/button";

// utils
import { Inter } from "next/font/google";
import { clsx } from "../../lib/functions";

const inter = Inter({ subsets: ["latin"] });

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="charset" content="utf-8" />
        <title>Something went wrong !</title>
      </head>
      <body
        className={clsx(inter.className, "bg-backdrop")}
        suppressHydrationWarning
      >
        <section className="h-[80vh] flex flex-col gap-4 items-center justify-center text-foreground">
          <h1 className="text-4xl font-bold">OOPS ! An error occured</h1>

          <h2 className="text-2xl">
            Please reset the page, if that does not work, reload the page
            instead.
          </h2>

          <Button
            onClick={() => reset()}
            className="inline-flex gap-2 items-center !text-foreground !border-foreground"
            variant="invisible"
          >
            <HomeIcon className="h-4 w-4" />
            Reset the page
          </Button>
        </section>
      </body>
    </html>
  );
}