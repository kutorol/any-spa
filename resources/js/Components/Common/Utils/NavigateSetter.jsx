import React from 'react'
import { useNavigate } from 'react-router-dom'
import RouterAPI from '../../../utils/funcs/router-api'

const NavigateSetter = () => {
  // устанавливаем хук, чтобы можно было использовать навигацию не только в компонентах
  RouterAPI.navigate = useNavigate()

  return null
};

export default NavigateSetter;