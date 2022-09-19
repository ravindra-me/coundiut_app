//Import required libraies
import React from "react";
// import { connect } from "react-redux";
import PropTypes from "prop-types";

//Import Custom Component
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

//Import Custom Hooks

//Import utils/data

//Import styles

function LayoutTopBottom(props) {
  let { children, isAuthorized, user } = props;
  return (
    <div>
      <Header isAuthorized={isAuthorized} />
      <section className="body">
        <main className="content full">{children}</main>
      </section>
      <Footer />
    </div>
  );
}

// const mapStateToProps = (state) => ({ user: state.user });

// export default connect(mapStateToProps)(LayoutTopBottom);

export default LayoutTopBottom;
