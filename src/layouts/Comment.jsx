import { Box, Rating, Typography } from '@mui/material'
import React from 'react'

function Comment({ content }) {
  return (
    <Box mt={10} sx={{
      margin: 10,
      maxWidth: 400,
      maxHeight: 400,
      width: 'content-fit',
      height: 'content-fit',
      backgroundColor: 'info.main',
    }}>
      <Typography component="legend" sx={{ padding: 3, fontSize: 20 }}>{content}</Typography>
      <Rating name="read-only" value={5} readOnly />
    </Box >
  )
}

export default Comment