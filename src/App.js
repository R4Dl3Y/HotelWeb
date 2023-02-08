import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { useEffect, useState } from "react";

import { ScreenLoader } from "./components/loader/loader";

import { Autenticacao } from "./contexts/autenticacao";
import { VerificaLogin } from "./contexts/verificaLogin";
import { ApenasAdmin } from "./contexts/apenasAdmin";

import { LoginUser } from "./pages/client/auth/login";
import { Registro } from "./pages/client/auth/registro";

import { PaginaInicial } from "./pages/client/home/PaginaInicial";
import { Contactos } from "./components/contacts/Contactos";
import { SobreNos } from "./components/about/SobreNos";

import { PaginaInicialBack } from "./pages/admin/paginaInicial/PaginaInicialBack";
import { ListaUtilizadores } from "./pages/admin/utilizadores/listaUtilizadores";
import { ListaHoteis } from "./pages/admin/hoteis/listaHoteis";
import { ListaQuartos } from "./pages/admin/quartos/listaQuartos";
import { ListaReservas } from "./pages/admin/reservas/listaReservas";

import { NotFound } from "./pages/error/404";

import "bootstrap/dist/css/bootstrap.min.css";

import { EditarCriarUsers } from "./pages/admin/utilizadores/editarCriarUsers";
import { EditarCriarHoteis } from "./pages/admin/hoteis/editarCriarHoteis";
import { EditarCriarQuartos } from "./pages/admin/quartos/editarCriarQuartos";
import { EditarCriarReservas } from "./pages/admin/reservas/editaCriarReservas";
import { PaginaHotel } from "./pages/client/hotel/PaginaHotel";
import { PerfilUser } from "./pages/client/profile/perfilUser";
import { EditarPerfil } from "./pages/client/profile/editarPerfil";
import { Reservar } from "./pages/client/book/book";

function App() {

  const { user } = Autenticacao();

  const [isLogged, setIsLogged] = useState();

  const [isAdmin, setIsAdmin] = useState()

  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => { 
    if (user) {
      setIsLogged(true)
      if (user.admin) {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }
    } else {
      setIsLogged(false)
      setIsAdmin(false)
    }
  }, [user])


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }, [])


  return (
    <>
      <BrowserRouter>
      <Header user={user} />
        <div className="App">
          <div className="Content min-vh-100">
            <Routes>
              <Route path='*' element={<NotFound />} />
              <Route path="/hotel/:id" element={<PaginaHotel user={user}></PaginaHotel>} />
              <Route path="/hotel/reservar" element={<VerificaLogin is={isLogged}></VerificaLogin>}>
                <Route path="/hotel/reservar/:hotelId/:quartoId" element={<Reservar user={user}></Reservar>} />
              </Route>

              <Route index element={<PaginaInicial></PaginaInicial>} />
              <Route path="/contactos" element={isLoading ? <ScreenLoader></ScreenLoader> : <Contactos></Contactos>} />
              <Route path="/sobrenos" element={isLoading ? <ScreenLoader></ScreenLoader> : <SobreNos></SobreNos>} />
              <Route path="/login" element={<LoginUser></LoginUser>} />
              <Route path="/registrar" element={<Registro></Registro>} />
              <Route path="/perfil" element={<VerificaLogin is={isLogged}></VerificaLogin>}>
                <Route
                  path="/perfil"
                  element={isLoading ? <ScreenLoader></ScreenLoader> : <PerfilUser user={user}></PerfilUser>}
                />
              </Route>
              <Route path="/perfil" element={<VerificaLogin is={isLogged}></VerificaLogin>}>
                <Route
                  path="/perfil/editar"
                  element={<EditarPerfil user={user}></EditarPerfil>}
                />
              </Route>
              <Route path="/backoffice" element={<ApenasAdmin is={{ isLogged, isAdmin }}></ApenasAdmin>}>
                <Route
                  path="/backoffice"
                  element={isLoading ? <ScreenLoader></ScreenLoader> : <PaginaInicialBack></PaginaInicialBack>}
                />
              </Route>
              <Route path="/backoffice" element={<ApenasAdmin is={{ isLogged, isAdmin }}></ApenasAdmin>}>
                <Route path="/backoffice/users" element={<ListaUtilizadores></ListaUtilizadores>} />
              </Route>
              <Route path="/backoffice" element={<ApenasAdmin is={{ isLogged, isAdmin }}></ApenasAdmin>}>
                <Route path="/backoffice/users/:id" element={<EditarCriarUsers></EditarCriarUsers>} />
              </Route>
              <Route path="/backoffice" element={<ApenasAdmin is={{ isLogged, isAdmin }}></ApenasAdmin>}>
                <Route path="/backoffice/users/add" element={<EditarCriarUsers></EditarCriarUsers>} />
              </Route>

              <Route path="/backoffice" element={<ApenasAdmin is={{ isLogged, isAdmin }}></ApenasAdmin>}>
                <Route path="/backoffice/hoteis" element={<ListaHoteis></ListaHoteis>} />
              </Route>
              <Route path="/backoffice" element={<ApenasAdmin is={{ isLogged, isAdmin }}></ApenasAdmin>}>
                <Route path="/backoffice/hoteis/:id" element={<EditarCriarHoteis></EditarCriarHoteis>} />
              </Route>
              <Route path="/backoffice" element={<ApenasAdmin is={{ isLogged, isAdmin }}></ApenasAdmin>}>
                <Route path="/backoffice/hoteis/add" element={<EditarCriarHoteis></EditarCriarHoteis>} />
              </Route>

              <Route path="/backoffice" element={<ApenasAdmin is={{ isLogged, isAdmin }}></ApenasAdmin>}>
                <Route path="/backoffice/quartos" element={<ListaQuartos></ListaQuartos>} />
              </Route>
              <Route path="/backoffice" element={<ApenasAdmin is={{ isLogged, isAdmin }}></ApenasAdmin>}>
                <Route path="/backoffice/quartos/:id" element={<EditarCriarQuartos></EditarCriarQuartos>} />
              </Route>
              <Route path="/backoffice" element={<ApenasAdmin is={{ isLogged, isAdmin }}></ApenasAdmin>}>
                <Route path="/backoffice/quartos/add" element={<EditarCriarQuartos></EditarCriarQuartos>} />
              </Route>

              <Route path="/backoffice" element={<ApenasAdmin is={{ isLogged, isAdmin }}></ApenasAdmin>}>
                <Route
                  path="/backoffice/reservas"
                  element={<ListaReservas></ListaReservas>}
                />
              </Route>
              <Route path="/backoffice" element={<ApenasAdmin is={{ isLogged, isAdmin }}></ApenasAdmin>}>
                <Route path="/backoffice/reservas/:id" element={<EditarCriarReservas></EditarCriarReservas>} />
              </Route>
              <Route path="/backoffice" element={<ApenasAdmin is={{ isLogged, isAdmin }}></ApenasAdmin>}>
                <Route path="/backoffice/reservas/add" element={<EditarCriarReservas></EditarCriarReservas>} />
              </Route>

            </Routes>
          </div>
          <Footer></Footer>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;