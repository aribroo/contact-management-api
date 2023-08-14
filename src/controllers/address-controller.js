import addressService from '../services/address-service.js';

const addAdress = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const contactId = req.params.contactId;

    console.log(req.params);

    const result = await addressService.addAddress(user, contactId, request);

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAddress = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const addressId = req.params.addressId;

    const result = await addressService.getAddress(user, contactId, addressId);

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const listAddress = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;

    const result = await addressService.listAddress(user, contactId);

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateAddress = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const request = req.body;
    request.id = req.params.addressId;

    const result = await addressService.updateAddress(user, contactId, request);

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const addressId = req.params.addressId;

    await addressService.deleteAddress(user, contactId, addressId);

    res.status(200).json({
      data: 'OK',
    });
  } catch (err) {
    next(err);
  }
};

export default { addAdress, getAddress, updateAddress, listAddress, deleteAddress };
