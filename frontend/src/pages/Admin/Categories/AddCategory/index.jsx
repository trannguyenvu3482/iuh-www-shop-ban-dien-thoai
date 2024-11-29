import styled from '@emotion/styled'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { BiImageAdd } from 'react-icons/bi'

const AddCategory = () => {
  const [category, setCategory] = useState('')
  const imageInput = useRef(null)
  const [image, setImage] = useState('')
  const handleChange = (event) => {
    setCategory(event.target.value)
    console.log(category)
  }

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

  return (
    <Box sx={{ pt: '80px', pb: '20px' }}>
      <Typography variant="h6" sx={{ marginBottom: '14px' }}>
        Thêm Danh mục
      </Typography>
      <Paper
        sx={{
          boxShadow: 'none !important',
          borderRadius: '12px',
          borderStyle: 'solid',
          borderWidth: '1px',
          borderColor: 'divider',
          p: '20px',
          maxWidth: '1140px',
          margin: '0 auto',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ my: 2 }}>
          <TextField
            label="Tên danh mục"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Box>
        <input
          type="file"
          hidden
          ref={imageInput}
          onChange={(e) => setImage(e.target.files[0])}
        />
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
        >
          <Button variant="contained" sx={{ borderRadius: '20px' }}>
            Lưu danh mục
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default AddCategory
