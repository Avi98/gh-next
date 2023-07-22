"use client";
import * as React from "react";
// components
import { VerticalNavLink } from "./vertical-nav-link";
import { GearIcon, PaintbrushIcon } from "@primer/octicons-react";

export type VerticalNavlistProps = {};

export function VerticalNavlist({}: VerticalNavlistProps) {
  return (
    <aside>
      <nav>
        <ul className="flex flex-col gap-1 w-full">
          <li>
            <VerticalNavLink href="/settings/account" icon={GearIcon}>
              Account
            </VerticalNavLink>
          </li>
          <li>
            <VerticalNavLink href="/settings/appearance" icon={PaintbrushIcon}>
              Appearance
            </VerticalNavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}