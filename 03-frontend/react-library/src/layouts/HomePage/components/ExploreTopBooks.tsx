import { Link } from "react-router-dom";

export const ExploreTopBooks = () => {
  return (
    <div className="p-5 mb-4 bg-dark header">
      <div
        className="container-fluid py-5 text-white 
                d-flex justify-content-center align-items-center"
      >
        <div>
          <h1 className="display-5 fw-bold">Welcome to this Thư viện </h1>
          <p className="col-md-8 fs-4">Chào mừng bạn đến với Library này</p>
          <Link
            type="button"
            className="btn main-color btn-lg text-white"
            to="/search"
          >
            Khám phá
          </Link>
        </div>
      </div>
    </div>
  );
};
