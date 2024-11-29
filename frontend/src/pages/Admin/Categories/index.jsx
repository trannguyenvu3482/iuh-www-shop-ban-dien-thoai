import { Box, Button, Typography } from '@mui/material'
import { useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Table from '../../../components/Admin/Table'

const Categories = () => {
  const CategoriesColumns = useMemo(
    () => [
      {
        accessorKey: 'category',
        header: 'Tên danh Mục',
      },
      {
        accessorKey: 'name2',
        header: 'Danh Mục Cha',
      },
      {
        accessorKey: 'quantity',
        header: 'Số Lượng sản phẩm',
      },
      {
        accessorKey: 'status',
        header: 'Trạng Thái',
        Cell: ({ cell, row }) => (
          <div>
            {row.original.instock && (
              <span style={{ color: '#388b84', textTransform: 'capitalize' }}>
                Đăng bán
              </span>
            )}
            {!row.original.instock && (
              <span style={{ color: '#fd4332', textTransform: 'capitalize' }}>
                Ngừng bán
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
        <Typography variant="h6">Danh sách các danh mục</Typography>
        <Link to="/admin/Categories/add" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FiPlus />}
            sx={{ borderRadius: '10px' }}
          >
            Thêm danh mục
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
