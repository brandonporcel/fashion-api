# 👗 FashionAPI

FashionChannelAPI es una API RESTful que proporciona datos estructurados sobre moda, incluyendo diseñadores, desfiles de moda, colecciones, modelos, marcas y críticos de moda.

> Para la versión en inglés de este README, haz clic [aquí](README.md).

## 🌍 Documentación en vivo (Swagger UI)

Explora la API de manera interactiva con nuestra [documentación Swagger](https://fashion-api-1-74i5.onrender.com/docs).

## 🏢 Instalación & Uso

Para correr la API en local:

```bash
git clone https://github.com/brandonporcel/fashion-api.git
cd fashion-api
npm install
npm run start:dev
```

Crea un archivo `.env` con la configuración de tu base de datos:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/fashionapi
PORT=3000
```

Corre las migraciones para inicializar la base de datos:

```bash
npx prisma migrate dev
```

## 📋 TODO List

- [ ] Hacer sdk.
- [ ]Implementar autenticación para agregar favoritos.

## Tecnologías utilizadas

- PostgreSQL
- NestJS
- Prisma

## 📩 Feedback

¿Tienes ideas para mejorar la API? Contáctame:  
💎 [Correo](mailto:brandon7.7porcel@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/brandonporcel/)

### 🚀 ¡Explora el mundo de la moda con FashionAPI! 👠✨
