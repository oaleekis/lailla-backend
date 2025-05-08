import dataSource from '../typeOrm.migration-config';
import { CategoriesEntity } from '../entities/categories.entity';

async function seedCategories() {
  try {
    await dataSource.initialize();
    const categoryRepository = dataSource.getRepository(CategoriesEntity);

    const categories = [
      { name: 'Alimentação' },
      { name: 'Transporte' },
      { name: 'Educação' },
      { name: 'Saúde' },
      { name: 'Lazer' },
    ];

    for (const category of categories) {
      const exists = await categoryRepository.findOneBy({ name: category.name });
      if (!exists) {
        await categoryRepository.save(category);
      } else {
      }
    }

  } catch (err) {
    console.error('Erro ao rodar seed:', err);
  } finally {
    await dataSource.destroy();
  }
}

seedCategories();
