import { Component } from "react"
import { Route } from "react-router-dom"

export const SingleTemplate = (props) => {
    return <Route exact path={props.path} render={(propsRoute) => {
        return <>
            <section className="vh-100" style={{ backgroundColor: '#eee' }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: 25 }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <props.component {...propsRoute} />
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img src="https://storage.googleapis.com/afs-prod/media/e53811360eed4b8ba26b5f635d703a7c/3000.jpeg" style={{ width: '450px' }} alt="Sample image" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    }} />
}
