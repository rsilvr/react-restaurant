import { useContext, useState } from 'react';

import Header from '../../components/Header';
import FoodItem from '../../components/FoodItem';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { FoodsContext, FoodsProvider } from '../../hooks/useFoods'
import { Food } from '../../models/food'

const Dashboard = () => {
  const { foods, addFood, updateFood, deleteFood } = useContext(FoodsContext)
  const [addFoodModalOpen, setAddFoodModalOpen] = useState<boolean>(false)
  const [editFoodModalOpen, setEditFoodModalOpen] = useState<boolean>(false)
  const [editingFood, setEditingFood] = useState<Food | undefined>()

  const toggleAddFoodModal = () => setAddFoodModalOpen(!addFoodModalOpen)

  const toggleEditFoodModal = () => setEditFoodModalOpen(!editFoodModalOpen)

  const handleEditFood = (food: Food) => {
    setEditingFood(food)
    toggleEditFoodModal()
  }

  return (
    <>
      <Header openModal={toggleAddFoodModal} />
      <ModalAddFood
        isOpen={addFoodModalOpen}
        setIsOpen={toggleAddFoodModal}
        handleAddFood={addFood}
      />
      <ModalEditFood
        isOpen={editFoodModalOpen}
        setIsOpen={toggleEditFoodModal}
        editingFood={editingFood}
        handleUpdateFood={updateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <FoodItem
              key={food.id}
              food={food}
              handleDelete={deleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  )
}

const Main = () => {
  return (
    <FoodsProvider>
      <Dashboard />
    </FoodsProvider>
  )
}

export default Main
