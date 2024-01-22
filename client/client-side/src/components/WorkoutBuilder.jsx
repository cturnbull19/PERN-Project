import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { useGetExercisesQuery } from '../api/fetching'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateReservations } from '../actions/actionsSlice'


