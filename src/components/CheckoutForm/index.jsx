import {
  Box, Button, FormControl, FormLabel, Input, VStack, Text,
  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader,
  AlertDialogBody, AlertDialogFooter, useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCart } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import InputMask from 'react-input-mask';

// Schema de validação
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
    .transform(value => value.replace(/[^\d]/g, '')) // remove tudo que não for número
    .required('CEP é obrigatório')
    .matches(/^\d{8}$/, 'CEP deve ter 8 dígitos'),
  rua: yup.string().required('Rua é obrigatória'),
  bairro: yup.string().required('Bairro é obrigatório'),
  numero: yup.string().required('Número é obrigatório'),
  servico: yup.string().required('Serviço restante é obrigatório'),
});

export default function CheckoutForm() {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log('Pedido finalizado com os dados:', data);
    clearCart();
    onOpen(); // abre o modal
  };

  const handleModalClose = () => {
    onClose();         // fecha o modal
    navigate('/');     // redireciona para home
  };

  return (
    <>
      <Box p={6} maxW="600px" mx="auto">
        <Text fontSize="2xl" fontWeight="bold" mb={6}>Finalização de Compra</Text>
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

            <Button colorScheme="teal" type="submit" w="full">
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
