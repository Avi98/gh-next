"use client";

import * as React from "react";
import {
  OverlayArrow,
  Tooltip as ReactAriaTooltip,
  TooltipProps as ReactAriaTooltipProps,
  TooltipTrigger,
} from "react-aria-components";
import { clsx } from "~/lib/shared-utils";

export type TooltipProps = {
  children?: React.ReactNode;
  content?: React.ReactNode;
  delayInMs?: number;
  closeDelayInMs?: number;
} & Pick<ReactAriaTooltipProps, "placement" | "isOpen">;

export function Tooltip({
  children,
  content,
  delayInMs = 150,
  closeDelayInMs = 150,
  placement,
  isOpen = true,
}: TooltipProps) {
  return (
    <TooltipTrigger
      delay={delayInMs}
      closeDelay={closeDelayInMs}
      isOpen={isOpen}
    >
      {children}
      <ReactAriaTooltip
        offset={5}
        placement={placement}
        className={clsx("bg-grey px-2 py-1 rounded-md group/tooltip", {})}
      >
        <OverlayArrow>
          <svg
            width={8}
            height={8}
            className="fill-grey group-data-[placement=left]/tooltip:-rotate-90"
          >
            <path d="M0 0,L4 4,L8 0" />
          </svg>
        </OverlayArrow>

        {content}
      </ReactAriaTooltip>
    </TooltipTrigger>
  );
}