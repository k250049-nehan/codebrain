import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { AuthProvider } from '@/context/AuthContext';
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
        <AuthProvider>
          <CustomCursor />
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}