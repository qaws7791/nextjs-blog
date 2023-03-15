|               | Page                 |     |     |     |
| ------------- | -------------------- | --- | --- | --- |
| 홈페이지      | /                    |     |     |     |
| 모든 포스트   | /post                | CSR |     |     |
| 개별 포스트   | /post/[slug]         | SSG |     |     |
| 모든 글쓴이   | /author              | SSG |     |     |
| 개별 글쓴이   | /author/[slug]       | SSG |     |     |
| 모든 카테고리 | /category            | SSG |     |     |
| 개별 카테고리 | /category/[category] | SSG |     |     |
|               |                      |     |     |     |
|               |                      |     |     |     |

run the Nextjs dev server:

```bash
npm run dev
```

run the Sanity dev server:

```bash
sanity dev
```

## deploy

1. Nextjs -> `github push` to https://vercel.com/
2. Sanity -> `sanity deploy`
