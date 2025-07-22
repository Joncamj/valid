import User from '../models/user.model.js';
import { createUserSchema } from '../validations/user.validation.js';

export const createUser = async (req, res) => {
  const { error, value } = createUserSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const user = new User(value);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur lors de la création de l\'utilisateur.' });
  }
};