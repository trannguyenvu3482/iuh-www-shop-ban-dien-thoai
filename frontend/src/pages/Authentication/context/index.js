import * as Yup from "yup";
import "yup-phone-lite";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email không được để trống")
    .email("Email không hợp lệ"),
  password: Yup.string().required("Mật khẩu không được để trống"),
});

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Họ và tên không được để trống"),
  email: Yup.string()
    .required("Email không được để trống")
    .email("Email không hợp lệ"),
  password: Yup.string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Mật khẩu phải bao gồm chữ cái in thường, chữ cái in hoa, chữ số, ký tự đặc biệt"
    ),
  passwordRepeat: Yup.string()
    .required("Mật khẩu không được để trống")
    .oneOf([Yup.ref("password")], "Mật khẩu không trùng khớp"),
  phoneNumber: Yup.string()
    .required("Số điện thoại không được để trống")
    .phone("VN", "Phone number không hợp lệ"),
  gender: Yup.string().oneOf(
    ["MALE", "FEMALE", "OTHER"],
    "Giới tính không hợp lệ"
  ),
});

export { LoginSchema, SignUpSchema };
