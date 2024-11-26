import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';

@Injectable()
export class CityService {
  @InjectEntityManager()
  entityManager: EntityManager;

  create(createCityDto: CreateCityDto) {
    return 'This action adds a new city';
  }

  async findAll() {
    /**
     * 保存树结构
     */
    const city = new City();
    city.name = '华北';
    await this.entityManager.save(city);

    const cityChild = new City();
    cityChild.name = '山东';
    const parent = await this.entityManager.findOne(City, {
      where: {
        name: '华北',
      },
    });
    if (parent) {
      cityChild.parent = parent;
    }
    await this.entityManager.save(City, cityChild);

    const city1 = new City();
    city1.name = '华南';
    await this.entityManager.save(city1);

    const cityChild1 = new City();
    cityChild1.name = '云南';
    const parent1 = await this.entityManager.findOne(City, {
      where: {
        name: '华南',
      },
    });
    if (parent1) {
      cityChild1.parent = parent1;
    }
    await this.entityManager.save(City, cityChild1);

    const cityChild2 = new City();
    cityChild2.name = '昆明';
    const parent2 = await this.entityManager.findOne(City, {
      where: {
        name: '云南',
      },
    });
    if (parent2) {
      cityChild2.parent = parent2;
    }
    await this.entityManager.save(City, cityChild2);

    /**
     * 查询树结构
     *
     * findTrees 查询所有树结构
     * find 返回所有树扁平的结构
     * findRoots 查询所有根节点
     * findDescendantsTree 查询某个节点的所有后代节点
     * findDescendants 返回扁平结构
     * countDescendants 计数
     * findAncestorsTree 查询某个节点的所有祖先节点
     * findAncestors 返回扁平结构
     * countAncestors 计数
     */
    return this.entityManager.getTreeRepository(City).findTrees();
    // return this.entityManager.getTreeRepository(City).find();
    // return this.entityManager.getTreeRepository(City).findRoots();
    // return this.entityManager
    //   .getTreeRepository(City)
    //   .findDescendantsTree(parent);
    // return this.entityManager.getTreeRepository(City).findAncestorsTree(parent);
    // return this.entityManager.getTreeRepository(City).findAncestors(parent);
    // return this.entityManager.getTreeRepository(City).countAncestors(parent);
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
