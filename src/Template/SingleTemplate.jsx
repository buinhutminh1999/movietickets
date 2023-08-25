import { Route } from "react-router-dom";

export const SingleTemplate = (props) => {
  return (
    <Route
      exact
      path={props.path}
      render={(propsRoute) => {
        return (
          <>
            <section className="vh-100" style={{ backgroundColor: "#eee" }}>
              <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-lg-12 col-xl-11">
                    <div
                      className="card text-black"
                      style={{ borderRadius: 25 }}
                    >
                      <div className="card-body p-md-5">
                        <div className="flex justify-center">
                          <props.component {...propsRoute} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
      }}
    />
  );
};
