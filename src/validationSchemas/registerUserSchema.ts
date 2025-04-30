import * as Yup from "yup";
import { passwordRegex, phoneRegex, postCodeValidation } from "../utils/regex";

const registerUserSchema = Yup.object().shape({
  name: Yup.string().min(2).max(30).required(),
  lastName: Yup.string().min(2).max(50).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(8).max(128).matches(passwordRegex).required(),
  phone: Yup.string().matches(phoneRegex).required(),
  address: Yup.string().min(5).max(100).required(),
  postCode: Yup.string().matches(postCodeValidation).required(),
});

export default registerUserSchema;
