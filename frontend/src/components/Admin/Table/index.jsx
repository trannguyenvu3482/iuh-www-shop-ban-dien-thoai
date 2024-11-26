/* eslint-disable react-hooks/exhaustive-deps */
import { Button, IconButton, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import { MaterialReactTable } from 'material-react-table'
import { useCallback, useMemo, useState } from 'react'
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { MRT_Localization_VI } from 'material-react-table/locales/vi'
export const Table = ({
  data,
  fields,
  numberOfRows,
  enableEditing,
  showPreview,
  routeLink,
  ...props
}) => {
  const columns = useMemo(() => fields, [])

  const [tableData, setTableData] = useState(() => data)

  const handleDeleteRow = useCallback(
    (row) => {
      if (!confirm('Bạn có chắc chắn muốn xóa dòng này')) {
        return
      }
      data.splice(row.index, 1)
      setTableData([...tableData])
    },
    [tableData],
  )

  return (
    <MaterialReactTable
      columns={columns}
      data={tableData.slice(0, numberOfRows)}
      getRowId={(row) => row.id}
      positionActionsColumn="last"
      localization={MRT_Localization_VI}
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {showPreview && routeLink && (
            <Tooltip arrow placement="right" title="View">
              <Link to={`/${routeLink}/${row.id}`}>
                <IconButton>
                  <FiEye />
                </IconButton>
              </Link>
            </Tooltip>
          )}
          {enableEditing && (
            <Tooltip arrow placement="right" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row.id)}>
                <FiEdit />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip arrow placement="right" title="Delete">
            <IconButton color="error" onClick={() => handleDeleteRow(row)}>
              <FiTrash />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      renderTopToolbarCustomActions={({ table }) => (
        <Button
          disableElevation
          color="error"
          disabled={!table.getIsSomeRowsSelected()}
          variant="contained"
          // onClick={handleDelete}
        >
          Xóa sản phẩm đã chọn
        </Button>
      )}
      muiTableBodyRowProps={{ hover: false }}
      muiTablePaperProps={{
        sx: {
          padding: '20px',
          borderRadius: '15px',
          borderStyle: 'solid',
          borderWidth: '1px',
          borderColor: 'divider',
        },
      }}
      muiTableContainerProps={{
        sx: { borderRadius: '15px' },
      }}
      muiTableHeadCellProps={{
        sx: {
          fontSize: '14px',
          fontWeight: 'bold',
        },
      }}
      muiTableHeadProps={{
        sx: {
          '& tr th': {
            borderWidth: '1px',
            borderColor: 'divider',
            borderStyle: 'solid',
          },
        },
      }}
      muiTableBodyProps={{
        sx: {
          '& tr td': {
            borderWidth: '1px',
            borderColor: 'divider',
            borderStyle: 'solid',
          },
        },
      }}
      {...props}
    />
  )
}

export default Table
