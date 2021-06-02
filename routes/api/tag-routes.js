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
    
    const allTags = await Tag.findByPk(req.params.id. {
      // be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag }]
    });
    if (!allTags) {
      res.status(404).json({ message: 'Bad request.'});
      return;
    }
    res.status(200).json(allTags);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const allTags = await Tag.create(req.body);
    res.status(200).json(allTags);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
    //Calls the update method on the Book model
    Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        // Gets a book based on the book_id given in the request parameters
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedTag) => {
        res.json(updatedTag);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const allTags = await Tag.destroy({
      where: {
        id: req.params.id
      }
});

module.exports = router;
