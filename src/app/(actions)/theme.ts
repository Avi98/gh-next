"use server";

import { z } from "zod";
import { ssrRedirect, withAuth } from "~/lib/server-utils";
import { getSession } from "./auth";
import { cache } from "react";
import { updateUserTheme } from "~/app/(models)/user";
import { revalidatePath } from "next/cache";

import { users } from "~/lib/db/schema/user.sql";
import { createSelectSchema } from "drizzle-zod";

const userThemeSchema = createSelectSchema(users).pick({
  preferred_theme: true,
});
const themeSchema = userThemeSchema.shape.preferred_theme;

export type Theme = z.TypeOf<typeof themeSchema>;

export const getTheme = cache(async function getTheme() {
  const session = await getSession();

  return session.user?.preferred_theme ?? "system";
});

export const updateTheme = withAuth(async function updateTheme(
  formData: FormData
) {
  const themeResult = themeSchema.safeParse(formData.get("theme")?.toString());
  const session = await getSession();

  revalidatePath(`/`);

  if (!themeResult.success) {
    await session.addFlash({
      type: "warning",
      message: "Invalid theme provided, please retry",
    });
    return;
  }

  const theme = themeResult.data;

  await updateUserTheme(theme, session.user!.id);
  await session.setUserTheme(theme);

  await session.addFlash({
    type: "success",
    message: `Theme changed to ${theme}`,
  });

  // FIXME: Until this issue is fixed : https://github.com/vercel/next.js/issues/54030
  ssrRedirect("/settings/appearance");
});
