import { Box, Input, SimpleGrid, Text, VStack, Image, Button, Spinner } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useCart } from '../../Context/CartContext';

export default function Home() {
  const { addToCart } = useCart();
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
        setLoading(false);
      });
  }, []);

  const filtered = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box p={6}>
      <Input placeholder="Pesquisar produtos..." mb={6} value={search} onChange={(e) => setSearch(e.target.value)} />
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {filtered.map(product => (
            <Box key={product.id} borderWidth="1px" borderRadius="lg" p={4}>
              <VStack>
                <Link to={`/product/${product.id}`}>
                  <Image src={product.picture} boxSize="150px" objectFit="cover" />
                </Link>
                <Text>{product.title}</Text>
                <Text color="green.500">R$ {product.price.toFixed(2)}</Text>
                <Button colorScheme="blue" onClick={() => addToCart(product)}>Comprar</Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
