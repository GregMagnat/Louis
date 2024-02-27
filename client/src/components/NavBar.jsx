import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <Link to="/">Posts List</Link>
            {" | "}
            <Link to="/new">New Post</Link>
        </nav>
    );
}

export default Navbar;