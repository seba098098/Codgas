# Codgas
es un inventario que se llevarar para control de cilindros y cargas


# Codgas – Sistema de Autenticación (React + Google Apps Script)

## 📌 Descripción
Sistema de autenticación y administración de usuarios desarrollado en React, con backend en Google Apps Script y persistencia en Google Sheets y Google Drive. para fotos CLOUDINARY

Incluye control por roles, manejo de tokens, administración de usuarios y perfil.

---

## 🚀 Tecnologías
- React
- Google Apps Script
- Google Sheets
- Google Drive
- JWT custom (HMAC SHA-256)
-CLOUDINARY (imagenes)

---

## 🔐 Funcionalidades
### Usuario
- Login
- Logout
- Cambio de contraseña
- Actualización de foto de perfil

### Administrador
- Registro de usuarios
- Asignación de roles
- Reset de contraseñas
- Eliminación de usuarios
- Listado de usuarios

---

## 🧱 Arquitectura
- Frontend desacoplado del backend
- Comunicación por API única (`apiClient.js`)
- Seguridad basada en tokens
- Roles gestionados desde Sheets

---

## ▶️ Ejecución
```bash
npm install
npm start
