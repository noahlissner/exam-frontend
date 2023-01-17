import {
  Badge,
  ButtonGroup,
  IconButton,
  Img,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FiEdit2, FiTrash } from "react-icons/fi";
import useProducts from "../../../routes/Admin/Products/hooks/useProducts";
import { IProducts } from "../../../routes/Admin/Products/types";
import { Link } from "react-router-dom";
import { useState } from "react";
import ProductDrawer from "../../Drawers/ProductDrawer";
import AlertDeleteProducts from "../../Alerts/AlertDeleteProduct";

type Props = {
  products: IProducts[];
};

const ProductTable = ({ products }: Props) => {
  const { update } = useProducts();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: AlertIsOpen,
    onOpen: AlertOnOpen,
    onClose: AlertOnClose,
  } = useDisclosure();
  const [product, setProduct] = useState<IProducts | undefined>();

  const handleUpdatePublished = (e: any) => {
    const product = products.find((product) => product._id === e.target.name);
    const data = {
      ...product,
      published: e.target.checked,
    };

    update(data);
  };

  const handleEdit = (product: IProducts) => {
    setProduct(product);
    onOpen();
  };

  return (
    <>
      <TableContainer borderRadius="lg">
        <Table variant="simple">
          <Thead bg={useColorModeValue("gray.200", "gray.800")}>
            <Tr>
              <Th>IMG</Th>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Price</Th>
              <Th>Published</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody bg={useColorModeValue("white", "gray.700")}>
            {products.map((product) => {
              return (
                <Tr key={product._id}>
                  <Td>
                    <Img
                      src={product.img}
                      w={16}
                      h={16}
                      objectFit="cover"
                      borderRadius={4}
                    />
                  </Td>
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
                        // as={Link}
                        // to={`/admin/products/edit/${product._id}`}
                        aria-label="edit"
                        onClick={() => handleEdit(product)}
                      />
                      <IconButton
                        icon={<FiTrash />}
                        aria-label="delete"
                        onClick={AlertOnOpen}
                      />
                    </ButtonGroup>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <AlertDeleteProducts isOpen={AlertIsOpen} onClose={AlertOnClose} />
      {product && (
        <>
          <ProductDrawer
            product={product}
            isOpen={isOpen}
            onClose={onClose}
            title="Edit Product"
          />
        </>
      )}
    </>
  );
};

export default ProductTable;
