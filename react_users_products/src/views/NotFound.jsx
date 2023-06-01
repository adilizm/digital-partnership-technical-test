import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div>
         <h4>404 | Page you requested does not exist</h4>
         <br />
         <Link to ='/'>Back to Home page</Link>
    </div>
  )
}

export default NotFound