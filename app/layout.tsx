"use client";

import { ConfigProvider } from "antd";

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#E53935",
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}