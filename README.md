<div align="center">
  <image height="32em" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <image height="32em" src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white" />
  <image height="32em" src="https://shields.io/badge/react-black?logo=react&style=for-the-badge" />
  <image height="32em" src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black"/>
  <image height="32em" src="https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC" />
  <image height="32em" src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" />
</div>
<br>
<br>
<img width="500" src="https://github.com/user-attachments/assets/659959c2-49d0-4429-b68e-dd84a3f85a3c" />
<img width="500" src="https://github.com/user-attachments/assets/8708cd9e-33e6-4d20-8f4e-245516fd80ea" />
<img width="500" src="https://github.com/user-attachments/assets/c1ea113e-8113-499c-8e0a-283c76cdc639" />
<img width="500" src="https://github.com/user-attachments/assets/8a1d9deb-4fd9-4e6b-8f54-b1f896e0d847" />


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

Você precisa configurar um arquivo `.env` com as chaves do Firebase:

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
