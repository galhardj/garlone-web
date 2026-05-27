import Footer from "@/src/components/common/Footer";
import NavigationMenuBar from "@/src/components/mock-model/shadcn/NavigationMenu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: move 'sticky' style inside NavigationMenuBar
  return (
    <>
      <NavigationMenuBar />
      <main className="min-h-dvh">{children}</main>
      <Footer />
    </>
  );
}
