import { useState, createContext, ReactNode, useEffect, useContext } from 'react'
import { Food } from '../models/food'
import api from '../services/api'

interface FoodsContextProps {
  foods: Food[]
  editingFood?: Food
  selectFoodForEditing: (food: Food) => void
  addFood: (food: Food) => Promise<void>
  updateFood: (food: Food) => Promise<void>
  deleteFood: (id: number) => Promise<void>
}

interface FoodsProviderProps {
  children: ReactNode[] | ReactNode
}

const FoodsContext = createContext<FoodsContextProps>({} as FoodsContextProps)

export const FoodsProvider = ({ children }: FoodsProviderProps) => {
  const [foods, setFoods] = useState<Food[]>([])
  const [editingFood, setEditingFood] = useState<Food | undefined>()

  useEffect(() => {
    api.get('/foods').then(response => setFoods(response.data))
  }, [])

  const addFood = async (food: Food) => {
    try {
      const response = await api.post('/foods', { ...food, available: true })
      setFoods([...foods, response.data])
    } catch (err) {
      console.log(err);
    }
  }

  const updateFood = async (food: Food) => {
    try {
      const foodUpdated = await api.put(`/foods/${food.id}`, food)
      const foodsUpdated = foods.map(f => f.id !== foodUpdated.data.id ? f : foodUpdated.data as Food)
      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err);
    }
  }

  const deleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`)
    const foodsFiltered = foods.filter(food => food.id !== id)
    setFoods(foodsFiltered)
  }

  return (
    <FoodsContext.Provider value={{ foods, editingFood, selectFoodForEditing: setEditingFood, addFood, updateFood, deleteFood }}>
      { children }
    </FoodsContext.Provider>
  )
}
export function useFoods(): FoodsContextProps {
  const context = useContext(FoodsContext)
  return context;
}