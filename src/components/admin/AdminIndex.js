import * as React from "react";
import { useHistory } from "react-router-dom";

const AdminIndex = () => {
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
