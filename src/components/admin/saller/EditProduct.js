import InputWithoutIcon from "../../molecules/InputWithoutIcon";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";

// import ProductHelper from "../../../helper/ProductHelper";
import WithToast from "../../../helper/WithToast";
import SelectList from "../../molecules/SelectList";

const buttonTheam = {
  width: "100%",
  marginTop: "3%",
  backgroundColor: "rgb(89, 6, 95)",
};
const EditProduct = ({ handleChange, data, updateProduct }) => (
  <div>
    <h2 id="simple-modal-title">Update Product</h2>
    <div>
      <InputWithoutIcon
        isError={data.pname.length < 1}
        errorMsg={data.pname.length < 1 ? "please enter valid name" : ""}
        lable="Product Name *"
        name="pname"
        placeholder="Enter the nameof product"
        handleChange={handleChange}
        value={data.pname}
      />
      <InputWithoutIcon
        isError={data.stock.length < 1}
        errorMsg={data.stock.length < 1 ? "please enter valid stock" : ""}
        lable="Product Stock *"
        name="stock"
        placeholder="Enter the stock of product"
        handleChange={handleChange}
        value={data.stock}
      />
      <div>
        <div style={{ width: "65%", float: "left" }}>
          <InputWithoutIcon
            isError={data.price.length < 1}
            errorMsg={
              data.price.length < 1 ? "please enter valid product price" : ""
            }
            lable="Product Price "
            name="price"
            placeholder="Enter the price per product"
            handleChange={handleChange}
            value={data.price}
          />
        </div>
        <div className="unit-list" style={{ width: "30%", float: "right" }}>
          <SelectList
            label="Unit"
            isError={data.unit.length < 1}
            handleChange={handleChange}
            name="unit"
            list={["1kg", "1pc", "250gm", "200gm", "500gm", "750gm"]}
          />
        </div>
      </div>
    </div>
    <div>
      <Button
        variant="contained"
        color="secondary"
        style={buttonTheam}
        onClick={updateProduct}>
        UPDATE PRODUCT
      </Button>
    </div>
  </div>
);

export default EditProduct;
