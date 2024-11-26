import { Box, Button, Typography } from '@mui/material'
import { useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Table from '../../../components/Admin/Table'

const Categories = () => {
  const CategoriesColumns = useMemo(
    () => [
      {
        accessorKey: 'product_name',
        header: 'Sản Phẩm',
        Cell: ({ cell }) => (
          <div>
            <img src={cell.getValue()} alt="" width={60} />
          </div>
        ),
      },

      {
        accessorKey: 'category',
        header: 'Danh Mục',
      },
      {
        accessorKey: 'quantity',
        header: 'Số Lượng',
      },
      {
        accessorKey: 'price',
        header: 'Giá',
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: 'instock',
        header: 'Trạng Thái',
        Cell: ({ cell, row }) => (
          <div>
            {row.original.instock && (
              <span style={{ color: '#388b84', textTransform: 'capitalize' }}>
                Còn hàng
              </span>
            )}
            {!row.original.instock && (
              <span style={{ color: '#fd4332', textTransform: 'capitalize' }}>
                Hết hàng
              </span>
            )}
          </div>
        ),
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
        <Link to="/admin/Categories/add" style={{ textDecoration: 'none' }}>
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
        data={[]}
        fields={CategoriesColumns}
        numberOfRows={[].length}
        enableTopToolBar={false}
        enableBottomToolBar={false}
        enablePagination={true}
        enableRowSelection={true}
        enableColumnFilters={false}
        enableEditing={false}
        enableColumnDragging={false}
        showPreview={false}
        routeLink="Categories"
      />
    </Box>
  )
}

export default Categories
