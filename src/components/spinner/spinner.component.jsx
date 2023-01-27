import { SpinnerContainer, SpinnerOverlay } from "./spinner.styles";

// Spinner Component
// renders Spinner styled component inside spinner overlay styled component
const Spinner = () => (
  <SpinnerOverlay>
    <SpinnerContainer />
  </SpinnerOverlay>
);

export default Spinner;
