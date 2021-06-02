const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    
    const allCategories = await Category.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [{ model: Product }]
    });
    if (!allCategories) {
      res.status(404).json({ message: 'Bad request.'});
      return;
    }
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.post('/',async (req, res) => {
  // create a new category
  try {
    const allCategories = await Category.create(req.body);
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      // Gets a book based on the book_id given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const allCategories = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!allCategories) {
      res.status(404).json({ message: 'bad request!' });
      return;
    }

    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
