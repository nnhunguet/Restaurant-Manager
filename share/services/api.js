// a library to wrap and simplify api calls
import apisauce from "apisauce";
import AppConfig from "../../config/app-config";

// our "constructor"
const create = (baseURL = AppConfig.apiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      "Cache-Control": "no-cache",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // 10 second timeout...
    timeout: 10000,
  });

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const login = (userAuth) => api.post("api/login", userAuth);
  const forgotPassword = (data) =>
    api.post("api/account/reset-password/init", data, {
      headers: {
        "Content-Type": "text/plain",
        Accept: "application/json, text/plain, */*",
      },
    });

  const getAccount = () => api.get("api/account");
  const createUser = (options) => api.post("api/users", options);
  const updateAccount = (account) => api.post("api/account", account);
  const changePassword = (currentPassword, newPassword) =>
    api.post(
      "api/account/change-password",
      { currentPassword, newPassword },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
        },
      }
    );

  const getNotification = (notificationId) =>
    api.get("api/notifications/" + notificationId);
  const getNotifications = (options) => api.get("api/notifications", options);
  const createNotification = (notification) =>
    api.post("api/notifications", notification);
  const updateNotification = (notification) =>
    api.put("api/notifications", notification);
  const deleteNotification = (notificationId) =>
    api.delete("api/notifications/" + notificationId);

  const getRestaurant = (restaurantsId) =>
    api.get("api/restaurants/" + restaurantsId);
  const getRestaurants = (options) => api.get("api/restaurants", options);
  const createRestaurant = (restaurants) =>
    api.post("api/restaurants", restaurants);
  const updateRestaurant = (restaurants) =>
    api.put("api/restaurants", restaurants);
  const deleteRestaurant = (restaurantsId) =>
    api.delete("api/restaurants/" + restaurantsId);

  const getFood = (foodsId) => api.get("api/foods/" + foodsId);
  const getFoods = (options) => api.get("api/foods", options);
  const getFoodsFind = (options) => api.get("api/foods/find", options);
  const createFood = (foods) => api.post("api/foods", foods);
  const updateFood = (foods) => api.put("api/foods", foods);
  const deleteFood = (foodsId) => api.delete("api/foods/" + foodsId);

  const getHotel = (hotelsId) => api.get("api/hotels/" + hotelsId);
  const getHotels = (options) => api.get("api/hotels", options);
  const createHotel = (hotels) => api.post("api/hotels", hotels);
  const updateHotel = (hotels) => api.put("api/hotels", hotels);
  const deleteHotel = (hotelsId) => api.delete("api/hotels/" + hotelsId);

  const getDeal = (dealId) => api.get("api/deals/" + dealId);
  const getDeals = (options) => api.get("api/deals", options);
  const createDeal = (deal) => api.post("api/deals", deal);

  // ignite-jhipster-api-method-needle

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    createNotification,
    updateNotification,
    getNotifications,
    getNotification,
    deleteNotification,

    createRestaurant,
    updateRestaurant,
    getRestaurants,
    getRestaurant,
    deleteRestaurant,

    getFood,
    getFoods,
    getFoodsFind,
    createFood,
    deleteFood,
    updateFood,

    getHotel,
    getHotels,
    createHotel,
    deleteHotel,
    updateHotel,

    getDeal,
    createDeal,
    getDeals,
    // ignite-jhipster-api-export-needle
    login,
    createUser,
    forgotPassword,
    getAccount,
    updateAccount,
    changePassword,
  };
};

// let's return back our create method as the default.
export default {
  create,
};
