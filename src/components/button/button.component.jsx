import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
  ButtonSpinner,
} from "./button.styles.jsx";

// BUTTON_TYPE_CLASSES Object only used to prevent human error of mispelling essential class names for the various custom button styled components
export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

// a custom Button component
// receives multiple parameters along with other potential props
// renders a custom button type dependent on buttonType parameter after calling getButton helper function
// also renders a loading spinner if isLoading parameter was passed as true otherwise renders children prop

// getButton helper function
// receives buttonType as parameter
// pulls button type out of button map based on buttonType parameter and returns into CustomButton variable
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};

export default Button;
