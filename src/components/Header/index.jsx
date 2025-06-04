import {
  Box,
  Flex,
  IconButton,
  Text,
  Badge,
  Spacer,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../Context/CartContext';

export default function Header() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box bg="blue.700" px={6} py={4} color="white" boxShadow="md">
      <Flex align="center">
        <ChakraLink as={Link} to="/">LOJA REACT</ChakraLink>
        <Spacer />
        <Flex gap={6} align="center">
          <ChakraLink as={Link} to="/">Produtos</ChakraLink>
          <Box position="relative">
            <IconButton
              as={Link}
              to="/cart"
              icon={<FaShoppingCart />}
              variant="ghost"
              aria-label="Carrinho"
              size="lg"
            />
            {totalItems > 0 && (
              <>
                <Badge
                  position="absolute"
                  top="0"
                  right="0"
                  transform="translate(25%, -25%)"
                  colorScheme="red"
                  borderRadius="full"
                  px={2}
                  fontSize="0.8em"
                >
                  {totalItems}
                </Badge>
                <Text fontSize="sm" ml={2} color="gray.200">
                  R$ {totalValue.toFixed(2)}
                </Text>
              </>
            )}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
