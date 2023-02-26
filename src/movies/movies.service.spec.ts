import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('should return movie', () => {
      service.createMovie({
        title: 'TestMovie',
        genres: ['111', '222'],
        year: 2000,
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne()', () => {
    it('deletes a movie', () => {
      service.createMovie({
        title: 'TestMovie',
        genres: ['111', '222'],
        year: 2000,
      });

      const beforeDelete = service.getAll();
      service.deleteOne(beforeDelete[0].id);
      const afterDelete = service.getAll();

      expect(afterDelete.length).toBeLessThan(beforeDelete.length);
    });

    it('should throw 404 error', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('createMovie()', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.createMovie({
        title: 'TestMovie',
        genres: ['111', '222'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('updateMovie()', () => {
    it('should update a movie', () => {
      service.createMovie({
        title: 'TestMovie',
        genres: ['111', '222'],
        year: 2000,
      });

      service.update(1, { title: 'updated test' });

      const updateMovie = service.getOne(1);
      expect(updateMovie.title).toEqual('updated test');
    });

    it('should throw NotFoundException', () => {
      try {
        service.update(999, { title: 'updated test' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
