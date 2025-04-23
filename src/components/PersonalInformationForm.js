import React from "react";
import Input from "./Input";
import { Icon } from "@blueprintjs/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bandFormSchema } from "./bandFormSchema";

export default function PersonalInformationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bandFormSchema),
    mode: "onBlur", // triggers validation after input loses focus
    reValidateMode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  function handleClick() {
    alert("Tickets purchased!");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <p className="font-lg font-bold">Personal Information</p>
      <div className="grid grid-cols-2 gap-2">
        <Input
          aria-label="firstName"
          name="firstName"
          placeholder="First Name"
          error={errors.firstName}
          register={register}
        />
        <Input
          aria-label="lastName"
          name="lastName"
          placeholder="Last Name"
          error={errors.lastName}
          register={register}
        />
      </div>
      <div className="grid grid-col">
        <Input
          aria-label="address"
          name="address"
          placeholder="Address"
          error={errors.address}
          register={register}
        />
      </div>
      <p className="font-lg font-bold">Payment Details</p>
      <div className="grid grid-col">
        <Input
          aria-label="cardNumber"
          name="cardNumber"
          placeholder="0000 0000 0000 0000"
          error={errors.cardNumber}
          register={register}
          icon={<Icon icon="credit-card" />}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Input
          aria-label="expiry"
          name="expiry"
          placeholder="MM/YY"
          error={errors.expiry}
          register={register}
        />
        <Input
          aria-label="cvv"
          name="cvv"
          placeholder="CVV"
          error={errors.cvv}
          register={register}
        />
      </div>
      <button
        data-testid="get-tickets-button"
        className="w-full bg-teal-50 border-2 border-teal-800 text-teal-800 rounded-lg p-3 my-4 hover:bg-teal-800 hover:text-white"
        onClick={handleClick}
      >
        Get Tickets
      </button>
    </form>
  );
}
