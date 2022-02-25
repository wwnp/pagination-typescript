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
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (query.length >= 3) {
      setLoading(true)
      axios.get(BASE_URL + `query=${query}&page=${page - 1}`).then(({ data }) => {
        setPosts(data.hits)
        setPageQty(data.nbPages)
        if (data.nbPages < page) {
          setPage(1)
        }
        setLoading(false)
      })
    }

  }, [query, page])
  const out = () => {
    if (loading) {
      return <h1>Loading</h1>
    }
    if (posts.length) {
      return posts.map(post => {
        console.log(post)
        return (
          <Link
            key={post.objectID}
            href={post.url}
          >
            {post.title ? post.title : 'No title'}
          </Link>
        )
      })
    }
    return <h1>Not found</h1>
  }
  return (
    <Container sx={{ marginTop: 5 }} maxWidth={'sm'}>
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
            sx={{ marginY: 3, marginX: 'auto' }}
            showFirstButton={true}
            showLastButton={true}
          />
        )}
        {out()}
      </Stack>
      {/* <Button variant="contained">Text</Button> */}
    </Container>
  );
}

export default App;
