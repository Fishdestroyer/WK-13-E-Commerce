const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    order: [['creaded_at', 'DESC']],
    include: [
      {
        model: Product,
         attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
})
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Category.findOne({
    where: {
      id: req.params.id  
    },
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    include: [
      {
        model: Category,
        attributes: ['category_name']
      }
    ]
  })
})
.then(dbTagData => {
    if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id'});
        return;
    }
    res.json(dbTagData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err)
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    title: req.body.title,
    tag_url: req.body.tag_url,
    user_id: req.body.user_id
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
        id: req.params.id
    }
})
.then(dbTagData => {
    if (!dbTagData) {
        res.status(404).json({ message: 'No post found with that id!'});
        return;
    }
    res.json(dbTagData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

module.exports = router;
