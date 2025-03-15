import { Link } from "react-router"
import { PATH } from "../../constants/path"

export const Navigation = () => {
    return(
        <nav>
            <Link to={PATH.WORKSPACE}>Interactive Workspace</Link>
            <Link to={PATH.BITCOIN}>Bitcoin Transactions</Link>
        </nav>
    )
}