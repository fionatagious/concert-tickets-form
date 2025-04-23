import * as yup from "yup";

export const bandFormSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .matches(/^[a-zA-ZÀ-ÿ' -]+$/, "First name must contain only letters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .matches(/^[a-zA-ZÀ-ÿ' -]+$/, "Last name must contain only letters"),
  address: yup.string().required("Address is required"),
  cardNumber: yup
    .string()
    .required("Card number is required")
    .matches(/^\d+$/, "Card number must contain only digits")
    .length(16, "Card number must be exactly 16 digits"),
  expiry: yup
    .string()
    .required("Expiry is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "MM/YY format is required"),
  cvv: yup
    .string()
    .required("CVV is required")
    .matches(/^\d+$/, "CVV must contain only digits")
    .length(3, "CVV must be exactly 3 digits"),
});
