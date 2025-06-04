import {
  Box, Button, FormControl, FormLabel, Input, VStack, Text,
  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader,
  AlertDialogBody, AlertDialogFooter, useDisclosure, HStack
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCart } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import InputMask from 'react-input-mask';

const schema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  cpf: yup
    .string()
    .transform(value => value.replace(/[^\d]/g, ''))
    .required('CPF é obrigatório')
    .matches(/^\d{11}$/, 'CPF deve ter 11 dígitos numéricos'),
  cep: yup
    .string()
    .transform(value => value.replace(/[^\d]/g, ''))
    .required('CEP é obrigatório')
    .matches(/^\d{8}$/, 'CEP deve ter 8 dígitos'),
  rua: yup.string().required('Rua é obrigatória'),
  bairro: yup.string().required('Bairro é obrigatório'),
  numero: yup.string().required('Número é obrigatório'),
});

export default function CheckoutForm() {
  const { clearCart, cart } = useCart();
  const navigate = useNavigate();
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    clearCart();
    onOpen(); // abre o modal
  };

  const handleModalClose = () => {
    onClose();         // fecha o modal
    navigate('/');     // redireciona para home
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Box p={6} maxW="600px" mx="auto" marginBottom='50px'>
        {/* Título principal */}
        <Text fontSize="3xl" fontWeight="bold" mb={6}>Finalizar Pedido</Text>

        {/* Resumo do pedido dentro da caixa */}
        <Text fontSize="2xl" fontWeight="semibold" mb={4}>Resumo do Pedido</Text>
        <Box
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          p={4}
          mb={6}
          bg="gray.50"
        >
          {cart.length === 0 ? (
            <Text>Carrinho vazio.</Text>
          ) : (
            cart.map(item => (
              <HStack key={item.id} spacing={4} align="center" mb={2}>
                <Box width='150px' height='150px'>
                  <img
                    src={item.picture}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                  />
                </Box>
                <Text flex="1">{item.title} — {item.quantity} x R$ {item.price.toFixed(2)}</Text>
                <Text fontWeight="bold">R$ {(item.price * item.quantity).toFixed(2)}</Text>
              </HStack>
            ))
          )}
        </Box>

        <Text mt={4} fontSize="xl" fontWeight="bold">Total: R$ {total.toFixed(2)}</Text>

        {/* Formulário */}
        <Text fontSize="2xl" fontWeight="semibold" mt={8} mb={6}>Dados para Entrega</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input {...register('nome')} />
              <Text color="red.500">{errors.nome?.message}</Text>
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" {...register('email')} />
              <Text color="red.500">{errors.email?.message}</Text>
            </FormControl>

            <FormControl>
              <FormLabel>CPF</FormLabel>
              <Input
                as={InputMask}
                mask="999.999.999-99"
                {...register('cpf')}
              />
              <Text color="red.500">{errors.cpf?.message}</Text>
            </FormControl>

            <FormControl>
              <FormLabel>CEP</FormLabel>
              <Input {...register('cep')} />
              <Text color="red.500">{errors.cep?.message}</Text>
            </FormControl>

            <FormControl>
              <FormLabel>Rua</FormLabel>
              <Input {...register('rua')} />
              <Text color="red.500">{errors.rua?.message}</Text>
            </FormControl>

            <FormControl>
              <FormLabel>Bairro</FormLabel>
              <Input {...register('bairro')} />
              <Text color="red.500">{errors.bairro?.message}</Text>
            </FormControl>

            <FormControl>
              <FormLabel>Número</FormLabel>
              <Input {...register('numero')} />
              <Text color="red.500">{errors.numero?.message}</Text>
            </FormControl>

            <Button colorScheme="teal" type="submit" w="full" mt={4}>
              Finalizar Pedido
            </Button>
          </VStack>
        </form>
      </Box>

      {/* Modal de sucesso */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleModalClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Pedido Finalizado
            </AlertDialogHeader>

            <AlertDialogBody>
              Sua compra foi realizada com sucesso!
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleModalClose} colorScheme="teal">
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
