import { Router } from 'express';
import { User, validateUser } from '../models/User';
import lodash from 'lodash';
import bcrypt from 'bcrypt';
import auth from '../middleware/auth';
import CustomRequest from './dtos/ICustomRequest';
import validate from '../middleware/validate';

const router = Router();

router.get('/me', auth, async(req: CustomRequest, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('', validate(validateUser),async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(lodash.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  try {
    await user.validate();
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(lodash.pick(user, ['_id', 'name', 'email']));
  }
  catch (ex: any){
    res.send(ex.message);
  }
});

export default router;