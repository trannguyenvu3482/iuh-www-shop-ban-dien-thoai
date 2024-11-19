import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email không được để trống")
    .email("Email không hợp lệ"),
  password: Yup.string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Mật khẩu phải bao gồm chữ cái in thường, chữ cái in hoa, chữ số, ký tự đặc biệt"
    ),
});

export { LoginSchema };
