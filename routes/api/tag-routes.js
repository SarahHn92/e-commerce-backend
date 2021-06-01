const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const allTags = await Tag.findAll({
       // be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag }]
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});
//// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    
    const tag = await Tag.findByPk(req.params.id. {
      // be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag }]
    });
    if (!tag) {
      res.status(404).json({ message: 'Bad request.'});
      return;
    }
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
