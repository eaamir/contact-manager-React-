import { Link } from "react-router-dom";
import { CURRENTLINE, ORANGE, PINK } from "../../helpers/colors";
import Contact from "./contact";
import Spinner from "../spinner"
const Contacts = ({ contacts, loading }) => {
    return (
        <>
            <section className="container">
                <div className="grid">
                    <div className="row">
                        <div className="col">
                            <p className="h3">
                                <Link to={"/contacts/add"} className="btn mx-2" style={{ backgroundColor: PINK }}>
                                    <span> ساخت مخاطب جدید </span>
                                    <i className="fa fa-plus-circle mx-2"></i>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner /> : (
                    <section className="container">
                        <div className="row">
                            {/* Contact */}
                            {
                                contacts.length > 0 ? contacts.map(c => (
                                    <Contact key={c.id} contact={c} />
                                )) :
                                    (
                                        <div className="text-center py-5" style={{ backgroundColor: CURRENTLINE }}>
                                            <p className="h3" style={{ color: ORANGE }}>
                                                مخاطب یافت نشد ...
                                            </p>
                                            <img src={require("../../assets/no-found.gif")} alt="پیدا نشد" className="w-25" />
                                        </div>
                                    )
                            }
                        </div>
                    </section>
                )
            }
        </>
    )
}

export default Contacts;