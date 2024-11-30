import { Skeleton, Grid, Card, CardContent } from '@mui/material'

const ProductSkeleton = () => {
  return (
    <Grid container spacing={2} justifyContent="center">
      {Array.from({ length: 10 }).map((_, index) => (
        <Grid item xs={2.4} key={index}>
          <Card>
            <Skeleton variant="rectangular" width="100%" height={140} />
            <CardContent>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </CardContent>
            <Skeleton variant="text" width="40%" />
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default ProductSkeleton
