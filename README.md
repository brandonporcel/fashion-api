# 👗 FashionAPI

[FashionAPI](https://brandonporcel-fashionapi.vercel.app/) is a RESTful API that provides structured data about fashion, including designers, runway shows, collections, models, brands, and fashion critics.

> For the Spanish version of this README, click [here](README_ES.md).

## 🌍 Live Documentation (Swagger UI)

Explore the API interactively with our [Swagger documentation](https://brandonporcel-fashionapi.vercel.app/docs).

## 📌 Some endpoints

<details>
    <summary><code>GET /critics</code></summary>
    Returns a list of fashion critics, bloggers, and influencers.
    <table>
        <thead>
            <tr>
                <th>Key</th>
                <th>Type</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><code>name</code></td>
                <td>string</td>
                <td>Name of the critic</td>
            </tr>
            <tr>
                <td><code>social_links</code></td>
                <td>object</td>
                <td>Twitter, Instagram, Facebook, LinkedIn, YouTube, website</td>
            </tr>
            <tr>
                <td><code>description</code></td>
                <td>string</td>
                <td>Brief description</td>
            </tr>
            <tr>
                <td><code>type</code></td>
                <td>string</td>
                <td>Youtuber, blogger, magazine, etc.</td>
            </tr>
        </tbody>
    </table>
</details>

<details>
    <summary><code>GET /quotes</code></summary>
    Returns famous quotes from designers and fashion icons.
</details>

<details>
    <summary><code>GET /designers</code></summary>
    Provides information about fashion designers.
</details>

<details>
    <summary><code>GET /runways</code></summary>
    Details of fashion runway shows.
</details>

<details>
    <summary><code>GET /collections</code></summary>
    Represents fashion collections by season and year.
</details>

<details>
    <summary><code>GET /models</code></summary>
    List of fashion models.
</details>

<details>
    <summary><code>GET /brands</code></summary>
    Fashion brands and houses.
</details>

## 🏢 Install

```bash
git clone https://github.com/brandonporcel/fashion-api.git
cd fashion-api
npm run start:dev
```

## 📋 TODO List

- [ ] Make sdk.
- [ ] Implement authentication for users to complete database.
- [ ] Endpoint icons personalies in fashion (maradona, denis rodman, etc).
- [ ] runway_designers. uuid, runway_id (FK), designer_id (FK), created_at, updated_at. un diseñador puede trabajara para distintas marcas, runways
- [ ] chequear como hacer con las imagenes de runways, critics
- [ ] designer_tags
- [ ] Buzqueda indezada (https://youtu.be/Osy0yuxuEOw?si=ZrZ6mBrukJHTNmf9)
- [ ] que los contributors puedan dar detalles sobre x imagen de desfile como genius. check imagenes
- [ ] en un futuro laburar con insignias como musixmatch
- [ ] usar cloudinary
- [ ] host a db https://www.linkedin.com/posts/midudev_hostings-para-tu-base-de-datos-sin-pagar-activity-7219683962527330304-ZQ37/

## Technologies Used

- PostgreSQL
- NestJS
- Prisma

## Feedback

I’d love to hear your thoughts! Contact me via [email](mailto:brandon7.7porcel@gmail.com) or [LinkedIn](https://www.linkedin.com/in/brandonporcel/).

### 🚀 ¡Explore the world of fashion with FashionAPI! 👠✨
