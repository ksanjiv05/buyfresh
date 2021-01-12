import React, { useEffect, useState } from "react";
import OrderHelper from "../../../helper/OrderHelper";
import ExportCSV from "./ExportCSV";

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
    { label: "Product Name ", key: "pname" },
    { label: "Product Price", key: "price" },
    { label: "Product Order quntity", key: "quntity" },
    { label: "Unit ", key: "unit" },
    { label: "Product Img ", key: "productImg" },
  ];

  const additonalHeader = async () => {
    let exheaders = {};
    rowData &&
      rowData.map((v, i) => {
        v.products.map((v) => {
          setProduct((prevProduct) => [...prevProduct, v]);
        });
      });
    return true;
    // console.log("headers ", product);
  };
  useEffect(async () => {
    setState(false);
    OrderHelper.GetOrders()
      .then(async (pd) => {
        setRowData(pd);
        console.log("order ", pd);
        await additonalHeader().then((v) => {
          v ? setState(true) : setState(false);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <div>
      {console.log(state, "headers--==- ", product)}
      {state ? (
        <>
          <ExportCSV headers={header} data={rowData} />
          {product.length > 1 ? (
            <ExportCSV headers={ProductHeader} data={product} />
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default OrderList;
