import { Link } from "react-router-dom";
import styles from "./Table.module.scss";
import { RiAddBoxFill, RiMoneyDollarBoxFill } from "react-icons/ri";
import NewProductForm from "../NewProductForm/NewProductForm";
import SaleForm from "../SaleForm/SaleForm";
import { useDrawerContext } from "../../hooks/useDrawerContext";

import { Table as TableAntd } from "antd";

const Table = ({ data, columns, size, pagination, expandable, buttons }) => {
  const { toggleOpen, setDrawerSize } = useDrawerContext();

  const dataTable = data.map((element, index) => {
    return {
      ...element,
      key: index + 1,
    };
  });

  const togglePopup = (e, size, context) => {
    e.preventDefault();
    setDrawerSize(size);
    toggleOpen(context);
  };

  return (
    <div className={`table`}>
      {buttons && (
        <div className="buttons-container">
          <button
            className="btn icon-btn "
            onClick={(e) => {
              togglePopup(e, "sm", <NewProductForm />);
              navigate("/dashboard/stock/product/add");
            }}
          >
            <RiAddBoxFill />
          </button>
          <button
            className="btn icon-btn "
            onClick={(e) => {
              togglePopup(e, "sm", <SaleForm />);
              navigate("/dashboard/stock/product/sell");
            }}
          >
            <RiMoneyDollarBoxFill />
          </button>
        </div>
      )}
      <TableAntd
        columns={columns}
        pagination={pagination ? pagination : false}
        size={size}
        bordered={false}
        expandable={
          expandable && {
            expandedRowRender: (record) =>
              record.details.map((detail) => {
                return (
                  <span className="table-description">
                    {Object.entries(detail).map(([key, value]) => (
                      <p key={key}>
                        {key}: <span className="span-color">{value}</span>
                      </p>
                    ))}
                  </span>
                );
              }),
          }
        }
        dataSource={dataTable}
      />
    </div>
  );
};

export default Table;
