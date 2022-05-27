import { useState } from 'react';

import Header from '../../components/Header';
import FoodItem from '../../components/FoodItem';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { FoodsProvider, useFoods } from '../../hooks/useFoods'
import { Food } from '../../models/food'

const Dashboard = () => {
  const { foods, selectFoodForEditing, addFood, updateFood, deleteFood } = useFoods()
  const [addFoodModalOpen, setAddFoodModalOpen] = useState<boolean>(false)
  const [editFoodModalOpen, setEditFoodModalOpen] = useState<boolean>(false)

  const toggleAddFoodModal = () => setAddFoodModalOpen(!addFoodModalOpen)

  const toggleEditFoodModal = () => setEditFoodModalOpen(!editFoodModalOpen)

  const handleEditFoodModal = (food: Food) => {
    selectFoodForEditing(food)
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
        handleUpdateFood={updateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <FoodItem
              key={food.id}
              food={food}
              handleDelete={deleteFood}
              handleEditFood={(food) => handleEditFoodModal(food)}
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
