"use client";

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import React from 'react'

export type DropDownItem = {
  id: string;
  action: "link" | (() => void);
  content: React.ReactNode;
  href?: string;
} & ({ action: "link"; href: string } | { action: () => void; href?: never });

interface ConditionalWrapperProps {
  condition: boolean;
  wrapper: (children: React.ReactNode) => React.ReactNode;
  children: React.ReactNode;
}
function ConditionalWrapper({ condition, wrapper, children }: ConditionalWrapperProps) {
  return condition ? wrapper(children) : children;
}

export default function DropDownItem(item: DropDownItem) {
  return (
    <ConditionalWrapper
      condition={item.action === "link"}
      wrapper={(children) => (
        <Link href={item.href!}>
          {children}
        </Link>
      )}
    >
      <DropdownMenuItem
        className="hover:cursor-pointer"
        onClick={item.action === "link" ? undefined : item.action}
      >
        {item.content}
      </DropdownMenuItem>
    </ConditionalWrapper>
  )
}
