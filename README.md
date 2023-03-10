| Page                 |               |     |     |
| -------------------- | ------------- | --- | --- |
| /                    | 홈페이지      |     |     |
| /posts               | 모든 포스트   |     |     |
| /posts/[slug]        | 개별 포스트   |     |     |
| /author              | 모든 글쓴이   |     |     |
| /author/[slug]       | 개별 글쓴이   |     |     |
| /category            | 모든 카테고리 |     |     |
| /category/[category] | 개별 카테고리 |     |     |
|                      |               |     |     |
|                      |               |     |     |

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
