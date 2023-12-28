import "./HeadingTabs.css"

function HeadingTabs({showForm,showChart}){
    return(
        <>
        <div className="headback">
            <div className="container text-center">
           {showForm && (<><p className="p-2" style={{ color: " #FFFDD0" }}>Book Your Seat</p><h1 style={{ color: " #FFFDD0" }} className="home_h1">
                        Appointment
                    </h1></>
          )}

            </div>
            <div className="container text-center">
           {showChart && (<><p className="p-2" style={{ color: " #FFFDD0" }}>Chart</p><h1 style={{ color: " #FFFDD0" }} className="home_h1">
                        Model Explainability
                    </h1></>
          )}

            </div>

        </div>
        </>
    )
}
export default HeadingTabs;