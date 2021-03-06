import React from "react";
import NavLink from "react-router-dom/es/NavLink";

const FilterLink = ({ filter, children }) => (
    <NavLink
        to={filter === 'all' ? '' : filter}
        activeStyle={{
            textDecoration: 'none',
            color: 'black',
        }}
    >
        {children}
    </NavLink>
);

export default FilterLink;