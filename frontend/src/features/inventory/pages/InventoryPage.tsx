'use client';

import { 
  Title, 
  Container, 
  Table, 
  Button, 
  Group, 
  Modal, 
  TextInput, 
  NumberInput, 
  ActionIcon, 
  Stack, 
  Paper,
  Text,
  Loader,
  Center
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  stock: number;
}

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form states
  const [name, setName] = useState('');
  const [stock, setStock] = useState<number | string>(0);

  const API_URL = 'http://localhost:8000/api/inventory';

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setName('');
    setStock(0);
    open();
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setStock(product.stock);
    open();
  };

  const handleSubmit = async () => {
    const payload = { name, stock: Number(stock) };
    
    try {
      if (editingProduct) {
        // Update
        await fetch(`${API_URL}/${editingProduct.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        // Create
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      fetchProducts();
      close();
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const rows = products.map((product) => (
    <Table.Tr key={product.id}>
      <Table.Td>{product.name}</Table.Td>
      <Table.Td>{product.stock}</Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Button variant="light" size="compact-xs" onClick={() => handleOpenEdit(product)}>
            Edit
          </Button>
          <Button variant="light" color="red" size="compact-xs" onClick={() => handleDelete(product.id)}>
            Delete
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size="md" py="xl">
      <Paper shadow="sm" p="lg" withBorder radius="md">
        <Group justify="space-between" mb="xl">
          <Stack gap={0}>
            <Title order={2}>Inventory Management</Title>
            <Text c="dimmed" size="sm">Manage your products and stock levels</Text>
          </Stack>
          <Button onClick={handleOpenAdd}>Add Product</Button>
        </Group>

        {loading ? (
          <Center py="xl">
            <Loader size="lg" />
          </Center>
        ) : (
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Product Name</Table.Th>
                <Table.Th>Stock Quantity</Table.Th>
                <Table.Th w={150}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rows.length > 0 ? rows : (
                <Table.Tr>
                  <Table.Td colSpan={3} align="center">
                    <Text py="xl" c="dimmed">No products found. Add your first product!</Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        )}
      </Paper>

      <Modal 
        opened={opened} 
        onClose={close} 
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        centered
        radius="md"
      >
        <Stack>
          <TextInput 
            label="Product Name" 
            placeholder="e.g. Mechanical Keyboard" 
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            required
          />
          <NumberInput 
            label="Stock Quantity" 
            placeholder="0" 
            value={stock}
            onChange={setStock}
            min={0}
            required
          />
          <Group justify="flex-end" mt="md">
            <Button variant="subtle" onClick={close}>Cancel</Button>
            <Button onClick={handleSubmit}>{editingProduct ? 'Update' : 'Create'}</Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}
