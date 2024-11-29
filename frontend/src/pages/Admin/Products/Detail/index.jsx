import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import styled from '@emotion/styled'
import {
  Box,
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { useRef, useState } from 'react'
import { BiImageAdd } from 'react-icons/bi'
import { useProductById } from '../../../../hooks/admin/useProductAdmin'
const UploadBox = styled(Box)({
  marginTop: 30,
  height: 200,
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  borderStyle: 'dashed',
  borderWidth: '2px',
  borderColor: 'divider',
})

function ModalDetailProduct({ isOpen, onClose, id }) {
  const { product, isLoading } = useProductById(id)
  const [category, setCategory] = useState('')

  const imageInput = useRef(null)
  const [image, setImage] = useState(`${product?.thumbnailUrl}`)
  const handleChange = (event) => {
    setCategory(event.target.value)
    console.log(category) 
  }
  return (
    <Dialog onClose={onClose} open={isOpen} fullWidth={'2xl'}>
      <DialogTitle>Chi tiết sản phẩm</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box
            display={'flex'}
            width={'100%'}
            height={500}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Paper
            sx={{
              borderStyle: 'solid',
              borderColor: 'divider',
              maxWidth: '1140px',
              margin: '0 auto',
              cursor: 'pointer',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ my: 2 }}>
              <TextField
                label="Tên Sản Phẩm"
                variant="outlined"
                size="small"
                fullWidth
                value={`${product?.name}`}
              />
            </Box>
            <Box sx={{ mt: 4 }}>
              <TextField
                label="Mô Tả Sản Phẩm"
                variant="outlined"
                value={`${product?.description}`}
                rows={6}
                fullWidth
                multiline
              />
            </Box>
            <Box sx={{ mt: 4 }}>
              <FormControl fullWidth size="small">
                {/* <InputLabel id="demo-simple--label">Danh Mục</InputLabel> */}
                {/* <Select
                labelId="demo-simple--label"
                id="demo-simple-"
                label="Danh Mục"
                onChange={handleChange}
                defaultValue={`${product?.category?.name}`}
              >
                {categories?.map(({ category_id, name }) => (
                  <MenuItem value={name} key={category_id}>
                    {name}
                  </MenuItem>
                ))}
              </Select> */}
                <TextField
                  label="Slug"
                  variant="outlined"
                  fullWidth
                  size="small"
                  defaultValue={`${product?.slug}`}
                />
              </FormControl>
            </Box>

            <Box sx={{ mt: 4 }}>
              <TextField
                label="Thương Hiệu"
                variant="outlined"
                value={`${product?.brand}`}
                rows={4}
                size="small"
                fullWidth
              />
            </Box>

            <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
              <TextField
                label="Giá"
                variant="outlined"
                rows={4}
                fullWidth
                size="small"
                defaultValue={`${product?.basePrice}`}
              />
              <TextField
                label="Giảm Giá"
                variant="outlined"
                rows={4}
                fullWidth
                size="small"
                defaultValue={`${product?.discount}`}
              />
            </Box>
            <input
              type="file"
              hidden
              ref={imageInput}
              onChange={(e) => setImage(e.target.files[0])}
            />
            <UploadBox onClick={() => imageInput.current.click()}>
              {image !== '' ? (
                <img
                  src={`${product?.thumbnailUrl}`}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <Box sx={{ textAlign: 'center' }}>
                  <BiImageAdd style={{ fontSize: '50px', color: '#027edd' }} />
                  <Typography>
                    Thả ảnh vào đây hoặc{' '}
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: '30px',
              }}
            ></Box>
          </Paper>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained">Cập nhật</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalDetailProduct
