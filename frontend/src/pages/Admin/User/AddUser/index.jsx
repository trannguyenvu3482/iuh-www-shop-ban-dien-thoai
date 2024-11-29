import styled from '@emotion/styled'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { useRef, useState } from 'react'
import { BiImageAdd } from 'react-icons/bi'

const AddUser = () => {
  const [userType, setuserType] = useState('')
  const imageInput = useRef(null)
  const [image, setImage] = useState('')
  const handleChange = (event) => {
    setuserType(event.target.value)
    console.log(userType)
  }

  const UploadBox = styled(Box)({
    height: 'auto',
    flex: 0.8,
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderStyle: 'dashed',
    borderWidth: '2px',
    borderColor: 'divider',
  })

  return (
    <Box sx={{ pt: '80px', pb: '20px' }}>
      <Typography variant="h6" sx={{ marginBottom: '14px' }}>
        Thêm người dùng
      </Typography>
      <Paper
        sx={{
          boxShadow: 'none !important',
          borderRadius: '12px',
          borderStyle: 'solid',
          borderWidth: '1px',
          borderColor: 'divider',
          py: 4,
          maxWidth: '1140px',
          margin: '0 auto',
          cursor: 'pointer',
          overflow: 'hidden',
          gap: 10,
          justifyContent: 'space-around',
          display: 'flex',
        }}
      >
        <UploadBox onClick={() => imageInput.current.click()}>
          {image ? (
            <img
              src={image && URL.createObjectURL(image)}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <BiImageAdd style={{ fontSize: '50px', color: '#027edd' }} />
              <Typography>
                Thả ảnh đại diện vào đây hoặc{' '}
                <span style={{ color: '#027edd', cursor: 'pointer' }}>
                  duyệt
                </span>
              </Typography>
              <Typography sx={{ fontSize: '12px' }}>
                Chỉ chấp nhận ảnh định dạng JPG, PNG và GIF
              </Typography>
            </Box>
          )}
        </UploadBox>
        <Box>
          <Box sx={{ my: 2, display: 'flex', gap: 2 }}>
            <TextField
              label="Tên người dùng"
              variant="outlined"
              size="small"
              fullWidth
            />
            <Box width={200}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Vai trò</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Vai trò"
                  value={userType}
                  onChange={handleChange}
                >
                  {[
                    {
                      userType_id: 'USER',
                      name: 'Khách hàng',
                    },
                    {
                      userType_id: 'ADMIN',
                      name: 'Quản trị viên',
                    },
                  ]?.map(({ userType_id, name }) => (
                    <MenuItem value={name} key={userType_id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box sx={{ my: 2 }}>
            <TextField
              label="Email"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <TextField
              label="Số điện thoại"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Box>
          <Box sx={{ my: 2, display: 'flex', gap: 2 }}>
            <TextField
              label="Mật khẩu"
              variant="outlined"
              size="small"
              fullWidth
            />
            <TextField
              label="Nhập lại mật khẩu"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Địa chỉ"
              variant="outlined"
              rows={4}
              fullWidth
              multiline
            />
          </Box>

          <input
            type="file"
            hidden
            ref={imageInput}
            onChange={(e) => setImage(e.target.files[0])}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
              mt: 4,
              gap: 2,
            }}
          >
            <Button
              type="reset"
              color="info"
              variant="contained"
              sx={{ borderRadius: '20px' }}
            >
              reset thông tin
            </Button>
            <Button variant="contained" sx={{ borderRadius: '20px' }}>
              Thêm người dùng
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default AddUser
