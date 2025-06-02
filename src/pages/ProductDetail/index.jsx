import { useParams } from 'react-router-dom';
import { Box, Button, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { useCart } from '../../Context/CartContext';
import { products } from '../../data/product';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find(p => p.id.toString() === id);

  if (!product) return <Text>Produto não encontrado</Text>;

  return (
    <Box p={6}>
      <HStack align="flex-start">
        <Image src={product.image} boxSize="250px" objectFit="cover" />
        <VStack align="start" spacing={3}>
          <Text fontSize="2xl" fontWeight="bold">{product.title}</Text>
          <Text>{product.description}</Text>
          <Text fontSize="lg" color="green.500">R$ {product.price.toFixed(2)}</Text>
          <Button colorScheme="blue" onClick={() => addToCart(product)}>Adicionar ao carrinho</Button>
        </VStack>
      </HStack>
    </Box>
  );
}
