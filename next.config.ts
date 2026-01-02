import { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Habilita o modo estrito do React
  reactStrictMode: true,

  // Configuração do ESLint - Ignora erros durante o build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Suporte a formatos de imagem
  images: {
    formats: ["image/webp"], // Adiciona suporte ao formato WebP
  },

  // Configurações experimentais do Turbopack
  experimental: {
    turbo: {},
  },

  // Transpila pacotes específicos
  transpilePackages: ["notification"],

  // Configura saída standalone
  output: "standalone",

  // Configuração de rewrites para proxy
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.pipelinesolucoes.com.br/:path*',
      },
    ];
  },
};

export default nextConfig;



