const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all categories
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
// get categories by id
router.get('/:id', async(req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id,
      {
        include: [{ model: Product }],
      }
    );
    if (categoryData == null){
      res.status(404).json({message: "no records found"});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// create a new category
router.post('/', async(req, res) => {
  try {
    const categoryData = await Category.create(
      req.body
    );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// update a category by id
router.put('/:id', async(req, res) => {
  try {
    const categoryData = await Category.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }
    );
    if (categoryData[0] == 0){
      res.status(404).json({message: "no records found to update with given id"});
      return;
    }
    res.json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete category by id
router.delete('/:id', async(req, res) => {
  try {
    const categoryData = await Category.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    );
    if (categoryData == 0){
      res.status(404).json({message: "no records found to delete with given id"});
      return;
    }
    res.json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
