import { Inter } from "next/font/google";

export const metadata = {
  title: "Admin Panel",
  description: "Admin panel for flickspree",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
