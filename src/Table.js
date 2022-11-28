import { List, Datagrid, TextField, DateField, BooleanField } from 'react-admin';


import { Admin, Resource } from 'react-admin';
export const PostList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <DateField source="published_at" />
            <TextField source="category" />
            <BooleanField source="commentable" />
        </Datagrid>
    </List>
);


// in src/App.js



const Table = () => (
    <Admin>
        <Resource name="posts" list={PostList} />
        </Admin>

);

export default Table;