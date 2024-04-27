export const Card = ({ data }) => {
  return (
    <div className="product_card mb-3">
      <img className="product_img" src={data.image} alt="" />
      <div className="product_information">
        <div className="proDescripName">{data.name}</div>
        <div className="price">
          <div className="display_price">{data.display_price}</div>
          <div className="old_price">{data.old_price}</div>
        </div>
        <div className="offer">
          <div>{data.percentage + "%"}</div>
        </div>
        <div className="add2cart">
          <div className="add2cart_btn">Add to Cart</div>
        </div>
      </div>
    </div>
  );
};
