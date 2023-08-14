import contactService from '../services/contact-service.js';

const createContact = async (req, res, next) => {
  try {
    const username = req.user.username;
    const request = req.body;

    const result = await contactService.create(username, request);

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getContact = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;

    const result = await contactService.get(user, contactId);

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const contactId = req.params.contactId;

    console.log(contactId);
    const result = await contactService.update(user, contactId, request);

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const searchContact = async (req, res, next) => {
  try {
    const user = req.user;
    const request = {
      name: req.query.name,
      email: req.query.email,
      phone: req.query.phone,
      page: req.query.page,
      size: req.query.size,
    };

    const result = await contactService.searchContact(user, request);

    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;

    await contactService.deleteContact(user, contactId);

    res.status(200).json({
      data: 'OK',
    });
  } catch (err) {
    next(err);
  }
};

export default { createContact, getContact, updateContact, deleteContact, searchContact };
