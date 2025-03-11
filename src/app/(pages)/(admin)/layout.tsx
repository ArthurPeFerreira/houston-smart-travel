// Importação do arquivo de estilos globais para aplicar estilos em toda a aplicação
import { ToastContainer } from "react-toastify";
import "../globals.css";

// Definição do componente `RootLayout`, que serve como layout raiz da aplicação
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Define que `children` pode ser qualquer nó React
}>) {
  return (
    <html lang="en">
      <body className="h-screen bg-gray-900">
        {/* O conteúdo da aplicação será renderizado aqui */}
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
