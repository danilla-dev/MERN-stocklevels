import styles from "./FlexContainer.module.scss";
const FlexContainer = ({ children, column, auth }) => {
  return (
    <section
      className={`${styles.flex_container} ${column && styles.col} ${
        auth && styles.auth
      }`}
    >
      <div className="section-bg" />
      {children}
    </section>
  );
};

export default FlexContainer;
