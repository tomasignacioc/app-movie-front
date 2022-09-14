import { Box, Rating, Typography } from '@mui/material'
import React from 'react'

function Comment({ content }) {
  return (
    <Box sx={{
      margin: 3,
      maxWidth: 400,
      maxHeight: 300,
      color: 'white',
      borderRadius: '0.5rem',
      width: 'content-fit',
      height: 'content-fit',
      backgroundColor: '#1976d2',
    }}>
      <Typography component="legend" sx={{ padding: 3, fontSize: 20 }}>{content}</Typography>
    </Box >
  )
}

export default Comment