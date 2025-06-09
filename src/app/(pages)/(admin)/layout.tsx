// Importação do arquivo de estilos globais para aplicar estilos em toda a aplicação
import { ToastContainer } from "react-toastify";
import "../globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: "",
  icons: {
    icon: `${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/static/favicon.ico`,      
    shortcut: `${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/static/favicon.ico`,  
    apple: `${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/static/favicon.ico`,  
  },
};

// Definição do componente `RootLayout`, que serve como layout raiz da aplicação
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Define que `children` pode ser qualquer nó React
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-900  min-h-[100dvh] flex flex-col">
        {/* O conteúdo da aplicação será renderizado aqui */}
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
