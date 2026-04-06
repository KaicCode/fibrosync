# Landing Page Fibrosync

Esta é uma aplicação web desenvolvida com [Next.js](https://nextjs.org/) (App Router), projetada para ser a landing page do projeto Fibrosync. Ela utiliza uma stack moderna de front-end com foco em performance, acessibilidade e design responsivo.

## 🛠 Tecnologias e Partes do Projeto

O projeto está dividido e organizado utilizando as seguintes tecnologias principais:

- **Framework**: `Next.js 16` utilizando o App Router (`app/`).
- **Linguagem**: `TypeScript` para tipagem estática e maior segurança no desenvolvimento.
- **Estilização**:
  - `Tailwind CSS v4` para estilos utilitários rápidos e sob demanda.
  - `tw-animate-css` para animações nativas.
  - `clsx` e `tailwind-merge` para mesclagem de diretrizes utilitárias do Tailwind.
- **Componentes de UI / Acessibilidade**:
  - Componentes baseados em `@radix-ui/react` com implementação no padrão [shadcn/ui](https://ui.shadcn.com/), que permite construir interfaces incríveis e totalmente acessíveis.
  - Ícones flexíveis com a biblioteca `lucide-react`.
  - Componentes interativos de visualização de dados via `recharts`.
  - Elementos extras de interface como `sonner` para toasts (mensagens flutuantes) e `vaul` para gavetas (drawers).
- **Formulários e Validação**:
  - `react-hook-form` aliado ao `zod` para criar e validar formulários com alta robustez e tipagem garantida.
- **Gerenciamento de Pacotes**: `pnpm` apontado através do gerenciamento local do *lockfile*.

## 📁 Estrutura de Pastas

- `/app`: Roteamento principal do Next.js (Páginas, Layouts globais e `globals.css`).
- `/components`: Alojamento dos componentes de UI reutilizáveis.
- `/hooks`: Hooks React customizados para a lógica da aplicação.
- `/lib`: Funções puras utilitárias, tipagens comuns e configurações globais do cliente ou do servidor.
- `/public`: Imagens, SVGs, ícones e fontes servidas de forma estática.
- `/styles`: Definições globais ou arquivos base complementares ao Tailwind.

---

## 🚀 Como Rodar o Projeto (Localmente)

Siga os passos abaixo para rodar o projeto de forma eficiente. É necessário possuir o **Node.js** instalado na sua máquina, além do **pnpm**.

### 1. Navegue até a pasta do projeto

Abra o seu terminal na raiz do projeto:
```bash
cd "caminho/para/landing page Fibrosync"
```

### 2. Instalar Dependências

Este repositório utiliza o `pnpm` para uma instalação mais rápida e armazenamento eficiente de pacotes. Execute:
```bash
pnpm install
```
*(Caso não possua o pacote instalado na máquina, você pode inserí-lo globalmente rodando `npm install -g pnpm` previamente).*

### 3. Iniciar o Servidor de Desenvolvimento

Suba o ambiente de desenvolvimento local executando o seguinte script:
```bash
pnpm build
pnpm start
```

### 4. Acessar a Interface

Por fim, abra o seu navegador de preferência e visite a URL de rede local padrão construída pelo Next.js:
[http://localhost:3000](http://localhost:3000)

*(Hot-reloading está ativado: edite o código na pasta `/app` ou `/components` e a página será atualizada automaticamente)*

### 5. Compilar para Produção (Build Opcional)

Se desejar empacotar o software localmente simulando as otimizações completas do ambiente de produção (para verificar se não existem quebras ou erros de compilação), faça:
```bash
pnpm run build
pnpm run start
```
