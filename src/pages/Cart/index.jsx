import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import { useCart } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const {
    cart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    stock,
  } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate();

  return (
    <Box p={6} maxW="600px" mx="auto" mt={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Carrinho</Text>

      {cart.length === 0 ? (
        <Text>Carrinho vazio.</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {cart.map(item => (
            <HStack key={item.id} justify="space-between" align="center">
              <HStack spacing={4}>
                <Box boxSize="100px" width='300px'>
                  <img src={item.picture} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
                <VStack align="start" spacing={1}>
                  <Text fontWeight="semibold">{item.title}</Text>
                  <Text color="green.500">R$ {item.price.toFixed(2)} x {item.quantity}</Text>
                  <Text fontSize="sm" color="gray.500">
                    Estoque disponível: {stock[item.id] ?? 0}
                  </Text>
                </VStack>
              </HStack>
              <HStack>
                <Button size="sm" onClick={() => decrementQuantity(item.id)}>-</Button>
                <Text>{item.quantity}</Text>
                <Button
                  size="sm"
                  onClick={() => incrementQuantity(item.id)}
                  isDisabled={stock[item.id] <= 0}
                >
                  +
                </Button>
                <Button size="sm" colorScheme="red" onClick={() => removeFromCart(item.id)}>
                  Remover
                </Button>
              </HStack>
            </HStack>
          ))}
        </VStack>
      )}

      <Text fontSize="xl" mt={6}>Total: R$ {total.toFixed(2)}</Text>

      <Button
        colorScheme="teal"
        mt={4}
        onClick={() => navigate('/checkout')}
        isDisabled={cart.length === 0}
      >
        Finalizar Compra
      </Button>
    </Box>
  );
}
