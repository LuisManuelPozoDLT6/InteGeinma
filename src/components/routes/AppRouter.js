import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { Card, Container, Nav, Navbar } from "react-bootstrap";
import { CategoryScreen } from "../category/CategoryScreen";
import {Incidences} from "../incidence/Incidences"
import { SubcategoryScreen } from "../subcategory/SubcategoryScreen";
import { AuthContext } from "../auth/authContext";
import { LoginScreen } from "../auth/LoginScreen";
import HomeScreen from "../home/HomeScreen";
import { PublicNavBar } from "../../shared/components/PublicNavBar";
import { ContactScreen } from "../contact/ContactScreen";
import { PrivateNavVar } from "../../shared/components/PrivateNavVar";
import { ProductScreen } from "../product/ProductScreen";

export const AppRouter = () => {
  const { user } = useContext(AuthContext);
  // console.log(user.user)
  return (
  <Router>
      <Routes>
        <Route path="/auth" element={<LoginScreen />} />
        <Route
          path="*"
          element={
            !user.logged ? (
              <>
                {/*NavBar publico */}
                <PublicNavBar />
                <Container>
                  <Routes>
                    <Route path={"/home"} element={<HomeScreen />} />
                    <Route path="/contacto" element={<ContactScreen />} />
                    <Route path={"/"} element={<HomeScreen />} />
                    <Route path="*" element={<div>ERROR 40b</div>} />
                  </Routes>
                </Container>
              </>
            ) : (
              <>
                <PrivateNavVar />
                <Container>
                  <Routes>
                    <Route path="/category" element={<CategoryScreen />} />

                    <Route
                      path="/subcategory"
                      element={<SubcategoryScreen />}
                    />

                    <Route path={"/incidences"} element={<Incidences user={user.user} />} />

                    <Route path={"/"} element={<ProductScreen />} />

                    <Route path="*" element={<div>Error 404</div>} />
                  </Routes>
                </Container>
              </>
            )
          }
        />
      </Routes>
    </Router>
  );
};
