import { Box, Button, Typography } from '@mui/material'
import { useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Table from '../../../components/Admin/Table'

import { products } from '../../../constants/products'
const getStatusColor = (status) => {
  if (status === 'ACTIVE') {
    return { text: 'Còn hàng', color: '#388b84' }
  } else {
    return { text: 'Hết hàng', color: '#fd4332' }
  }
}

const Products = () => {
  const productsColumns = useMemo(
    () => [
      {
        accessorKey: 'thumbnailUrl',
        header: 'Sản Phẩm',
        Cell: ({ cell }) => (
          <div>
            <img src={cell.getValue()} alt="" width={60} />
          </div>
        ),
      },
      {
        accessorKey: 'category.name',
        header: 'Danh Mục',
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: 'quantity',
        header: 'Số Lượng',
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: 'basePrice',
        header: 'Giá',
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: 'status', // Cột Trạng Thái
        header: 'Trạng Thái',
        Cell: ({ cell, row }) => {
          const { text, color } = getStatusColor(row.original.status)
          return (
            <span style={{ color, textTransform: 'capitalize' }}>{text}</span>
          )
        },
      },
    ],
    [],
  )

  return (
    <Box sx={{ pt: '80px', pb: '20px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
        }}
      >
        <Typography variant="h6">Sản Phẩm</Typography>
        <Link to="/admin/products/add" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FiPlus />}
            sx={{ borderRadius: '10px' }}
          >
            Thêm sản phẩm
          </Button>
        </Link>
      </Box>
      <Table
        data={products}
        fields={productsColumns}
        numberOfRows={products.length}
        enableTopToolBar={false}
        enableBottomToolBar={false}
        enablePagination={true}
        enableRowSelection={true}
        enableColumnFilters={false}
        enableEditing={false}
        enableColumnDragging={false}
        showPreview={false}
        routeLink="products"
      />
    </Box>
  )
}

export default Products
