import React from "react";
import "../index.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Paginationapp = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    productDetails();
  }, []);

  const productDetails = async () => {
    const Data = await axios.get("https://dummyjson.com/products?limit=100");
    if (Data && Data.data.products) {
      setProducts(Data?.data?.products);
    }
    console.log(Data.data.products);
  };
  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div className="pagination__app">
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10 + 1).map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? "" : "page__disabled"}
          >
            ◀
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                key={i}
                className={page === i + 1 ? "page__selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => selectPageHandler(page + 1)}
            className={page < products.length / 10 ? "" : "page__disabled"}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
};

export default Paginationapp;
