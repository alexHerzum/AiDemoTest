//Models
const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');

//Utils
const { catchAsync } = require('../utils/catchAsync.util');

const createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurant.create({
    name,
    address,
    rating,
  });

  res.status(201).json({
    status: 'success',
    data: { newRestaurant },
  });
});

const getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: { status: 'active' },
    include: { model: Review, where: { status: 'active' }, required: false },
  });

  res.status(200).json({
    status: 'success',
    data: { restaurants },
  });
});

const getRestaurantById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findOne({
    where: { id },
    include: { model: Review, where: { status: 'active' }, required: false },
  });

  res.status(200).json({
    status: 'success',
    data: { restaurant },
  });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { name, address } = req.body;
  const { restaurant } = req;

  await restaurant.update({ name, address });

  res.status(200).json({
    status: 'success',
    data: { restaurant },
  });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: 'deleted' });

  res.status(204).json({
    status: 'success',
  });
});

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};
