import { useParams } from 'react-router-dom';
import { Box, Button, HStack, Image, Text, VStack, Spinner } from '@chakra-ui/react';
import { useCart } from '../../Context/CartContext';
import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar produto:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner size="xl" />;
  if (!product) return <Text>Produto não encontrado</Text>;

  return (
    <Box p={6}>
      <HStack align="flex-start">
        <Image src={product.picture} boxSize="250px" objectFit="cover" />
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
