const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all tags
router.get('/', async(req, res) => {
  try {
    const tagData = await Tag.findAll(
      {
        include: [{ model: Product }],
      }
    );
    if (tagData.length === 00){
      res.status(404).json({message: "no records found"});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get tag by id, including its associated products in response
router.get('/:id', async(req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id,
      {
        include: [{ model: Product }],
      }
    );
    if (tagData == null){
      res.status(404).json({message: "no records found"});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// create a new tag
router.post('/', async(req, res) => {
  try {
    const tagData = await Tag.create(
      req.body
    );
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// update a tag by id
router.put('/:id', async(req, res) => {
  try {
    const tagData = await Tag.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }
    );
    if (tagData[0] == 0){
      res.status(404).json({message: "no records found to update with given id"});
      return;
    }
    res.json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete a tag by id
router.delete('/:id', async(req, res) => {
  try {
    const tagData = await Tag.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    );
    if (tagData == 0){
      res.status(404).json({message: "no records found to delete with given id"});
      return;
    }
    res.json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
