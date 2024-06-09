import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaChartLine } from "react-icons/fa6";
import dayjs from "dayjs";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const payloadData = payload[0].payload;
    const date = dayjs(payloadData.createdAt).format("YYYY-MM-DD");

    return (
      <div className="custom-tooltip">
        <p className="label">{`${date} : ${payload[0].value} sales`}</p>
        {payloadData.createdAt && <p className="date-time">{date}</p>}
        {payloadData.store && <p className="date-time">{payloadData.store}</p>}
      </div>
    );
  }

  return null;
};

const CustomLegend = (props) => {
  const { payload } = props;

  return (
    <ul>
      {payload.map((entry, index) => {
        return (
          <li key={`item-${index}`}>
            <div className="chart-legend line">
              <FaChartLine />
              <p className="chart-legend-text">sales</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const styles = {
  backgroundColor: "white",
  padding: "1em",
  border: "1px solid black",
  borderRadius: "10px",
  fontSize: "1.4rem",
};

const TinyLineChart = ({ data, dataKey, value, legend, X }) => {
  return (
    <ResponsiveContainer
      height="100%"
      width="100%"
      minWidth={200}
      minHeight={200}
    >
      <LineChart data={data} style={{ fontSize: "1.2rem" }}>
        {X && (
          <XAxis
            dataKey={value}
            hanging={20}
            padding={{ left: 30, right: 30 }}
          />
        )}
        {legend && <Legend content={<CustomLegend />} />}
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke="#7e3ae4"
          strokeWidth={5}
          cursor="pointer"
          dot={false}
        />
        <Tooltip content={<CustomTooltip />} wrapperStyle={styles} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TinyLineChart;
