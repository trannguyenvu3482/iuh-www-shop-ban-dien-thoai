import styled from '@emotion/styled'
import { Box, Grid2, IconButton, Paper, Typography } from '@mui/material'
import {
  lineChartData,
  lineChartOptions,
} from '../../../../constants/chartData'
import { stats } from '../../../../constants/stats'
import LineChart from '../LineChart'

const Stats = () => {
  const Item = styled(Paper)({
    padding: '5px 10px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  })

  return (
    <Grid2 container spacing={2}>
      {stats.map(
        ({ id, title, amount, icon, iconBg, iconColor, isMoney }, i) => (
          <Grid2
            item
            key={id}
            size={{ xs: 12, sm: `${i === stats.length - 1 ? 12 : 6}`, lg: 4 }}
          >
            <Item
              sx={{
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: 'divider',
              }}
            >
              <Box sx={{ flex: 1 }}>
                <IconButton
                  sx={{ background: `${iconBg} !important`, color: iconColor }}
                >
                  {icon}
                </IconButton>
                <Typography variant="h4" sx={{ my: 2 }}>
                  {`${isMoney ? amount + 'đ' : amount + 'đ'}`}
                </Typography>
                <Typography sx={{ opacity: 0.7 }}>{title}</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <LineChart
                  chartOptions={lineChartOptions}
                  chartData={lineChartData}
                />
              </Box>
            </Item>
          </Grid2>
        ),
      )}
    </Grid2>
  )
}

export default Stats
