import { Box, Button, Typography } from '@mui/material'
import { useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Table from '../../../components/Admin/Table'
const getUserStatusColor = (status) => {
  if (status === 'ACTIVE') {
    return { text: 'Còn hoạt động', color: '#388b84' }
  } else {
    return { text: 'Không hoạt động', color: '#fd4332' }
  }
}

const Users = () => {
  const UsersColumns = useMemo(
    () => [
      {
        accessorKey: 'avatarUrl', // Cột Ảnh đại diện người dùng
        header: 'Ảnh đại diện',
        Cell: ({ cell }) => (
          <div>
            {cell.getValue() ? (
              <img
                src={cell.getValue()}
                alt="Avatar"
                width={60}
                style={{ borderRadius: '50%' }}
              />
            ) : (
              <span>No Avatar</span>
            )}
          </div>
        ),
      },
      {
        accessorKey: 'name', // Cột Tên người dùng
        header: 'Tên người dùng',
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: 'email', // Cột Email
        header: 'Email',
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: 'phoneNumber', // Cột Số điện thoại
        header: 'Số điện thoại',
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: 'status', // Cột Trạng thái người dùng
        header: 'Trạng thái',
        Cell: ({ cell, row }) => {
          const { text, color } = getUserStatusColor(row.original.status)
          return (
            <span style={{ color, textTransform: 'capitalize' }}>{text}</span>
          )
        },
      },
      {
        accessorKey: 'loyaltyPoints', // Cột Điểm thưởng
        header: 'Điểm thưởng',
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
    ],
    [],
  )

  return (
    <Table
      data={[]} // Dữ liệu người dùng
      fields={UsersColumns}
      numberOfRows={[].length}
      enableTopToolBar={false}
      enableBottomToolBar={true}
      enablePagination={true}
      enableRowSelection={true}
      enableColumnFilters={false}
      enableEditing={false}
      enableColumnDragging={false}
      showPreview={false}
      routeLink="users"
    />
  )
}

export default Users
