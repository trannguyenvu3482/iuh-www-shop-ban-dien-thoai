import { useMemo } from 'react'
import Table from '../../../components/Admin/Table'
import { Avatar, Box, Button, Typography } from '@mui/material'
import { useGetUsers } from '../../../hooks/admin/useUserAdmin'
import SkeletonTable from '../../../components/Admin/Skeleton/SkeletonTable'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
const getUserStatusColor = (status) => {
  if (status === 'ACTIVE') {
    return { text: 'Còn hoạt động', color: '#07a91c', bgcolor: '#eefcf5' }
  } else {
    return { text: 'Không hoạt động', color: '#d91f0e', bgcolor: '#fce1e1' }
  }
}

const Users = () => {
  const UsersColumns = useMemo(
    () => [
      {
        accessorKey: 'avatarUrl',
        header: 'Thông tin người dùng',
        size: 250,
        Cell: ({ cell, row }) => (
          <Box
            display="flex"
            alignItems={'center'}
            gap={2}
            justifyContent={'between'}
          >
            <Avatar src={`${row?.original?.avatarUrl}`} />
            <Box>
              <Typography variant="body1" fontWeight={500} color="grey.700">
                {row.original.name}
              </Typography>
              <Typography variant="body2" color="grey.500">
                {row.original.userType === 'USER' ? 'Khách hàng' : 'Admin'}
              </Typography>
            </Box>
          </Box>
        ),
      },

      {
        accessorKey: 'email',
        header: 'Email',
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: 'phoneNumber', 
        header: 'Số điện thoại',
        size: 100,
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: 'address', 
        header: 'Địa chỉ',
        size: 200,
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
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
    ],
    [],
  )

  const { users, isLoading } = useGetUsers()
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
          <Typography variant="h6">Danh sách người dùng</Typography>
          <Link to="/admin/users/add" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FiPlus />}
              sx={{ borderRadius: '10px' }}
            >
              Thêm người dùng
            </Button>
          </Link>
        </Box>
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <Table
            data={users}
            fields={UsersColumns}
            numberOfRows={users?.length}
            enableTopToolBar={true}
            enableBottomToolBar={true}
            enablePagination={true}
            enableRowSelection={true}
            enableColumnFilters={false}
            enableEditing={false}
            enableColumnDragging={false}
            showPreview={false}
            routeLink="users"
          />
        )}
      </Box>
    </>
  )
}

export default Users
