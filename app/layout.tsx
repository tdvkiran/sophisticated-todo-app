"use client";

import type { PropsWithChildren } from "react";
import { ConfigProvider } from "antd";
import "./globals.css";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#c2410c",
              colorInfo: "#c2410c",
              borderRadius: 18,
              colorBgContainer: "#fffaf5",
              colorText: "#1f2937",
              fontFamily:
                '"Avenir Next", "Segoe UI", "Helvetica Neue", sans-serif',
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
