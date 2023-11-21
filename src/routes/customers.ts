import { Router } from 'express';
import { Customer, validateCustomer } from '../models/Customer';
import validate from '../middleware/validate';

const router = Router();

router.get('', async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    res.status(404).send('Invalid Id');
    return;
  }

  res.send(customer);
});

router.post('', validate(validateCustomer), async (req, res) => {
  const customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  })

  try {
    await customer.validate();
    await customer.save();
    res.send(customer);
  }
  catch (ex: any) {
    res.status(500).send(ex.message);
  }
});

router.put('/:id', validate(validateCustomer), async (req, res) => {
  let customer = await Customer.findById(req.params.id)
  if (!customer) {
    res.status(404).send('Invalid Id');
    return;
  }

  customer = await Customer.findByIdAndUpdate(req.params.id, {
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  }, { new: true });

  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) {
    res.status(404).send('Invalid Id');
    return;
  }

  res.send(customer);
});

export default router;