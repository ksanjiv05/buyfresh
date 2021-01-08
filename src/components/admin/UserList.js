import React from "react";
import { List, Datagrid, TextField, EmailField } from "react-admin";

export const UserList = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="First" />
        <TextField source="Email" />
      </Datagrid>
    </List>
  );
};
