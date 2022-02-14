import React from "react";
import WidgetAdd from "./WidgetAdd";
import '../styles/style-index.css'

function RatesView() {
    return (
        <section className="col-sm-12 col-md-12 col-lg-6">
            <h5 className="color-titles">Fx Rates View</h5>
            <div className="cards-container">
                <div className="row row-cols-1 row-cols-sm-2 g-4">
                    <div className="col">
                        <WidgetAdd />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RatesView;