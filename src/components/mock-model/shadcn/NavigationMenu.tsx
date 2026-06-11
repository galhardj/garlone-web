import Link from "next/link";
import { getAuthUser } from "@/src/lib/supabase";
import { cn } from "@/src/lib/utils";

// import { useIsMobile } from "@/hooks/use-mobile"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { LogoutButton } from "./LogoutButton";

const navBarVariants = {
  default: {
    container: "",
    item: "",
  },
  "fixed-transparent": {
    container:
      "bg-background/30 fixed top-0 z-50 w-full max-w-none rounded-b-md backdrop-blur-sm",
    item: "bg-transparent",
  },
} as const;

type NavBarVariant = keyof typeof navBarVariants;

interface NavigationMenuBarProps {
  variant?: NavBarVariant;
  className?: string;
}

export default async function NavigationMenuBar({
  variant = "default",
  className,
}: NavigationMenuBarProps) {
  //   const isMobile = useIsMobile()
  const authUser = await getAuthUser();
  const styles = navBarVariants[variant];
  const itemStyle = cn(navigationMenuTriggerStyle(), styles.item);

  return (
    <div className="bg-background absolute top-0 z-50 w-full">
      <NavigationMenu
        className={cn("mx-auto py-6", styles.container, className)}
      >
        <NavigationMenuList className="flex-wrap">
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={itemStyle}>
              <Link href="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={itemStyle}>
              <Link href="/about">About</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={itemStyle}>
              <Link href="/products">Products</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuTrigger className={styles.item}>
              Component work
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white">
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href="/css-framework">CSS plugin pages</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href="/ui-in-the-work">UI in the work</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {!!authUser && (
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={itemStyle}>
                <Link href="/dashboard">Dashboard</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
          <NavigationMenuItem>
            {!!authUser ? (
              <LogoutButton className={itemStyle} />
            ) : (
              <NavigationMenuLink asChild className={itemStyle}>
                <Link href="/login">Login</Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
