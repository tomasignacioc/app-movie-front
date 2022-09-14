import { Box, Rating, Typography } from '@mui/material'
import React from 'react'

function Comment({ content, username }) {
  return (
    <Box sx={{ margin: 3, borderRadius: '0.5rem' }}>
      <Typography component="h3" sx={{
        fontSize: 25, pl: 1, backgroundColor: 'white', color: 'black'
      }}
      > <strong>{username}:</strong>
      </Typography>
      <Box sx={{
        maxWidth: 400,
        maxHeight: 300,
        borderRadius: '0.5rem',
        width: 'content-fit',
        height: 'content-fit',
        backgroundColor: '#78D9F9'
      }}>
        <Typography component="legend" sx={{ padding: 2, fontSize: 20, fontStyle: 'italic' }}><q> {content} </q></Typography>
      </Box >
    </Box>
  )
}

export default Comment