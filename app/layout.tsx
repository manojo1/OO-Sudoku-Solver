import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Object Oriented Sudoku Solver",
  description: "Sudoku solver with generic algortihm capabale of solving sudoku of any grid size. This implementation also allows mutiple solver strategy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="banner">Object Oriented Sudoku Solver</div>
        {children}
      </body>
    </html>
  );
}
