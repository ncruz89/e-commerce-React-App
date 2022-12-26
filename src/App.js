import { Routes, Route } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";

import { setCurrentUser } from "./store/user/user.action";
import Spinner from "./components/spinner/spinner.component";

import { GlobalStyle } from "./global.styles";

//added react lazy & suspense methods to add dynamic importing for further load time optimizations
const Navigation = lazy(() =>
  import("./routes/navigation/navigation.component")
);
const Home = lazy(() => import("./routes/home/home.component"));
const Shop = lazy(() => import("./routes/shop/shop.component"));
const Authentication = lazy(() =>
  import("./routes/authentication/authentication.component")
);
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));

const App = () => {
  const dispatch = useDispatch();

  // need to dispatch user on initial render. if no initial user auth currentUser is null
  // firebase auth persists user between browser refreshes automatically
  // therefore had to add logic to catch persisted auth user if there was one logged in previously
  // dispatches setCurrentUser and sets user
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) createUserDocumentFromAuth(user);

      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, []);

  // SPA route setup
  // also has Suspense component in conjunction with lazy loading from react and renders spinner during lazy loading
  // Routes all nested in the consistent nav component route
  return (
    <Suspense fallback={<Spinner />}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
