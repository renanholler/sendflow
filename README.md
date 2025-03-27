# 📨 SendFlow

Aplicacao fullstack desenvolvida como teste tecnico, utilizando **React**, **Firebase** e **Material UI**, com foco em envio de mensagens agendadas.

## ✅ Funcionalidades

- Autenticacao com Firebase Auth (Sign In / Sign Up)
- Formato SaaS: cada usuario vê apenas seus dados
- Gerenciamento de **conexões** (nome da conexao)
- Cada conexão possui seus **contatos** (nome + telefone)
- Envio de **mensagens agendadas**
  - Seleção de múltiplos contatos
  - Disparo simulado com agendamento (via Firebase Functions)
- Visualização de mensagens com filtros por status (enviadas/agendadas)
- Atualização automática em tempo real com Firestore

## 🚀 Tecnologias Utilizadas

- **React + Vite + TypeScript**
- **Firebase** (Auth, Firestore, Functions, Hosting)
- **Material UI + TailwindCSS**
- Arquitetura modular e organizada (Context API + Hooks + Services)

## ⚒️ Como rodar localmente

```bash
pnpm install
pnpm dev
```

Voce precisa configurar um arquivo `.env` com as chaves do Firebase:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## 🌐 Deploy

Hospedado com **Firebase Hosting**  
🔗 https://sendflow-teste-tecnico.web.app/
