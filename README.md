
# Shop Quản lý điện thoại
Xây dựng Website quản lý điện thoại


## Tech Stack

**Client:** React 18, TailwindCSS, MUI

**Server:** Spring Boot 3, PostgreSQL (Hosted on Supabase), Nimbus JWT, VNPay API

## Cấu trúc dự án

```
├── backend
│   ├── src
|   │   ├── main
|   |   |   ├── java
|   |   |   │   └── com.fit.se
|   |   |   |       └── app
|   |   |   |            ├── common
|   |   |   |            ├── config
|   |   |   |            ├── controller
|   |   |   |            ├── dto
|   |   |   |            ├── entity
|   |   |   |            ├── exception
|   |   |   |            ├── mapper
|   |   |   |            ├── repository
|   |   |   |            └── service
|   |   |   └── resources
|   |   |       ├── static
|   |   |       └── templates
|   │   └── test
│   └── target
└── frontend
    ├── node_modules
    ├── public
    └── src
        ├── assets
        ├── components
        ├── constants
        ├── layout
        ├── pages
        ├── router
        └── service
```
## Hướng dẫn

Clone project này

```bash
  git clone https://github.com/trannguyenvu3482/iuh-www-shop-ban-dien-thoai.git
```

### Front-end

Vào thư mục frontend 

```bash
  cd frontend
```

Cài thư viện

```bash
  npm install
```

Chạy server

```bash
  npm run dev
```

Mặc định server sẽ chạy tại `http://localhost:3000`

### Back-end
Vào thư mục backend 

```bash
  cd backend
```

Chạy server (Yêu cầu đã cài maven và load tất cả thư viện)
Mặc định server sẽ chạy tại `http://localhost:8080`



## License
Project này sử dụng license theo
[MIT](https://choosealicense.com/licenses/mit/)


## Tác giả

- [@trannguyenvu3482](https://www.github.com/trannguyenvu3482)
- [@Quindarts](https://www.github.com/Quindarts)
