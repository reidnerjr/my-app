import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import { useCart } from '../../Context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Carrinho</Text>
      <VStack spacing={4} align="stretch">
        {cart.map(item => (
          <HStack key={item.id} justify="space-between">
            <VStack align="start">
              <Text>{item.title}</Text>
              <Text color="green.500">R$ {item.price.toFixed(2)} x {item.quantity}</Text>
            </VStack>
            <HStack>
              <Button size="sm" onClick={() => decrementQuantity(item.id)}>-</Button>
              <Text>{item.quantity}</Text>
              <Button size="sm" onClick={() => incrementQuantity(item.id)}>+</Button>
              <Button size="sm" colorScheme="red" onClick={() => removeFromCart(item.id)}>Remover</Button>
            </HStack>
          </HStack>
        ))}
      </VStack>
      <Text fontSize="xl" mt={6}>Total: R$ {total.toFixed(2)}</Text>
    </Box>
  );
}
