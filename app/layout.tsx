import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import CustomCursor from '@/components/CustomCursor';
import './globals.css';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'CodeBrain - Learn to Code Interactively',
  description: 'AI-powered interactive coding learning platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}