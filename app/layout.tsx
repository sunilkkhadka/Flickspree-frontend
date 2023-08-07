import AdminNav from "@/components/AdminNav";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Admin Panel",
  description: "Admin panel for flickspree",
};

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div
          style={{
            display: "flex",
          }}
        >
          <AdminNav />
          <div>
            <h1>Admin Panel</h1>

            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
