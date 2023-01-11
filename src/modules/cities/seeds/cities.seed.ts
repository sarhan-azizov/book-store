import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { CityEntity } from '../entities';

export default class CitySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(CityEntity);
    await repository.insert([
      { name: 'Киев' },
      { name: 'Днепропетровск' },
      { name: 'Харьков' },
      { name: 'Донецк' },
    ]);
  }
}
