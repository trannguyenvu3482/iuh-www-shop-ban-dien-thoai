import { Skeleton, Grid, Box, Container } from '@mui/material'

const ProductSkeleton = () => {
  return (
    <Container sx={{ width: '100%' }}>
      <Box sx={{ padding: 2, maxWidth: 1120 }}>
        {/* Header */}
        <Box sx={{ marginBottom: 2 }}>
          <Skeleton variant="text" width="30%" height={50} />
          <Skeleton variant="text" width="60%" />
        </Box>

        {/* Main Content */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Box sx={{ marginBottom: 2 }}>
              <Skeleton variant="rectangular" width="100%" height={200} />
              <Skeleton variant="text" width="80%" sx={{ marginTop: 2 }} />
              <Skeleton variant="text" width="60%" />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <Skeleton variant="rectangular" width="100%" height={200} />
              <Skeleton variant="text" width="80%" sx={{ marginTop: 2 }} />
              <Skeleton variant="text" width="60%" />
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
              <Skeleton variant="text" width="70%" height={30} />
              <Skeleton variant="text" width="50%" />
              <Skeleton variant="text" width="90%" />
            </Box>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box sx={{ marginTop: 4, textAlign: 'center' }}>
          <Skeleton variant="text" width="30%" />
          <Skeleton variant="text" width="50%" />
        </Box>
      </Box>
    </Container>
  )
}

export default ProductSkeleton
