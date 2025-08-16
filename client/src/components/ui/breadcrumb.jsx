import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

const Breadcrumb = React.forwardRef((props, ref) => (
  <nav ref={ref} aria-label="breadcrumb" {...props} />
));
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef((props, ref) => {
  const { className, ...otherProps } = props;
  return (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        className
      )}
      {...otherProps}
    />
  );
});
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef((props, ref) => {
  const { className, ...otherProps } = props;
  return (
    <li
      ref={ref}
      className={cn("inline-flex items-center gap-1.5", className)}
      {...otherProps}
    />
  );
});
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef((props, ref) => {
  const { asChild, className, ...otherProps } = props;
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...otherProps}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef((props, ref) => {
  const { className, ...otherProps } = props;
  return (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...otherProps}
    />
  );
});
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = (props) => {
  const { children, className, ...otherProps } = props;
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...otherProps}
    >
      {children ?? <ChevronRight />}
    </li>
  );
};
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = (props) => {
  const { className, ...otherProps } = props;
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...otherProps}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More</span>
    </span>
  );
};
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}