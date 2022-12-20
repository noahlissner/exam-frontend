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
  useColorModeValue,
} from "@chakra-ui/react";
import { FiEdit2, FiTrash } from "react-icons/fi";
import useProducts from "../../routes/Admin/Products/hooks/useProducts";
import { IProducts } from "../../routes/Admin/Products/types";
import { Link } from "react-router-dom";

type Props = {
  products: IProducts[];
};

const ProductTable = ({ products }: Props) => {
  const { update } = useProducts();

  const handleUpdatePublished = (e: any) => {
    const product = products.find((product) => product._id === e.target.name);
    const data = {
      ...product,
      published: e.target.checked,
    };

    update(data);
  };

  console.log(products);

  return (
    <TableContainer borderRadius="lg">
      <Table variant="simple">
        <Thead bg={useColorModeValue("gray.200", "gray.800")}>
          <Tr>
            <Th>ID</Th>
            <Th>Title</Th>
            <Th>Category</Th>
            <Th>Price</Th>
            <Th>Published</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody bg={useColorModeValue("white", "gray.700")}>
          {products.map((product) => {
            // console.log(product.published);
            return (
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
                    <IconButton
                      icon={<FiEdit2 />}
                      as={Link}
                      to={`/admin/products/edit/${product._id}`}
                      aria-label="edit"
                    />
                    <IconButton icon={<FiTrash />} aria-label="delete" />
                  </ButtonGroup>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
