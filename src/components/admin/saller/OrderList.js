import React, { useEffect, useState } from "react";
import OrderHelper from "../../../helper/OrderHelper";
import ExportCSV from "./ExportCSV";
import DataGridList from "../saller/DataGridList";

const OrderList = () => {
  const [rowData, setRowData] = useState([]);
  const [product, setProduct] = useState([]);
  const [state, setState] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const handleClick = (id) => {
    alert("bro " + id);
  };
  const handleDelete = (id) => {
    setState(true);
    // ProductHelper.DeleteProduct(id, (status) => {
    //   status ? alert("product deleted") : alert("deleting failed");
    //   setRowData([]);
    //   setIsUpdate(!isUpdate);
    //   // setState(false);
    // });
  };
  const header = [
    { label: "Id ", key: "orderId" },
    { label: "Name", key: "address.name" },
    { label: "House", key: "address.house" },
    { label: "Socity", key: "address.socity" },
    { label: "Village", key: "address.vill" },
    { label: "Phone Number", key: "address.phone" },
    { label: "Order Value ", key: "cartValue" },
    { label: "Order Status  ", key: "orderStatus" },
    { label: "Payment Mod ", key: "paymentMod" },
    { label: "Order Time ", key: "time" },
    { label: "Time Slot ", key: "timeslot" },
    { label: "Total Quntity ", key: "totalQuntity" },
  ];

  const ProductHeader = [
    { lable: "Order Id", key: "orderId" },
    { label: "Product Name ", key: "pname" },
    { label: "Product Price", key: "price" },
    { label: "Product Order quntity", key: "quntity" },
    { label: "Unit ", key: "unit" },
    { label: "Product Img ", key: "productImg" },
  ];

  useEffect(async () => {
    setState(false);
    OrderHelper.GetOrders()
      .then(async (pd) => {
        console.log("order ", pd);

        pd.map((v, i) => {
          v.id = i + 1;
          v.products.map((prd) => {
            prd.orderId = v.orderId;
            setProduct((prevProduct) => [...prevProduct, prd]);
          });
        });
        setRowData(pd);
        setState(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {console.log(state, "headers--==- ", product)}
      {state ? (
        <div>
          <div className="export-data">
            <ExportCSV headers={header} data={rowData} />

            <ExportCSV headers={ProductHeader} data={product} />
          </div>
          <div className="data-grid">
            <DataGridList loading={!state} columns={header} rows={rowData} />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default OrderList;
