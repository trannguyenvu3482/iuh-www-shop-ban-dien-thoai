
# Shop Quản lý điện thoại
Xây dựng Website quản lý điện thoại


## Tech Stack

**Client:** React 18, TailwindCSS

**Server:** Spring Boot 3, SQL Server


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
  git clone https://link-to-project
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

Mặc định server sẽ chạy tại `localhost:5176`

### Back-end
Vào thư mục backend 

```bash
  cd backend
```

Chạy server (Yêu cầu đã cài maven và load tất cả thư viện)

```bash
  mvn spring-boot:run
```


## License
Project này sử dụng license theo
[MIT](https://choosealicense.com/licenses/mit/)


## Tác giả

- [@trannguyenvu3482](https://www.github.com/trannguyenvu3482)
- [@Quindarts](https://www.github.com/Quindarts)

