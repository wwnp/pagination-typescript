import { Button, Pagination, Container, TextField, Stack, Link } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';

const BASE_URL = 'http://hn.algolia.com/api/v1/search?'

function App() {
  const [posts, setPosts] = useState<any[]>([])
  const [query, setQuery] = useState('react')
  const [page, setPage] = useState(1)
  const [pageQty, setPageQty] = useState(0)
  useEffect(() => {
    axios.get(BASE_URL + `query=${query}&page=${page - 1}`).then(({ data }) => {
      console.log(data)
      setPosts(data.hits)
      setPageQty(data.nbPages)
    })
  }, [query, page])
  return (
    <Container>
      <TextField
        fullWidth
        label="query"
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
      >
      </TextField>
      <Stack spacing={5}>
        {!!pageQty && (
          < Pagination
            count={pageQty}
            color="secondary"
            page={page}
            onChange={(_, num) => setPage(num)}
          />
        )}
        {
          posts.length
            ? posts.map(post => {
              return (
                <Link
                  key={post.objectID}
                  href={post.url}
                >
                  {post.title}
                </Link>
              )
            })
            : <h1>123</h1>
        }

      </Stack>

      <Button variant="contained">Text</Button>
    </Container>
  );
}

export default App;
