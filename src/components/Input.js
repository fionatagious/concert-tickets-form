import React, { useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@blueprintjs/core";

export default function Input({
  name = "",
  placeholder = "",
  register,
  error,
  icon = null,
  ...rest
}) {
  const [inputValue, setInputValue] = useState("");

  React.useEffect(() => {
    // console.log(inputValue);
  }, [inputValue]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center w-full">
        {icon && (
          <div className="absolute right-20 px-3 pointer-events-none">
            <Icon icon="credit-card" color="gray" />
          </div>
        )}
        <input
          aria-label={rest["aria-label"]}
          type="text"
          className="px-3 py-3 my-2 rounded-lg w-full"
          placeholder={placeholder}
          {...(register && name ? register(name) : {})}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
      </div>
      {error && <p className="text-red-500 text-sm m-0">{error.message}</p>}
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.func,
  error: PropTypes.object,
  icon: PropTypes.node,
};
