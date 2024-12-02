import { Box, Button, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Table from '../../../components/Admin/Table'
import { useProductAdmin } from '../../../hooks/admin/useProductAdmin'
import SkeletonTable from '../../../components/Admin/Skeleton/SkeletonTable'
import { formatVND } from '../../../utils/format'
import ModalDetailProduct from './Detail'

const getUserStatusColor = (status) => {
  if (status === 'ACTIVE') {
    return { text: 'Đang bán', color: '#07a91c', bgcolor: '#eefcf5' }
  } else {
    return { text: 'Ngừng bán', color: '#d91f0e', bgcolor: '#fce1e1' }
  }
}
const Products = () => {
  const { products, isLoading } = useProductAdmin()
  const [openDetailModal, setOpenDetailModal] = useState({
    isOpen: false,
    id: '',
  })
  const onOpenDetailModal = (id) => {
    setOpenDetailModal({ isOpen: true, id })
  }
  const onCloseDetailModal = () => {
    setOpenDetailModal((pre) => ({ ...pre, isOpen: false }))
  }
  const productsColumns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Sản Phẩm',
        size: 260,
        Cell: ({ row }) => (
          <Box display={'flex'}>
            <img src={row?.original?.thumbnailUrl} alt="" width={60} />
            <Box sx={{ ml: '10px' }}>
              <Typography fontWeight={'bold'} color="grey.700" variant="body2">
                {row?.original?.name}
              </Typography>
              <Typography
                fontWeight={'bold'}
                fontSize={12}
                color="grey.500"
                variant="body2"
              >
                Thương hiệu {row?.original?.brand}
              </Typography>
            </Box>
          </Box>
        ),
      },
      {
        accessorKey: 'categoryName',
        header: 'Danh Mục',
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: 'totalStock',
        header: 'Số Lượng',
        size: 100,
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: 'basePrice',
        header: 'Giá bán',
        Cell: ({ cell }) => <span>{formatVND(cell.getValue())} VNĐ</span>,
      },
      {
        accessorKey: 'status',
        header: 'Trạng thái',
        Cell: ({ cell, row }) => {
          const { text, color, bgcolor } = getUserStatusColor(
            row.original.status,
          )
          return (
            <Typography
              sx={{
                bgcolor: bgcolor,
                color: color,
                width: 130,
                borderRadius: 8,
                py: '2px',
                textAlign: 'center',
              }}
              variant="body2"
            >
              {text}
            </Typography>
          )
        },
      },
      {
        accessorKey: 'detail', // Cột Trạng Thái
        header: 'Xem sản phẩm',
        Cell: ({ cell, row }) => {
          return (
            <Button
              onClick={() => onOpenDetailModal(row.original.id)}
              style={{ textTransform: 'capitalize' }}
            >
              Chi tiết sản phẩm
            </Button>
          )
        },
      },
    ],
    [],
  )

  return (
    <>
      <Box sx={{ pt: '80px', pb: '20px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}
        >
          <Typography variant="h6">Danh sách sản Phẩm</Typography>
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

        {isLoading ? (
          <SkeletonTable />
        ) : (
          <Table
            data={products.map((p) => ({
              ...p,
              categoryName: p.categories[0].name,
            }))} // Cột Danh Mục
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
        )}
      </Box>
      <ModalDetailProduct
        isOpen={openDetailModal.isOpen}
        id={openDetailModal.id}
        onClose={onCloseDetailModal}
      />
    </>
  )
}

export default Products
