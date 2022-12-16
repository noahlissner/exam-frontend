import {
  Badge,
  ButtonGroup,
  IconButton,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FiEdit2, FiTrash } from "react-icons/fi";
import useProducts from "../../routes/Admin/Products/hooks/useProducts";
import { IProducts } from "../../routes/Admin/Products/types";

type Props = {
  products: IProducts[];
};

const ProductTable = ({ products }: Props) => {
  const { updatePublished } = useProducts();

  const handleUpdatePublished = (e: any) => {
    const data = {
      id: e.target.name,
      value: e.target.checked,
    };
    updatePublished(data);
  };

  return (
    <TableContainer borderRadius="lg">
      <Table variant="simple">
        <Thead bg="gray.200">
          <Tr>
            <Th>ID</Th>
            <Th>Title</Th>
            <Th>Category</Th>
            <Th>Price</Th>
            <Th>Published</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody bg="white">
          {products.map((product) => (
            <Tr key={product._id}>
              <Td>{product._id}</Td>
              <Td>{product.title}</Td>
              <Td>
                <Badge>{product.category.title}</Badge>
              </Td>
              <Td>{product.price}:-</Td>
              <Td>
                <Switch
                  name={product._id}
                  onChange={handleUpdatePublished}
                  isChecked={product.published}
                />
              </Td>
              <Td>
                <ButtonGroup>
                  <IconButton icon={<FiEdit2 />} aria-label="delete" />
                  <IconButton icon={<FiTrash />} aria-label="edit" />
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
