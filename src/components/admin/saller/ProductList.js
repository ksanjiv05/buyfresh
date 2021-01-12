import React, { useEffect, useState } from "react";
import DataGridList from "./DataGridList";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ProductHelper from "../../../helper/ProductHelper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import CustomIconButton from "./CustomIconButton";

const ProductList = () => {
  const [rowData, setRowData] = useState([]);
  const [state, setState] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const handleClick = (id) => {
    console.log("nfghj", id);
    alert("bro " + id);
  };
  const handleDelete = (id) => {
    setState(true);
    ProductHelper.DeleteProduct(id, (status) => {
      status ? alert("product deleted") : alert("deleting failed");
      setRowData([]);
      setIsUpdate(!isUpdate);
      // setState(false);
    });
  };
  const datax = {
    columns: [
      { field: "ProductId", hide: true },
      {
        field: "productImg",
        headerName: "Image",
        width: 110,

        renderCell: (params) => (
          <img
            src={params.row.productImg}
            alt="product img"
            style={{
              width: "50px",
              height: "50px",
              padding: "8px",
              borderRadius: "18px",
            }}
          />
        ),
      },
      { field: "pname", headerName: "Product Name", width: 210 },
      { field: "price", headerName: "Rate", width: 100 },
      { field: "unit", headerName: "Per Unit", width: 120 },
      { field: "shortDesc", headerName: "Short Description", width: 210 },
      { field: "stock", headerName: "Stock", width: 110 },
      { field: "desc", headerName: "Description", width: 110 },
      {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => (
          <>
            <CustomIconButton
              component={<VisibilityIcon />}
              handleClick={handleClick}
              params={params}
            />
            <CustomIconButton
              color="primary"
              component={<EditIcon />}
              handleClick={handleClick}
              params={params}
              style={{ marginLeft: 16 }}
            />
            <CustomIconButton
              color="secondary"
              component={<DeleteIcon />}
              handleClick={handleDelete}
              params={params.row.ProductId}
              style={{ marginLeft: 16 }}
            />
          </>
        ),
      },
    ],
  };

  useEffect(() => {
    setState(true);
    ProductHelper.GetProducts()
      .then((pd) => {
        // datax.rows = pd;
        pd.map((v, i) => {
          v.id = i + 1;
        });
        setRowData(pd);
        setState(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isUpdate]);

  return (
    <div>
      <DataGridList loading={state} rows={rowData} columns={datax.columns} />
    </div>
  );
};

export default ProductList;