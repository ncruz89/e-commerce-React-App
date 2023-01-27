import { FormInputLabel, Input, Group } from "./form-input.styles.jsx";

// FormInput component
// custom form input component
// receives label and otherProps parameters

// renders a custom input component and a FormInputLabel styled component which passes a shrink prop for custom styling

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
