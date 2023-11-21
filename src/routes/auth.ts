import { Router } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import validate from '../middleware/validate';

const router = Router();

router.post('', validate(validateAuth), async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid password.');

  const token = user.generateAuthToken();
  res.send(token);
});

function validateAuth(req: Request) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required()
  });

  return schema.validate(req);
}

export default router;