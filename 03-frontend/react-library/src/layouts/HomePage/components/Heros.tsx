import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

export const Heros = () => {
  const { authState } = useOktaAuth();

  return (
    <div>
      <div className="d-none d-lg-block">
        <div className="row g-0 mt-5">
          <div className="col-sm-6 col-md-6">
            <div className="col-image-left"></div>
          </div>
          <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
            <div className="ml-2">
              <h1>Lorem gì gì đó</h1>
              <p className="lead">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere
                quae id iste, vero doloremque corrupti pariatur amet architecto
                nihil laborum? Est aspernatur esse illo, ex reiciendis
                asperiores deleniti aliquid dolorum!
              </p>
              {authState?.isAuthenticated ? (
                <Link
                  type="button"
                  className="btn main-color btn-lg text-white"
                  to="search"
                >
                  Khám phá{" "}
                </Link>
              ) : (
                <Link className="btn main-color btn-lg text-white" to="/login">
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="row g-0">
          <div
            className="col-4 col-md-4 container d-flex 
                        justify-content-center align-items-center"
          >
            <div className="ml-2">
              <h1>Lại là lorem</h1>
              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                provident nobis beatae quis tempora animi minus eligendi! Sed
                voluptate repellendus ullam ipsa numquam! Nulla neque deleniti
                minima, corporis illo enim?
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6">
            <div className="col-image-right"></div>
          </div>
        </div>
      </div>

      {/* Mobile Heros */}
      <div className="d-lg-none">
        <div className="container">
          <div className="m-2">
            <div className="col-image-left"></div>
            <div className="mt-2">
              <h1>What have you been reading?</h1>
              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eveniet, optio, eius cumque impedit sed eum nam animi architecto
                suscipit porro nesciunt culpa molestias vel illum dolor
                expedita, sit pariatur et?
              </p>
              {authState?.isAuthenticated ? (
                <Link
                  type="button"
                  className="btn main-color btn-lg text-white"
                  to="search"
                >
                  Khám phá
                </Link>
              ) : (
                <Link className="btn main-color btn-lg text-white" to="/login">
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
          <div className="m-2">
            <div className="col-image-right"></div>
            <div className="mt-2">
              <h1>lorem này khi thu nhỏ</h1>
              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium ipsam commodi quisquam maiores, quae officia quidem
                ducimus rem eius suscipit porro qui veritatis placeat molestiae
                nemo, aut tempore doloremque non.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
