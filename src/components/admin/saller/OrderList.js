import React, { useEffect, useState } from "react";
import OrderHelper from "../../../helper/OrderHelper";
import ExportCSV from "./ExportCSV";
import DataGridList from "../saller/DataGridList";

const OrderList = () => {
  const [rowData, setRowData] = useState([]);
  const [plotData, setPlotData] = useState([]);
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
  const datax = {
    columns: [
      { field: "orderId", hide: true },

      { field: "time", headerName: "Order Time ", width: 210 },
      { field: "timeslot", headerName: "Time Slot ", width: 100 },
      { field: "totalQuntity", headerName: "Total Quntity ", width: 120 },
      { field: "cartValue", headerName: "Order Value ", width: 210 },
      { field: "orderStatus", headerName: "Order Status  ", width: 110 },
      { field: "paymentMod", headerName: "Payment Mod ", width: 110 },
      {
        field: "action",
        headerName: "Action",
        width: 150,
      },
    ],
  };

  useEffect(async () => {
    setState(false);
    OrderHelper.GetOrders()
      .then(async (pd) => {
        if (rowData.length > 0) return 0;
        else {
          pd.map((v, i) => {
            v.id = i + 1;
            v.products.map((prd) => {
              prd.orderId = v.orderId;
              setProduct((prevProduct) => [...prevProduct, prd]);
            });

            setPlotData((prevProduct) => [
              ...prevProduct,
              {
                id: v.id,
                time: v.time,
                timeslot: v.timeslot,
                totalQuntity: v.totalQuntity,
                cartValue: v.cartValue,
                orderId: v.orderId,
                orderStatus: v.orderStatus,
                paymentMod: v.paymentMod,
              },
            ]);
          });
          setRowData(pd);
        }
        setState(true);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);

  return (
    <div>
      {/* {console.log(state, "headers--==- ", product)} */}
      {state ? (
        <div>
          <div className="export-data">
            <ExportCSV
              headers={header}
              filename="order-details.csv"
              // name="Order Details Export"
              data={rowData}
            />

            <ExportCSV
              headers={ProductHeader}
              filename="ordered-product-details.csv"
              data={product}
            />
          </div>
          <div className="data-grid">
            <DataGridList
              loading={!state}
              columns={datax.columns}
              rows={plotData}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default OrderList;
