import { api } from "../../../Shared/api";
import { useEffect, useState } from "react";
import { CardHotel } from "../cardHotel/cardHotel";
import { ScreenLoader } from "../../../components/loader/loader";

export const PaginaInicial = () => {
  const [hoteis, setHoteis] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get("hoteis").then((res) => {
      setHoteis(res.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  }, []);
  return (
    <>
      {loading ? <ScreenLoader></ScreenLoader> :
        <div className="container">
          <div className="row m-3">
            <div className="col-12">
              <h1 className="text-center">Hotel4U</h1>
              <h2 className="text-center">A new way to book</h2>
              <div className="row">
                <div className="col-12">
                  <h3 className="text-center">Hotel List:</h3>
                  <div className="row">
                    <div className="col-12">
                      <div className="container">
                        <div className="row mt-3">
                          {hoteis.map(Hotelj =>
                          Hotelj.disponivel ?(
                            <div className="col-4 mb-4">
                                <CardHotel key={Hotelj.id} hotela={Hotelj}>
                                </CardHotel>

                            </div>):""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </>
  );
};
