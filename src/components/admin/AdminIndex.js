import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Context from "../../Context";

const AdminIndex = () => {
  const { isAdmin, isAuthenticate } = useContext(Context);
  // console.log(isAuthenticate, "is admin------ ", isAdmin);
  const history = useHistory();
  return (
    <div>
      <button onClick={() => history.push("/admin/dashboard")}>
        Go to Admin Dashboard
      </button>
    </div>
  );
};
export default AdminIndex;
