import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);

    if (!movie) {
      throw new NotFoundException(`Movie with ${id} Not found`);
    }

    return movie;
  }

  deleteOne(id: number): boolean {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
    return true;
  }

  createMovie(movieData: CreateMovieDto): void {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(movieId: number, updateData: object): string {
    const movie = this.getOne(movieId);
    this.deleteOne(movieId);
    this.movies.push({ ...movie, ...updateData });
    return 'true';
  }
}
