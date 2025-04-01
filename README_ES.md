# 👗 FashionAPI

[FashionAPI](https://brandonporcel-fashionapi.vercel.app/) es una API RESTful que proporciona datos estructurados sobre moda, incluyendo diseñadores, desfiles de moda, colecciones, modelos, marcas y críticos de moda.

> Para la versión en inglés de este README, haz clic [aquí](README.md).

## 🌍 Documentación en vivo (Swagger UI)

Explora la API de manera interactiva con nuestra [documentación Swagger](https://brandonporcel-fashionapi.vercel.app/docs).

## 📌 Algunos endpoints

<details>
    <summary><code>GET /critics</code></summary>
    Devuelve una lista de críticos de moda, bloggers e influencers.
    <table>
        <thead>
            <tr>
                <th>Clave</th>
                <th>Tipo</th>
                <th>Descripción</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><code>name</code></td>
                <td>string</td>
                <td>Nombre del crítico</td>
            </tr>
            <tr>
                <td><code>social_links</code></td>
                <td>objeto</td>
                <td>Twitter, Instagram, Facebook, LinkedIn, YouTube, sitio web</td>
            </tr>
            <tr>
                <td><code>description</code></td>
                <td>string</td>
                <td>Descripción breve</td>
            </tr>
            <tr>
                <td><code>type</code></td>
                <td>string</td>
                <td>Youtuber, blogger, revista, etc.</td>
            </tr>
        </tbody>
    </table>
</details>

<details>
    <summary><code>GET /quotes</code></summary>
    Devuelve frases famosas de diseñadores e íconos de la moda.
</details>

<details>
    <summary><code>GET /designers</code></summary>
    Proporciona información sobre diseñadores de moda.
</details>

<details>
    <summary><code>GET /runways</code></summary>
    Detalles de los desfiles de moda.
</details>

<details>
    <summary><code>GET /collections</code></summary>
    Representa colecciones de moda por temporada y año.
</details>

<details>
    <summary><code>GET /models</code></summary>
    Lista de modelos de moda.
</details>

<details>
    <summary><code>GET /brands</code></summary>
    Marcas y casas de moda.
</details>

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
