"use client";
import * as React from "react";
// components
import { DropdownMenu } from "./dropdown-menu";
import { Avatar } from "./avatar";
import {
  PaintbrushIcon,
  PersonIcon,
  SignOutIcon,
} from "@primer/octicons-react";

// utils
import { logoutUser } from "~/app/(actions)/auth";

// types
export type UserDropdownProps = {
  avatar_url: string;
  username: string;
};

export function UserDropdown({ avatar_url, username }: UserDropdownProps) {
  const [_, startTransition] = React.useTransition();
  return (
    <DropdownMenu
      className="min-w-fit flex items-center"
      items={[
        {
          href: "/settings/account",
          text: "Your account",
          icon: PersonIcon,
        },
        {
          href: "/settings/appearance",
          text: "Change Theme",
          icon: PaintbrushIcon,
        },
        {
          text: "Sign out",
          icon: SignOutIcon,
          onClick: async () => {
            startTransition(() => logoutUser());
          },
        },
      ]}
    >
      <button type="button">
        <Avatar username={username} src={avatar_url} />
      </button>
    </DropdownMenu>
  );
}