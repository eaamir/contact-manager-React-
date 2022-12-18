import SearchContact from "./contact/SearchContact";
import { BACKGROUND, PURPLE } from "../helpers/colors";
const Navbar = ({ query, search }) => {
    return (
        <nav className="navbar navbar-dark navbar-exoand-sm shadow-lg"
            style={{ backgroundColor: BACKGROUND }} >
            <div className="container">
                <div className="row w-100">
                    <div className="col">
                        <div className="navbar-brand">
                            <i className="fas fa-id-badge" style={{ color: PURPLE }} />
                            <span> وب اپلیکیشن مدریت {" "}</span>
                            <span style={{ color: PURPLE }} >مخاطبین</span>
                        </div>
                    </div>
                    <div className="col">
                        <SearchContact query={query} search={search} />
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar;