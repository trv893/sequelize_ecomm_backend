const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  try {
    const categoryData = await Category.findAll(
      {
        include: [{ model: Product }],
      }
    );
    if (categoryData.length === 00){
      res.status(404).json({message: "no records found"});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id,
      {
        include: [{ model: Product }],
      }
    );
    if (categoryData.length === 00){
      res.status(404).json({message: "no records found"});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  try {
    const categoryData = await Category.create(
      req.body
    );
    res.json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  try {
    const categoryData = await Category.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  try {
    const categoryData = await Category.destroy(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
